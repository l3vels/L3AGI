from typing import List, Optional

from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    HumanMessage,
    SystemMessage,
)
import functools
from fastapi_sqlalchemy import db
from agents.agent_simulations.agent.dialogue_agent import DialogueSimulator
from agents.agent_simulations.agent.dialogue_agent_with_tools import DialogueAgentWithTools
from agents.agent_simulations.authoritarian.director_dialogue_agent_with_tools import DirectorDialogueAgentWithTools
from services.pubsub import ChatPubSubService
from agents.base_agent import BaseAgent
from postgres import PostgresChatMessageHistory
from models.team import TeamModel
from utils.system_message import SystemMessageBuilder
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from typings.config import AccountSettings
from tools.get_tools import get_agent_tools
from tools.datasources.get_datasource_tools import get_datasource_tools
from models.datasource import DatasourceModel
from typings.team_agent import TeamAgentRole
from utils.agent import convert_model_to_response
from config import Config
from memory.zep.zep_memory import ZepMemory

class AuthoritarianSpeaker(BaseAgent):
    def __init__(
        self,
        settings: AccountSettings,
        chat_pubsub_service: ChatPubSubService,
        user,
        account,
        session_id,
        stopping_probability: int,
        word_limit: Optional[int] = 50,
    ) -> None:
        super().__init__(user=user, account=account, session_id=session_id)
        self.word_limit = word_limit    
        self.stopping_probability = stopping_probability
        self.settings = settings
        self.chat_pubsub_service = chat_pubsub_service
    
    def select_next_speaker(
            self, step: int, agents: List[DialogueAgentWithTools], director: DirectorDialogueAgentWithTools
    ) -> int:
        """
        If the step is even, then select the director
        Otherwise, the director selects the next speaker.
        """
        # the director speaks on odd steps
        if step % 2 == 1:
            idx = 0
        else:
            # here the director chooses the next speaker
            idx = director.select_next_speaker() + 1  # +1 because we excluded the director
        return idx
    
    def generate_specified_prompt(self, topic, agent_summary, team):
        description = """
        This is a Daily Show episode discussing the following topic: {user_input}.
        The episode features {agents}.
        Please elaborate on the topic. 
        Frame the topic as a single question to be answered.
        Be creative and imaginative.
        Please reply with the specified topic in {word_limit} words or less. 
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
            agents_with_configs:List[AgentWithConfigsOutput],   
            history: PostgresChatMessageHistory,
            ):
        agent_summary = "\n- ".join(
            [""] + [f"{agent_config.agent.name}: {agent_config.agent.role}" for agent_config in agents_with_configs]
        )

        specified_topic = topic #self.generate_specified_prompt(topic, agent_summary, team)

        memory = ZepMemory(
            session_id=self.session_id,
            url=Config.ZEP_API_URL,
            api_key=Config.ZEP_API_KEY,
            memory_key="chat_history",
            return_messages=True,
        )

        memory.human_name = self.user.name
        memory.save_human_message(specified_topic)

        # print(f"Original topic:\n{topic}\n")
        # print(f"Detailed topic:\n{specified_topic}\n")

        # specified_topic_ai_message = history.create_ai_message(specified_topic)
        # self.chat_pubsub_service.send_chat_message(chat_message=specified_topic_ai_message)

        directors = [convert_model_to_response(team_agent.agent) for team_agent in team.team_agents if team_agent.role == TeamAgentRole.DIRECTOR.value]

        director_agent = directors[0] if directors else agents_with_configs[0]
        director_name = director_agent.agent.name
        director_id = director_agent.agent.id

        director = DirectorDialogueAgentWithTools(
                    name=director_name,
                    agent_with_configs=director_agent,
                    tools=self.get_tools(director_agent, self.settings),
                    system_message=SystemMessage(content=SystemMessageBuilder(director_agent).build()),
                    model=ChatOpenAI(openai_api_key=self.settings.openai_api_key,temperature=director_agent.configs.temperature, 
                        model_name=director_agent.configs.model_version 
                        if director_agent.configs.model_version else "gpt-4"),
                    speakers=[agent_with_config for agent_with_config in agents_with_configs if agent_with_config.agent.id != director_agent.agent.id],
                    stopping_probability=self.stopping_probability,
                    session_id=self.session_id,
                    user=self.user,
                    is_memory=team.is_memory
                    )
        
        agents = [director]
        for agent_with_configs in agents_with_configs:
            if agent_with_configs.agent.id != director_id:
                agents.append(
                DialogueAgentWithTools(
                    name=agent_with_configs.agent.name,
                    agent_with_configs=agent_with_configs,
                    tools=self.get_tools(agent_with_configs, self.settings),
                    system_message=SystemMessage(content=SystemMessageBuilder(agent_with_configs).build()),
                    model=ChatOpenAI(openai_api_key=self.settings.openai_api_key,temperature=0.2, model_name="gpt-4"),
                    session_id=self.session_id,
                    user=self.user,
                    is_memory=team.is_memory
                )
            )

        simulator = DialogueSimulator(
            agents=agents,
            selection_function=functools.partial(self.select_next_speaker, director=director),
            is_memory=team.is_memory
        )
        simulator.reset()
        simulator.inject("Audience member", specified_topic)

        while True:
            agent_id, agent_name, message = simulator.step()
            ai_message = history.create_ai_message(message, None, agent_id)
            
            if team.is_memory:
                memory.ai_name = agent_name
                memory.save_ai_message(message)

            self.chat_pubsub_service.send_chat_message(chat_message=ai_message)

            if director.stop:
                break