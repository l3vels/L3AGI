from langchain.chat_models import ChatOpenAI
from typing import Dict, List
from fastapi_sqlalchemy import db
from openai.error import RateLimitError
import sentry_sdk

from pubsub_service import PubSubService
from l3_base import L3Base
from postgres import PostgresChatMessageHistory
from system_message import format_system_message
from agents.plan_and_execute.chat_planner import initialize_chat_planner
from agents.plan_and_execute.agent_executor import initialize_executor
from agents.plan_and_execute.plan_and_execute import PlanAndExecute
from memory.zep import ZepMemory
from config import Config
from utils.agent import convert_model_to_response
from utils.system_message import SystemMessageBuilder
from tools.base import BaseTool
from models.agent import AgentModel
from models.team import TeamModel
from models.team import TeamAgentModel
from typings.team_agent import TeamAgentRole
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings

azure_service = PubSubService()

class L3PlanAndExecute(L3Base):
    thoughts: List[Dict] = []
    ai_message_id: str

    def run(self, settings: AccountSettings, team: TeamModel, tools: List[BaseTool], prompt: str, history: PostgresChatMessageHistory, is_private_chat: bool, human_message_id: str):
        agents: List[TeamAgentModel] = team.team_agents
        
        planner_agent_with_configs: AgentWithConfigsOutput = None
        executor_agent_with_configs: AgentWithConfigsOutput = None

        for agent in agents:
            if agent.role == TeamAgentRole.PLANNER.value:
                planner_agent_with_configs = convert_model_to_response(AgentModel.get_agent_by_id(db, agent.agent_id, self.account))
            if agent.role == TeamAgentRole.EXECUTOR.value:
                executor_agent_with_configs = convert_model_to_response(AgentModel.get_agent_by_id(db, agent.agent_id, self.account))

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

        memory.human_name = self.user.name
        memory.ai_name = team.name

        planner_llm = ChatOpenAI(openai_api_key=settings.openai_api_key, temperature=planner_agent_with_configs.configs.temperature, model_name=planner_agent_with_configs.configs.model_version)
        planner_system_message = SystemMessageBuilder(planner_agent_with_configs).build()
        planner_system_message = format_system_message(planner_system_message, self.user, self.account)
        
        planner = initialize_chat_planner(planner_llm, planner_system_message, memory)

        executor_llm = ChatOpenAI(openai_api_key=settings.openai_api_key, temperature=executor_agent_with_configs.configs.temperature, model_name=executor_agent_with_configs.configs.model_version)
        executor_system_message = SystemMessageBuilder(executor_agent_with_configs).build()
        executor_system_message = format_system_message(executor_system_message, self.user, self.account)
        
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
        except RateLimitError:
            msg = "AI is at rate limit, please try again later"
            history.delete_message(ai_message_id)
            history.create_ai_message(msg, human_message_id)
            return msg
        except Exception as err:
            sentry_sdk.capture_exception(err)
            msg = "Something went wrong, please try again later"
            history.delete_message(ai_message_id)
            history.create_ai_message(msg, human_message_id)
            return msg

