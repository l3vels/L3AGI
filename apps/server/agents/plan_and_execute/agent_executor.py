from langchain.agents.agent import AgentExecutor
from langchain.agents.structured_chat.base import StructuredChatAgent
from langchain_experimental.plan_and_execute.executors.base import ChainExecutor

HUMAN_MESSAGE_TEMPLATE = """Previous steps: {previous_steps}

Current objective: {current_step}

{agent_scratchpad}"""


def initialize_executor(llm, tools, system_message: str):
    input_variables = ["previous_steps", "current_step", "agent_scratchpad"]
    template = HUMAN_MESSAGE_TEMPLATE

    system_message = f"""{system_message}
Respond to the human as helpfully and accurately as possible. You have access to the following tools:"""

    agent = StructuredChatAgent.from_llm_and_tools(
        llm,
        tools,
        human_message_template=template,
        prefix=system_message,
        input_variables=input_variables,
    )
    agent_executor = AgentExecutor.from_agent_and_tools(
        agent=agent, tools=tools, verbose=True
    )

    return ChainExecutor(chain=agent_executor)
