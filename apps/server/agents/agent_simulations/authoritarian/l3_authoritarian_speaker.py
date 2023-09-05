from typing import List, Optional

from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    HumanMessage,
    SystemMessage,
)
import functools
from pubsub_service import PubSubService
from agents.agent_simulations.agent.dialogue_agent import DialogueSimulator
from agents.agent_simulations.agent.dialogue_agent_with_tools import DialogueAgentWithTools
from agents.agent_simulations.authoritarian.director_dialogue_agent_with_tools import DirectorDialogueAgentWithTools
from l3_base import L3Base
from postgres import PostgresChatMessageHistory
from models.agent import AgentModel
from models.team import TeamModel
from utils.system_message import SystemMessageBuilder

azureService = PubSubService()


# os.environ["LANGCHAIN_TRACING"] = "false"

class L3AuthoritarianSpeaker(L3Base):
    def __init__(
        self,
        user,
        account,
        session_id,
        word_limit: Optional[int] = 50,
    ) -> None:
        super().__init__(user=user, account=account, session_id=session_id)
        self.word_limit = word_limit        
        
        # self.agent_descriptor_system_message = SystemMessage(
        #     content="You can add detail to the description of each person."
        # )
    
    # def generate_agent_description(self, agent_name, agent_role, agent_location, conversation_description):
    #     agent_specifier_prompt = [
    #         self.agent_descriptor_system_message,
    #         HumanMessage(
    #             content=f"""{conversation_description}
    #             Please reply with a creative description of {agent_name}, who is a {agent_role} in {agent_location}, that emphasizes their particular role and location.
    #             Speak directly to {agent_name} in {self.word_limit} words or less.
    #             Do not add anything else."""
    #         ),
    #     ]
    #     agent_description = ChatOpenAI(temperature=1.0, model_name="gpt-4")(agent_specifier_prompt).content
    #     return agent_description

    # def generate_agent_header(self, agent_name, agent_role, agent_location, agent_description, conversation_description, topic):
    #     return f"""{conversation_description}

    # Your name is {agent_name}, your role is {agent_role}, and you are located in {agent_location}.

    # Your description is as follows: {agent_description}

    # You are discussing the topic: {topic}.

    # Your goal is to provide the most informative, creative, and novel perspectives of the topic from the perspective of your role and your location.
    # """

    def generate_agent_system_message(self, agent_name, agent_header):
        return SystemMessage(
            content=(
                f"""{agent_header}
    You will speak in the style of {agent_name}, and exaggerate your personality.
    Do not say the same things over and over again.
    Speak in the first person from the perspective of {agent_name}
    For describing your own body movements, wrap your description in '*'.
    Do not change roles!
    Do not speak from the perspective of anyone else.
    Speak only from the perspective of {agent_name}.
    Stop speaking the moment you finish speaking from your perspective.
    Never forget to keep your response to {self.word_limit} words!
    Do not add anything else.
        """))
    
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
        specified_topic = ChatOpenAI(temperature=1.0, model_name="gpt-4")(topic_specifier_prompt).content
        return specified_topic

       
        
    def run(self,
            topic: str,
            team: TeamModel, 
            agents:List[AgentModel],   
            # agent_summaries: list[any],
            history: PostgresChatMessageHistory,
            is_private_chat: bool
            ):
        agent_summary_string = "\n- ".join(
            [""] + [f"{agent['name']}: {agent['role']}" for agent in agents]
        )

        conversation_description = f"""This is a Daily Show episode discussing the following topic: {topic}.

        The episode features {agent_summary_string}."""


        # agent_descriptions = [
        #     self.generate_agent_description(agent['name'], agent['role'], 
        #                                     agent['location'], conversation_description) for agent in agent_summaries
        # ]

        # agent_headers = [
        #     self.generate_agent_header(agent['name'], agent['role'], agent['location'],
        #                                description,conversation_description=conversation_description, topic=topic )
        #     for agent, description in zip(agent_summaries, agent_descriptions)
        # ]
        
        # agent_system_messages = [
        #     self.generate_agent_system_message(agent['name'], header)
        #     for agent, header in zip(agent_summaries, agent_headers)
        # ]

        # for name, description, header, system_message in zip(
        #     agent_summaries, agent_descriptions, agent_headers, agent_system_messages
        # ):
        #     print(f"\n\n{name} Description:")
        #     print(f"\n{description}")
        #     print(f"\nHeader:\n{header}")
        #     print(f"\nSystem Message:\n{system_message.content}")


        specified_topic = self.generate_specified_prompt(topic, conversation_description)

        print(f"Original topic:\n{topic}\n")
        print(f"Detailed topic:\n{specified_topic}\n")

        directors = [agent for agent in agents if agent.get('is_director', False) == True]
        # Assuming there's only one director:
        
        director_agent = directors[0] if directors else agents[0]
        director_name = director_agent.name
        director_id = director_agent.id

        director = DirectorDialogueAgentWithTools(
                    name=director_name,
                    tools=director_agent.tools,
                    system_message=SystemMessageBuilder(director_agent),
                    #later need support other llms
                    model=ChatOpenAI(temperature=director_agent.temperature, model_name=director_agent.model_version),
                    speakers=[agent.name for agent in agents if agent.id != director_agent.id],
                    stopping_probability=0.2,
                    )
        agents = [director]
        for agent, system_message in agents:
            if not agent.id != director_id:
                agents.append(
                DialogueAgentWithTools(
                    name=agent.name,
                    tools=agent['tools'],
                    system_message=system_message,
                    model=ChatOpenAI(temperature=0.2, model_name="gpt-4"),
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
            name, message = simulator.step()

            res = f"({name}): {message}"
            # res = agent.run(prompt, callbacks=[handler])

            ai_message = history.create_ai_message(res)

            azureService.send_to_group(self.session_id, message={
                'type': 'CHAT_MESSAGE_ADDED',
                'from': self.user.id,
                'chat_message': ai_message,
                'is_private_chat': is_private_chat,
            })
            print(f"({name}): {message}")
            print("\n")
            if director.stop:
                break
