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
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain.schema.messages import SystemMessage
from memory.zep.zep_memory import ZepMemory


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


INSTRUCTIONS = (
    'Let\'s first understand the problem and devise a plan to solve the problem. Please make the plan the minimum number of steps required to accurately complete the task. Please output the plan as list of steps as JSON array of objects format. This is example format: ``` [   {{     "agent_step": "Technical description for agent executor to use",     "user_step": "Description for non-technical user so they understand what is step about",   }} ] ```\n'
    "If the task is a question, the final step should almost always be 'Given the above steps taken, please respond to the users original question'.\n"
    "At the end of your plan, say '<END_OF_PLAN>'\n"
)


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

    system_prompt = f"{system_prompt}\n{INSTRUCTIONS}"

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
