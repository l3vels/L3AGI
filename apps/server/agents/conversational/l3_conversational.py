import os
from typing import Optional
from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI
from postgres import PostgresChatMessageHistory
from memory.zep import ZepMemory
from services.pubsub import ChatPubSubService
from l3_base import L3Base
from openai.error import RateLimitError, AuthenticationError, Timeout as TimeoutError, ServiceUnavailableError
import sentry_sdk
from config import Config
from agents.conversational.output_parser import ConvoOutputParser
from utils.system_message import SystemMessageBuilder
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from exceptions import ToolEnvKeyException

class L3Conversational(L3Base):
    def run(
        self,
        settings: AccountSettings,
        chat_pubsub_service: ChatPubSubService,
        agent_with_configs: AgentWithConfigsOutput,
        tools,
        prompt: str,
        history: PostgresChatMessageHistory,
        human_message_id: str,
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
            res = "OpenAI reached it's rate limit, please check billing on OpenAI"
        except AuthenticationError:
            res = "Your OpenAI API key is invalid. Please recheck it in [Settings](/settings)"
        except TimeoutError as err:
            res = "OpenAI timed out, please try again later"
        except ServiceUnavailableError:
            res = "OpenAI service is unavailable at the moment, please try again later"
        except ToolEnvKeyException as err:
            res = str(err)
        except Exception as err:
            print(err)
            sentry_sdk.capture_exception(err)
            res = f"Something went wrong. Error: {err}"

        ai_message = history.create_ai_message(res, human_message_id)
        chat_pubsub_service.send_chat_message(chat_message=ai_message)

        return res
