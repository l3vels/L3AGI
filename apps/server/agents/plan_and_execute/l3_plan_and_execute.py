from langchain.chat_models import ChatOpenAI
from langchain import SerpAPIWrapper
from langchain.agents.tools import Tool
from langchain import LLMMathChain
from fastapi_sqlalchemy import db

from typing import Dict, List
from pubsub_service import PubSubService
from l3_base import L3Base
from postgres import PostgresChatMessageHistory
from enums import ChatMessageVersion
from system_message import format_system_message
from agents.plan_and_execute.chat_planner import initialize_chat_planner
from agents.plan_and_execute.agent_executor import initialize_executor
from agents.plan_and_execute.plan_and_execute import PlanAndExecute
from openai.error import RateLimitError
import sentry_sdk
from memory.zep import ZepMemory
from config import Config
from utils.agent import convert_model_to_response
from models.agent import AgentModel
from utils.system_message import SystemMessageBuilder

azure_service = PubSubService()


class L3PlanAndExecute(L3Base):
    thoughts: List[Dict] = []
    ai_message_id: str

    def run(self, l3_tools, prompt: str, history: PostgresChatMessageHistory, version: ChatMessageVersion, is_private_chat: bool, human_message_id: str):
        planner_agent_with_configs = convert_model_to_response(AgentModel.get_agent_by_id(db, "b7f1ccce-44f0-4e7e-9098-a12fb7b93388", self.account))
        executor_agent_with_configs = convert_model_to_response(AgentModel.get_agent_by_id(db, "13f71e37-350e-4cec-a9d2-72050811f934", self.account))

        ai_message = history.create_ai_message("", human_message_id)
        ai_message_id = ai_message['id']

        def on_thoughts(thoughts: List[Dict]):
            updated_message = history.update_thoughts(ai_message_id, thoughts)

            data = {
                "type": "CHAT_MESSAGE_ADDED",
                "from": self.user.id,
                "chat_message": updated_message,
                "is_private_chat": is_private_chat,
            }

            azure_service.send_to_group(self.session_id, data)

        memory = ZepMemory(
            session_id=self.session_id,
            url=Config.ZEP_API_URL,
            api_key=Config.ZEP_API_KEY,
            memory_key="chat_history",
            return_messages=True
        )

        memory.human_name = self.user.first_name
        memory.ai_name = "AI"


        planner_llm = ChatOpenAI(temperature=planner_agent_with_configs.configs.temperature, model_name=planner_agent_with_configs.configs.model_version)
        planner_system_message = SystemMessageBuilder(planner_agent_with_configs).build()
        planner_system_message = format_system_message(planner_system_message, self.user, self.account, self.game, self.collection)
        
        planner = initialize_chat_planner(planner_llm, planner_system_message, memory)


        executor_llm = ChatOpenAI(temperature=executor_agent_with_configs.configs.temperature, model_name=executor_agent_with_configs.configs.model_version)

        tools = []

        if version == ChatMessageVersion.PLAN_AND_EXECUTE:
            search = SerpAPIWrapper()
            llm_math_chain = LLMMathChain.from_llm(llm=executor_llm, verbose=True)

            tools = [
                Tool(
                    name="Search",
                    func=search.run,
                    description="useful for when you need to answer questions about current events"
                ),
                Tool(
                    name="Calculator",
                    func=llm_math_chain.run,
                    description="useful for when you need to answer questions about math"
                ),
            ]
        elif version == ChatMessageVersion.PLAN_AND_EXECUTE_WITH_TOOLS:
            tools = l3_tools

        executor_system_message = SystemMessageBuilder(executor_agent_with_configs).build()
        executor_system_message = format_system_message(executor_system_message, self.user, self.account, self.game, self.collection)

        executor = initialize_executor(
            executor_llm,
            tools,
            executor_system_message,
        )

        agent = PlanAndExecute(planner=planner, executor=executor, on_thoughts=on_thoughts)

        try:
            return agent.run({
                "input": prompt,
                "chat_history": memory.load_memory_variables({})['chat_history'],
            })
        except RateLimitError as e:
            msg = "AI is at rate limit, please try again later"
            history.delete_message(ai_message_id)
            history.create_ai_message(msg, human_message_id)
            return msg
        except Exception as e:
            print(e)
            sentry_sdk.capture_exception(e)
            msg = "Something went wrong, please try again later"
            history.delete_message(ai_message_id)
            history.create_ai_message(msg, human_message_id)
            return msg

