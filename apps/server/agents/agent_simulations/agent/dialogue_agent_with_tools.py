from typing import List
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.schema import (
    AIMessage,
)
from agents.agent_simulations.agent.dialogue_agent import DialogueAgent
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.schema import (
    SystemMessage,
)
from typings.agent import AgentWithConfigsOutput
from memory.zep.zep_memory import ZepMemory
from config import Config
from typings.user import UserOutput

class DialogueAgentWithTools(DialogueAgent):
    def __init__(
        self,
        name: str,
        agent_with_configs: AgentWithConfigsOutput,
        system_message: SystemMessage,
        model: ChatOpenAI,
        tools: List[any],
        session_id: str,
        user: UserOutput,
        is_memory: bool = False,
        **tool_kwargs,
    ) -> None:
        super().__init__(name, agent_with_configs, system_message, model)
        self.tools = tools
        self.session_id = session_id
        self.user = user
        self.is_memory = is_memory

    def send(self) -> str:
        """
        Applies the chatmodel to the message history
        and returns the message string
        """

        memory: ConversationBufferMemory

        if self.is_memory:
            memory = ZepMemory(
                session_id=self.session_id,
                url=Config.ZEP_API_URL,
                api_key=Config.ZEP_API_KEY,
                memory_key="chat_history",
                return_messages=True,
            )
            
            memory.human_name = self.user.name
            memory.ai_name = self.agent_with_configs.agent.name
            memory.auto_save = False
        else:
            memory = ConversationBufferMemory(
                memory_key="chat_history", return_messages=True
            )


        agent = initialize_agent(
            self.tools,
            self.model,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            verbose=True,
            handle_parsing_errors=True,
            memory=memory,
            agent_kwargs={
                "system_message": self.system_message.content,
            },
        )

        prompt = "\n".join(
           self.message_history + [self.prefix]
        )

        res = agent.run(
            input=prompt
        )

        message = AIMessage(
            content=res
        )

        return message.content
    