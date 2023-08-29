from typing import List, Optional

from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    HumanMessage,
    SystemMessage,
)
from pubsub_service import PubSubService
from agents.agent_simulations.agent.dialogue_agent import DialogueAgent, DialogueSimulator
from agents.agent_simulations.agent.dialogue_agent_with_tools import DialogueAgentWithTools

from l3_base import L3Base
from postgres import PostgresChatMessageHistory

azureService = PubSubService()


# os.environ["LANGCHAIN_TRACING"] = "false"

class L3AgentDebates(L3Base):
    def __init__(
        self,
        user,
        account,
        session_id,
        game,
        collection,
        word_limit: Optional[int] = 50,
    ) -> None:
        super().__init__(user=user, account=account, session_id=session_id, game=game, collection=collection)
        self.word_limit = word_limit        
        
        self.agent_descriptor_system_message = SystemMessage(
            content="You can add detail to the description of the conversation participant."
        )
        
    def generate_agent_description(self, name, conversation_description):
        agent_specifier_prompt = [
            self.agent_descriptor_system_message,
            HumanMessage(
                content=f"""{conversation_description}
                Please reply with a creative description of {name}, in {self.word_limit} words or less. 
                Speak directly to {name}.
                Give them a point of view.
                Do not add anything else."""
            ),
        ]
        agent_description = ChatOpenAI(temperature=1.0, model_name="gpt-4")(agent_specifier_prompt).content
        return agent_description

    def generate_system_message(self, name, description, tools, conversation_description):
            return f"""{conversation_description}
            
        Your name is {name}.

        Your description is as follows: {description}

        Your goal is to persuade your conversation partner of your point of view.

        DO look up information with your tool to refute your partner's claims.
        DO cite your sources.
        
        Analyse chat history and DO NOT repeat the same things.

        DO NOT fabricate fake citations.
        DO NOT cite any source that you did not look up.

        Do not add anything else.

        Stop speaking the moment you finish speaking from your perspective.
        """
        
    def select_next_speaker(self, step: int, agents: List[DialogueAgent]) -> int:
        idx = (step) % len(agents)
        return idx  
    
    def generate_specified_prompt(self, topic, names):
        topic_specifier_prompt = [
            SystemMessage(content="You can make a topic more specific."),
            HumanMessage(
                content=f"""{topic}
                
                You are the moderator.
                Please make the topic more specific.
                Please reply with the specified quest in {self.word_limit} words or less. 
                Speak directly to the participants: {*names,}.
                Focus on your tools, and data which is provided, don't create any temp game
                Do not add anything else."""
            ),
        ]
        specified_topic = ChatOpenAI(temperature=1.0, model_name="gpt-4")(topic_specifier_prompt).content
        return specified_topic
    
    def run(self,
            topic: str,
            agent_summaries: List[any],
            history: PostgresChatMessageHistory,
            is_private_chat: bool):
        names = [agent['name'] for agent in agent_summaries]

        conversation_description = f"""Here is the topic of conversation: {topic}
        The participants are: {', '.join(names)}"""


        agent_descriptions = {
            agent['name']: self.generate_agent_description(agent['name'], conversation_description) for agent in agent_summaries
        }

        agent_system_messages = {
            agent['name']: self.generate_system_message(agent['name'], description, agent['tools'], conversation_description)
            for agent, description in zip(agent_summaries, agent_descriptions.values())
        }
        
        
        specified_topic= self.generate_specified_prompt(topic, names)

        print(f"Original topic:\n{topic}\n")
        print(f"Detailed topic:\n{specified_topic}\n")

        dialogue_agents = [
            DialogueAgentWithTools(
                name=agent['name'],
                system_message=SystemMessage(content=system_message),
                model=ChatOpenAI(temperature=0.2, model_name="gpt-4", ),
                tools=agent['tools'],
                top_k_results=2,
            )
            for agent, system_message in zip(
                agent_summaries, agent_system_messages.values()
            )
        ]

        max_iters = 6
        n = 0

        simulator = DialogueSimulator(agents=dialogue_agents, selection_function=self.select_next_speaker)
        simulator.reset()
        simulator.inject("Moderator", specified_topic)
        print(f"(Moderator): {specified_topic}")
        print("\n")

        while n < max_iters:
            name, message = simulator.step()

            db_message = f"({name}): {message}"
            # res = agent.run(prompt, callbacks=[handler])

            ai_message = history.create_ai_message(db_message)

            azureService.send_to_group(self.session_id, message={
                'type': 'CHAT_MESSAGE_ADDED',
                'from': self.user.id,
                'chat_message': ai_message,
                'is_private_chat': is_private_chat,
            })
            print(f"({name}): {message}")
            print("\n")
            n += 1
