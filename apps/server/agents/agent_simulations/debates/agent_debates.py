from typing import List, Optional

from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    HumanMessage,
    SystemMessage,
)
from fastapi_sqlalchemy import db
from services.pubsub import ChatPubSubService
from agents.agent_simulations.agent.dialogue_agent import DialogueAgent, DialogueSimulator
from agents.agent_simulations.agent.dialogue_agent_with_tools import DialogueAgentWithTools

from agents.base_agent import BaseAgent
from postgres import PostgresChatMessageHistory
from typings.agent import AgentWithConfigsOutput
from models.team import TeamModel
from utils.system_message import SystemMessageBuilder
from utils.agent import convert_model_to_response
from typings.config import AccountSettings
from tools.get_tools import get_agent_tools
from tools.datasources.get_datasource_tools import get_datasource_tools
from models.datasource import DatasourceModel
from agents.handle_agent_errors import handle_agent_error
from config import Config
from memory.zep.zep_memory import ZepMemory

class AgentDebates(BaseAgent):
    def __init__(
        self,
        settings: AccountSettings,
        chat_pubsub_service: ChatPubSubService,
        user,
        account,
        session_id,     
        word_limit: Optional[int] = 50,
    ) -> None:
        super().__init__(user=user, account=account, session_id=session_id)
        self.word_limit = word_limit
        self.settings = settings
        self.chat_pubsub_service = chat_pubsub_service
 
    def select_next_speaker(self, step: int, agents: List[DialogueAgent]) -> int:
        idx = (step) % len(agents)
        return idx  
    
    def generate_specified_prompt(self, topic, agent_summary, team):
        description = """
        Here is user request: {user_input}                
        You are the moderator.
        Please make the topic more specific.
        Please reply with the specified quest in {word_limit} words or less. 
        Speak directly to the participants: {agents}.
        Focus on your tools, and data which is provided, don't create any temp game
        Do not add anything else."""
        
        if team.description:
            description = team.description
        
        content = description.format(user_input=topic, word_limit=self.word_limit, agents=agent_summary)  

        topic_specifier_prompt = [
            SystemMessage(content="You can make a topic more specific."),
            HumanMessage(content=content),
        ]
        specified_topic = ChatOpenAI(openai_api_key=self.settings.openai_api_key, temperature=1.0, model_name="gpt-4")(topic_specifier_prompt).content
        return specified_topic
        

    def get_tools(self, agent_with_configs: AgentWithConfigsOutput, settings: AccountSettings):
        datasources = db.session.query(DatasourceModel).filter(DatasourceModel.id.in_(agent_with_configs.configs.datasources)).all()
        datasource_tools = get_datasource_tools(datasources, settings, self.account)
        agent_tools = get_agent_tools(agent_with_configs.configs.tools, db, self.account, settings)
        return datasource_tools + agent_tools

    def run(self,
            topic: str,            
            team: TeamModel, 
            agents_with_configs: List[AgentWithConfigsOutput],   
            # agent_summaries: List[any],
            history: PostgresChatMessageHistory,
            is_private_chat: bool):
        agent_summary_string = "\n- ".join(
            [""] + [f"{agent_config.agent.name}: {agent_config.agent.role}" for agent_config in agents_with_configs]
        )

        
        specified_topic= topic #self.generate_specified_prompt(topic, agent_summary_string, team)

        print(f"Original topic:\n{topic}\n")
        print(f"Detailed topic:\n{specified_topic}\n")

        memory = ZepMemory(
            session_id=self.session_id,
            url=Config.ZEP_API_URL,
            api_key=Config.ZEP_API_KEY,
            memory_key="chat_history",
            return_messages=True,
        )

        memory.human_name = self.user.name
        memory.save_human_message(specified_topic)

        # specified_topic_ai_message = history.create_ai_message(specified_topic)
        # self.chat_pubsub_service.send_chat_message(chat_message=specified_topic_ai_message)

        dialogue_agents = [
            DialogueAgentWithTools(
                name=agent_with_config.agent.name,
                agent_with_configs=agent_with_config,
                system_message=SystemMessage(content=SystemMessageBuilder(agent_with_config).build()),
                #later need support other llms
                model=ChatOpenAI(openai_api_key=self.settings.openai_api_key, temperature=agent_with_config.configs.temperature, 
                                 model_name=agent_with_config.configs.model_version 
                                 if agent_with_config.configs.model_version else "gpt-4"),
                tools=self.get_tools(agent_with_config, self.settings),
                top_k_results=2,
                session_id=self.session_id,
                user=self.user,
                is_memory=team.is_memory,
            )
            for agent_with_config in agents_with_configs
        ]

        max_iters = 6
        n = 0

        simulator = DialogueSimulator(agents=dialogue_agents, selection_function=self.select_next_speaker, is_memory=team.is_memory)
        simulator.reset()
        simulator.inject("Moderator", specified_topic)

        while n < max_iters:
            agent_id, agent_name, message = simulator.step()
            ai_message = history.create_ai_message(message, None, agent_id)
            
            if team.is_memory:
                memory.ai_name = agent_name
                memory.save_ai_message(message)
            
            self.chat_pubsub_service.send_chat_message(chat_message=ai_message)

            n += 1
 