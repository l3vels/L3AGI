from typing import Optional
from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI
from postgres import PostgresChatMessageHistory
from fastapi_sqlalchemy import db
from system_message import format_system_message

from memory.zep import ZepMemory
from pubsub_service import PubSubService
import os
from l3_base import L3Base
from openai.error import RateLimitError, AuthenticationError
import sentry_sdk
from config import Config
from agents.conversational.output_parser import ConvoOutputParser
from utils.system_message import SystemMessageBuilder
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from exceptions import ToolEnvKeyException

azureService = PubSubService()

os.environ["LANGCHAIN_TRACING"] = "false"

class L3Conversational(L3Base):
    def run(
        self,
        settings: AccountSettings,
        agent_with_configs: AgentWithConfigsOutput,
        tools,
        prompt: str,
        history: PostgresChatMessageHistory,
        is_private_chat: bool,
        human_message_id: str,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
    ):
        memory = ZepMemory(
            session_id=str(self.session_id),
            url=Config.ZEP_API_URL,
            api_key=Config.ZEP_API_KEY,
            memory_key="chat_history",
            return_messages=True,
        )

        memory.human_name = self.user.name
        memory.ai_name = agent_with_configs.agent.name

        system_message = SystemMessageBuilder(agent_with_configs).build()

        model_name = agent_with_configs.configs.model_version or "gpt-3.5-turbo"
        temperature = agent_with_configs.configs.temperature

        llm = ChatOpenAI(openai_api_key=settings.openai_api_key,temperature=temperature, model_name=model_name)

        agent = initialize_agent(
            tools,
            llm,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            verbose=True,
            memory=memory,
            handle_parsing_errors="Check your output and make sure it conforms!",
            agent_kwargs={
                "system_message": system_message,
                "output_parser": ConvoOutputParser(),
            },
        )

        res: str

        try:
            res = agent.run(prompt)
        except RateLimitError:
            res = "AI is at rate limit, please try again later"
        except AuthenticationError:
            res = "Your OpenAI API key is invalid. Please recheck it in [Settings](/settings)"
        except ToolEnvKeyException as err:
            res = str(err)
        except Exception as err:
            print(err)
            sentry_sdk.capture_exception(err)
            res = "Something went wrong, please try again later"

        ai_message = history.create_ai_message(res, human_message_id)

        azureService.send_to_group(
            str(self.session_id),
            message={
                "type": "CHAT_MESSAGE_ADDED",
                "from": str(self.user.id),
                "chat_message": ai_message,
                "is_private_chat": is_private_chat,
                "agent_id": str(agent_id) if agent_id else agent_id,
                'team_id': str(team_id) if team_id else team_id,
            },
        )

        return res
