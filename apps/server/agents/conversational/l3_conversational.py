from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI
from postgres import PostgresChatMessageHistory
from fastapi_sqlalchemy import db
from system_message import format_system_message

from memory.zep import ZepMemory
from pubsub_service import PubSubService
import os
from l3_base import L3Base
from openai.error import RateLimitError
import sentry_sdk
from config import Config
from agents.conversational.output_parser import ConvoOutputParser
from utils.agent_utils import convert_model_to_response
from models.agent import AgentModel
from utils.system_message import SystemMessageBuilder


azureService = PubSubService()

os.environ["LANGCHAIN_TRACING"] = "false"

class L3Conversational(L3Base):
    def run(
        self,
        tools,
        prompt: str,
        history: PostgresChatMessageHistory,
        is_private_chat: bool,
        human_message_id: str,
    ):
        memory = ZepMemory(
            session_id=self.session_id,
            url=Config.ZEP_API_URL,
            api_key=Config.ZEP_API_KEY,
            memory_key="chat_history",
            return_messages=True,
        )

        memory.human_name = self.user.first_name
        memory.ai_name = "AI"

        agent_with_configs = convert_model_to_response(AgentModel.get_agent_by_id(db, "7d085797-1721-45cd-872f-1a8f51f31484", self.account))

        system_message = SystemMessageBuilder(agent_with_configs).build()

        system_message = format_system_message(
            system_message, self.user, self.account, self.game, self.collection
        )

        model_name = agent_with_configs.configs.model_version
        temperature = agent_with_configs.configs.temperature

        llm = ChatOpenAI(temperature=temperature, model_name=model_name)

        agent = initialize_agent(
            tools,
            llm,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            verbose=True,
            memory=memory,
            handle_parsing_errors="Check your output and make sure it conforms!",
            agent_kwargs={
                # "prefix": system_message,
                # "format_instructions": FORMAT_INSTRUCTIONS,
                "system_message": system_message,
                "output_parser": ConvoOutputParser(),
            },
        )

        res: str

        try:
            res = agent.run(prompt)
        except RateLimitError:
            res = "AI is at rate limit, please try again later"
        except Exception as err:
            print(err)
            sentry_sdk.capture_exception(err)
            res = "Something went wrong, please try again later"

        ai_message = history.create_ai_message(res, human_message_id)

        azureService.send_to_group(
            self.session_id,
            message={
                "type": "CHAT_MESSAGE_ADDED",
                "from": self.user.id,
                "chat_message": ai_message,
                "is_private_chat": is_private_chat,
            },
        )

        return res
