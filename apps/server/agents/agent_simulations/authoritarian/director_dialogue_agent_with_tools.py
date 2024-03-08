import random
from typing import List

import tenacity
from langchain.output_parsers import RegexParser
from langchain.prompts import PromptTemplate
from langchain.schema import HumanMessage, SystemMessage
from langchain_community.chat_models import ChatOpenAI

from agents.agent_simulations.agent.dialogue_agent_with_tools import \
    DialogueAgentWithTools
from typings.agent import AgentWithConfigsOutput


class IntegerOutputParser(RegexParser):
    def get_format_instructions(self) -> str:
        return "Your response should be an integer delimited by angled brackets, like this: <int>."


class DirectorDialogueAgentWithTools(DialogueAgentWithTools):
    def __init__(
        self,
        name,
        agent_with_configs: AgentWithConfigsOutput,
        system_message: SystemMessage,
        model: ChatOpenAI,
        speakers: List[DialogueAgentWithTools],
        stopping_probability: float,
        tools: List[any],
        session_id: str,
        sender_name: str,
        is_memory: bool,
    ) -> None:
        super().__init__(
            name=name,
            agent_with_configs=agent_with_configs,
            system_message=system_message,
            model=model,
            tools=tools,
            session_id=session_id,
            sender_name=sender_name,
            is_memory=is_memory,
        )
        self.speakers = speakers
        self.next_speaker = ""

        self.stop = False
        self.stopping_probability = stopping_probability
        self.termination_clause = "Finish the conversation by stating a concluding message and thanking everyone."

        # 1. have a prompt for generating a response to the previous speaker
        self.response_prompt_template = PromptTemplate(
            input_variables=["message_history", "termination_clause"],
            template=f"""{{message_history}}

Follow up with an insightful comment.
{{termination_clause}}
{self.prefix}
        """,
        )

        # 2. have a prompt for deciding who to speak next
        self.choice_parser = IntegerOutputParser(
            regex=r"<(\d+)>", output_keys=["choice"], default_output_key="choice"
        )
        self.choose_next_speaker_prompt_template = PromptTemplate(
            input_variables=["message_history", "speaker_names"],
            template=f"""{{message_history}}

Given the above conversation, select the next speaker by choosing index next to their name: 
{{speaker_names}}

{self.choice_parser.get_format_instructions()}

Do nothing else.
        """,
        )

        # 3. have a prompt for prompting the next speaker to speak
        self.prompt_next_speaker_prompt_template = PromptTemplate(
            input_variables=["message_history", "next_speaker"],
            template=f"""{{message_history}}

The next speaker is {{next_speaker}}. 
Prompt the next speaker to speak with an insightful question.
{self.prefix}
        """,
        )

    def _generate_response(self):
        # if self.stop = True, then we will inject the prompt with a termination clause
        sample = random.uniform(0, 1)
        self.stop = sample < self.stopping_probability

        print(f"\tStop? {self.stop}\n")

        response_prompt = self.response_prompt_template.format(
            message_history="\n".join(self.message_history),
            termination_clause=self.termination_clause if self.stop else "",
        )

        self.response = self.model(
            [
                self.system_message,
                HumanMessage(content=response_prompt),
            ]
        ).content

        return self.response

    @tenacity.retry(
        stop=tenacity.stop_after_attempt(2),
        wait=tenacity.wait_none(),  # No waiting time between retries
        retry=tenacity.retry_if_exception_type(ValueError),
        before_sleep=lambda retry_state: print(
            f"ValueError occurred: {retry_state.outcome.exception()}, retrying..."
        ),
        retry_error_callback=lambda retry_state: 0,
    )  # Default value when all retries are exhausted
    def _choose_next_speaker(self) -> str:
        speaker_names = "\n".join(
            [
                f"{idx}: (Name:{agent_with_config.agent.name} - Role:{agent_with_config.agent.role}) - Description:{agent_with_config.agent.description}"
                for idx, agent_with_config in enumerate(self.speakers)
            ]
        )
        choice_prompt = self.choose_next_speaker_prompt_template.format(
            message_history="\n".join(
                self.message_history + [self.prefix] + [self.response]
            ),
            speaker_names=speaker_names,
        )

        choice_string = self.model(
            [
                self.system_message,
                HumanMessage(content=choice_prompt),
            ]
        ).content
        choice = int(self.choice_parser.parse(choice_string)["choice"])

        return choice

    def select_next_speaker(self):
        return self.chosen_speaker_id

    def send(self) -> str:
        """
        Applies the chatmodel to the message history
        and returns the message string
        """
        # 1. generate and save response to the previous speaker
        self.response = self._generate_response()

        if self.stop:
            message = self.response
        else:
            # 2. decide who to speak next
            self.chosen_speaker_id = self._choose_next_speaker()
            self.next_speaker = self.speakers[self.chosen_speaker_id]
            print(f"\tNext speaker: {self.next_speaker}\n")

            # 3. prompt the next speaker to speak
            next_prompt = self.prompt_next_speaker_prompt_template.format(
                message_history="\n".join(
                    self.message_history + [self.prefix] + [self.response]
                ),
                next_speaker=self.next_speaker,
            )
            message = self.model(
                [
                    self.system_message,
                    HumanMessage(content=next_prompt),
                ]
            ).content
            message = " ".join([self.response, message])

        return message
