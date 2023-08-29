import json
from typing import List
from langchain.base_language import BaseLanguageModel
from langchain.chains import LLMChain
from langchain_experimental.plan_and_execute.planners.base import LLMPlanner
from langchain_experimental.plan_and_execute.schema import (
    Plan,
    PlanOutputParser,
    Step,
)
from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder, PromptTemplate
from langchain.schema.messages import SystemMessage
from memory.zep import ZepMemory


class PlanningOutputParser(PlanOutputParser):
    def parse(self, text: str) -> tuple[Plan, List[str]]:
        agent_steps = []
        user_steps = []

        try:
            steps = json.loads(text)

            for step in steps:
                agent_steps.append(Step(value=step["agent_step"]))
                user_steps.append(step["user_step"])
        except json.decoder.JSONDecodeError:
            pass

        return Plan(steps=agent_steps), user_steps


def initialize_chat_planner(
        llm: BaseLanguageModel, system_prompt: str, memory: ZepMemory
) -> LLMPlanner:
    """
    Load a chat planner.
    Args:
        llm: Language model.
        system_prompt: System prompt.
        memory: Zep memory instance.

    Returns:
        LLMPlanner
    """
    prompt_template = ChatPromptTemplate.from_messages(
        [
            SystemMessage(content=system_prompt),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{input}"),
        ]
    )

    # prompt_template = PromptTemplate(template=, input_variables=["chat_history"])

    llm_chain = LLMChain(llm=llm, prompt=prompt_template, memory=memory)

    return LLMPlanner(
        llm_chain=llm_chain,
        output_parser=PlanningOutputParser(),
        stop=["<END_OF_PLAN>"],
    )
