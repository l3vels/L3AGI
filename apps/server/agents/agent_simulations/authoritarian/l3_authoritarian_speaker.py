from typing import List, Optional

from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    HumanMessage,
    SystemMessage,
)
import functools
from fastapi_sqlalchemy import db
from pubsub_service import PubSubService
from agents.agent_simulations.agent.dialogue_agent import DialogueSimulator
from agents.agent_simulations.agent.dialogue_agent_with_tools import DialogueAgentWithTools
from agents.agent_simulations.authoritarian.director_dialogue_agent_with_tools import DirectorDialogueAgentWithTools
from l3_base import L3Base
from postgres import PostgresChatMessageHistory
from models.team import TeamModel
from utils.system_message import SystemMessageBuilder
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from typings.config import AccountSettings
from tools.get_tools import get_agent_tools
from tools.datasources.get_datasource_tools import get_datasource_tools
from models.datasource import DatasourceModel

azureService = PubSubService()

# os.environ["LANGCHAIN_TRACING"] = "false"

class L3AuthoritarianSpeaker(L3Base):
    def __init__(
        self,
        settings: AccountSettings,
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

    def generate_specified_prompt(self, topic, conversation_description):
        topic_specifier_prompt = [
            SystemMessage(content="You can make a task more specific."),
            HumanMessage(
                content=f"""{conversation_description}
                
                Please elaborate on the topic. 
                Frame the topic as a single question to be answered.
                Be creative and imaginative.
                Please reply with the specified topic in {self.word_limit} words or less. 
                Do not add anything else."""
            ),
        ]
        specified_topic = ChatOpenAI(openai_api_key=self.settings.openai_api_key,temperature=1.0, model_name="gpt-4")(topic_specifier_prompt).content
        return specified_topic

    def get_tools(self, agent_with_configs: AgentWithConfigsOutput, settings: AccountSettings):
        datasources = db.session.query(DatasourceModel).filter(DatasourceModel.id.in_(agent_with_configs.configs.datasources)).all()
        datasource_tools = get_datasource_tools(datasources, settings)
        agent_tools = get_agent_tools(agent_with_configs.configs.tools, db, self.account)
        return datasource_tools + agent_tools

        
    def run(self,
            topic: str,
            team: TeamModel, 
            agents_with_configs:List[AgentWithConfigsOutput],   
            # agent_summaries: list[any],
            history: PostgresChatMessageHistory,
            is_private_chat: bool
            ):
        agent_summary_string = "\n- ".join(
            [""] + [f"{agent_config.agent.name}: {agent_config.agent.role}" for agent_config in agents_with_configs]
        )

        conversation_description = f"""This is a Daily Show episode discussing the following topic: {topic}.

        The episode features {agent_summary_string}."""

        specified_topic = self.generate_specified_prompt(topic, conversation_description)

        print(f"Original topic:\n{topic}\n")
        print(f"Detailed topic:\n{specified_topic}\n")

        # directors = [agent_config.agent for agent_config in agents_with_configs if agent_config.agent.is_director == True]
        directors = [agent_config.agent for agent_config in agents_with_configs if hasattr(agent_config.agent, 'is_director') and agent_config.agent.is_director == True]
        # Assuming there's only one director:
        
        director_agent = directors[0] if directors else agents_with_configs[0]
        director_name = director_agent.agent.name
        director_id = director_agent.agent.id

        director = DirectorDialogueAgentWithTools(
                    name=director_name,
                    tools=self.get_tools(director_agent, self.settings),
                    system_message=SystemMessage(content=SystemMessageBuilder(director_agent).build()),
                    #later need support other llms
                    model=ChatOpenAI(openai_api_key=self.settings.openai_api_key,temperature=director_agent.configs.temperature, 
                        model_name=director_agent.configs.model_version 
                        if director_agent.configs.model_version else "gpt-4"),
                    speakers=[agent_with_config.agent.name for agent_with_config in agents_with_configs if agent_with_config.agent.id != director_agent.agent.id],
                    stopping_probability=self.stopping_probability,
                    )
        
        agents = [director]
        for agent_with_config in agents_with_configs:
            if agent_with_config.agent.id != director_id:
                agents.append(
                DialogueAgentWithTools(
                    name=agent_with_config.agent.name,
                    tools=self.get_tools(agent_with_config, self.settings),
                    system_message=SystemMessage(content=SystemMessageBuilder(agent_with_config).build()),
                    model=ChatOpenAI(openai_api_key=self.settings.openai_api_key,temperature=0.2, model_name="gpt-4"),
                )
            )
                
        simulator = DialogueSimulator(
            agents=agents,
            selection_function=functools.partial(self.select_next_speaker, director=director),
        )
        simulator.reset()
        simulator.inject("Audience member", specified_topic)
        print(f"(Audience member): {specified_topic}")
        print("\n")


        while True:
            try:
                name, message = simulator.step()

                res = f"({name}): {message}"
                # res = agent.run(prompt, callbacks=[handler])

                ai_message = history.create_ai_message(res)

                azureService.send_to_group(self.session_id, message={
                    'type': 'CHAT_MESSAGE_ADDED',
                    'from': str(self.user.id),
                    'chat_message': ai_message,
                    'is_private_chat': is_private_chat,
                })
                print(f"({name}): {message}")
                print("\n")
                if director.stop:
                    break
            except Exception as e:
                print(e)
                #todo return error as message
                self._step += 1