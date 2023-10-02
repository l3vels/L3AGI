from langchain.chat_models import ChatOpenAI
from typing import Dict, List
from fastapi_sqlalchemy import db
from uuid import UUID

from postgres import PostgresChatMessageHistory
from agents.base_agent import BaseAgent
from agents.plan_and_execute.chat_planner import initialize_chat_planner
from agents.plan_and_execute.agent_executor import initialize_executor
from agents.plan_and_execute.plan_and_execute_chain import PlanAndExecuteChain
from memory.zep.zep_memory import ZepMemory
from config import Config
from utils.agent import convert_model_to_response
from utils.system_message import SystemMessageBuilder
from models.datasource import DatasourceModel
from models.agent import AgentModel
from models.team import TeamModel
from models.team import TeamAgentModel
from typings.team_agent import TeamAgentRole
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from tools.get_tools import get_agent_tools
from tools.datasources.get_datasource_tools import get_datasource_tools
from services.pubsub import ChatPubSubService
from agents.handle_agent_errors import handle_agent_error
from exceptions import PlannerEmptyTasksException

class PlanAndExecute(BaseAgent):
    thoughts: List[Dict] = []
    ai_message_id: str

    def get_tools(self, agent_with_configs: AgentWithConfigsOutput, settings: AccountSettings):
        datasources = db.session.query(DatasourceModel).filter(DatasourceModel.id.in_(agent_with_configs.configs.datasources)).all()
        datasource_tools = get_datasource_tools(datasources, settings, self.provider_account)
        agent_tools = get_agent_tools(agent_with_configs.configs.tools, db, self.provider_account, settings)
        return datasource_tools + agent_tools

    def run(self, settings: AccountSettings, chat_pubsub_service: ChatPubSubService, team: TeamModel, prompt: str, history: PostgresChatMessageHistory, human_message_id: UUID):
        agents: List[TeamAgentModel] = team.team_agents
        
        planner_agent_with_configs: AgentWithConfigsOutput = None
        executor_agent_with_configs: AgentWithConfigsOutput = None

        for agent in agents:
            if agent.role == TeamAgentRole.PLANNER.value:
                #todo need account filter
                planner_agent_with_configs = convert_model_to_response(AgentModel.get_agent_by_id(db, agent.agent_id))
            if agent.role == TeamAgentRole.EXECUTOR.value:
                executor_agent_with_configs = convert_model_to_response(AgentModel.get_agent_by_id(db, agent.agent_id))

        ai_message = history.create_ai_message("", human_message_id)
        ai_message_id = ai_message['id']

        def on_thoughts(thoughts: List[Dict]):
            if len(thoughts) == 0:
                raise PlannerEmptyTasksException()

            updated_message = history.update_thoughts(ai_message_id, thoughts)
            chat_pubsub_service.send_chat_message(chat_message=updated_message)

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
        
        planner = initialize_chat_planner(planner_llm, planner_system_message, memory)

        executor_llm = ChatOpenAI(openai_api_key=settings.openai_api_key, temperature=executor_agent_with_configs.configs.temperature, model_name=executor_agent_with_configs.configs.model_version)
        executor_system_message = SystemMessageBuilder(executor_agent_with_configs).build()
        executor_tools = self.get_tools(executor_agent_with_configs, settings)

        executor = initialize_executor(
            executor_llm,
            executor_tools,
            executor_system_message,
        )

        agent = PlanAndExecuteChain(planner=planner, executor=executor, on_thoughts=on_thoughts)

        res: str

        try:
            res = agent.run({
                "input": prompt,
                "chat_history": memory.load_memory_variables({})['chat_history'],
            })
        except Exception as err:
            res = handle_agent_error(err)
            history.delete_message(ai_message_id)
            ai_message = history.create_ai_message(res)
            chat_pubsub_service.send_chat_message(chat_message=ai_message)
        
        return res
