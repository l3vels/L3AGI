from typing import List, Optional

import numpy as np
import tenacity
from fastapi_sqlalchemy import db
from langchain.schema import HumanMessage, SystemMessage
from langchain_community.chat_models import ChatOpenAI

from agents.agent_simulations.agent.dialogue_agent import DialogueSimulator
from agents.agent_simulations.agent.dialogue_agent_with_tools import \
    DialogueAgentWithTools
from agents.agent_simulations.decentralized.bidding_dialogue_agent import \
    BiddingDialogueAgent
from agents.agent_simulations.decentralized.output_parser import bid_parser
from agents.base_agent import BaseAgent
from config import Config
from memory.zep.zep_memory import ZepMemory
from models.config import ConfigModel
from models.datasource import DatasourceModel
from models.team import TeamModel
from postgres import PostgresChatMessageHistory
from services.pubsub import ChatPubSubService
from services.run_log import RunLogsManager
from tools.datasources.get_datasource_tools import get_datasource_tools
from tools.get_tools import get_agent_tools
from typings.agent import AgentWithConfigsOutput
from typings.chat import ChatStatus
from typings.config import AccountSettings
from utils.model import get_llm
from utils.system_message import SystemMessageBuilder


class DecentralizedSpeaker(BaseAgent):
    def __init__(
        self,
        settings: AccountSettings,
        chat_pubsub_service: ChatPubSubService,
        sender_name,
        session_id,
        provider_account,
        stopping_probability: int,
        word_limit: Optional[int] = 50,
        run_logs_manager: Optional[RunLogsManager] = None,
    ) -> None:
        super().__init__(
            sender_name=sender_name,
            provider_account=provider_account,
            session_id=session_id,
        )
        self.word_limit = word_limit
        self.stopping_probability = stopping_probability
        self.settings = settings
        self.chat_pubsub_service = chat_pubsub_service
        self.run_logs_manager = run_logs_manager

    @tenacity.retry(
        stop=tenacity.stop_after_attempt(2),
        wait=tenacity.wait_none(),  # No waiting time between retries
        retry=tenacity.retry_if_exception_type(ValueError),
        before_sleep=lambda retry_state: print(
            f"ValueError occurred: {retry_state.outcome.exception()}, retrying..."
        ),
        retry_error_callback=lambda retry_state: 0,
    )  # Default value when all retries are exhausted
    def ask_for_bid(self, agent) -> str:
        """
        Ask for agent bid and parses the bid into the correct format.
        """
        bid_string = agent.bid()
        bid = int(bid_parser.parse(bid_string)["bid"])
        return bid

    def select_next_speaker(
        self, step: int, agents: List[DialogueAgentWithTools]
    ) -> int:
        bids = []
        for agent in agents:
            bid = self.ask_for_bid(agent)
            bids.append(bid)

        # randomly select among multiple agents with the same bid
        max_value = np.max(bids)
        max_indices = np.where(bids == max_value)[0]
        idx = np.random.choice(max_indices)

        print("Bids:")
        for i, (bid, agent) in enumerate(zip(bids, agents)):
            print(f"\t{agent.name} bid: {bid}")
            if i == idx:
                selected_name = agent.name
        print(f"Selected: {selected_name}")
        print("\n")
        return idx

    # TODO: reuse in conversational and teams
    def get_tools(
        self, agent_with_configs: AgentWithConfigsOutput, settings: AccountSettings
    ):
        tool_callback_handler = self.run_logs_manager.get_tool_callback_handler()

        datasources = (
            db.session.query(DatasourceModel)
            .filter(DatasourceModel.id.in_(agent_with_configs.configs.datasources))
            .all()
        )
        datasource_tools = get_datasource_tools(
            datasources,
            settings,
            self.provider_account,
            agent_with_configs,
            tool_callback_handler,
        )
        agent_tools = get_agent_tools(
            agent_with_configs.configs.tools,
            db,
            self.provider_account,
            settings,
            agent_with_configs,
            tool_callback_handler,
        )
        return datasource_tools + agent_tools

    def generate_character_description(
        self,
        player_descriptor_system_message: str,
        game_description: str,
        character_name: str,
        llm: ChatOpenAI,
    ):
        character_specifier_prompt = [
            player_descriptor_system_message,
            HumanMessage(
                content=f"""{game_description}
                Please reply with a creative description of the presidential candidate, {character_name}, in {self.word_limit} words or less, that emphasizes their personalities. 
                Speak directly to {character_name}.
                Do not add anything else."""
            ),
        ]
        character_description = llm(character_specifier_prompt).content
        return character_description

    def generate_character_header(
        self, topic: str, game_description: str, character_name, role: str
    ):
        return f"""{game_description}
Your name is {character_name}.
Your role is: {role}
Your goal is to accomplish tasks.
Here is task or topic: {topic}.
    """

    #     def generate_character_system_message(
    #         self, topic, character_name, character_header
    #     ):
    #         return SystemMessage(
    #             content=(
    #                 f"""{character_header}
    # You will speak in the style of {character_name}, and exaggerate their personality.
    # You will come up with creative ideas related to {topic}.
    # Do not say the same things over and over again.
    # Speak in the first person from the perspective of {character_name}
    # For describing your own body movements, wrap your description in '*'.
    # Do not change roles!
    # Do not speak from the perspective of anyone else.
    # Speak only from the perspective of {character_name}.
    # Stop speaking the moment you finish speaking from your perspective.
    # Never forget to keep your response to {self.word_limit} words!
    # Do not add anything else.
    #         """
    #             )
    #         )

    def generate_character_bidding_template(self, header: str, name: str, role: str):
        bidding_template = f"""{header}

    ```
    {{message_history}}
    ```

    In the context of {name}, On the scale of 1 to 10, where 1 is not relevant and 10 is extremely relevant, rate how relevant are you to accomplish task.

    ```
    {{recent_message}}
    ```

    {bid_parser.get_format_instructions()}
    Do nothing else.
        """
        return bidding_template

    def run(
        self,
        topic: str,
        team: TeamModel,
        agents_with_configs: List[AgentWithConfigsOutput],
        history: PostgresChatMessageHistory,
    ):
        specified_topic = (
            topic  # self.generate_specified_prompt(topic, agent_summary, team)
        )

        memory = ZepMemory(
            session_id=self.session_id,
            url=Config.ZEP_API_URL,
            api_key=Config.ZEP_API_KEY,
            memory_key="chat_history",
            return_messages=True,
        )

        memory.human_name = self.sender_name
        memory.save_human_message(specified_topic)

        agent_names = [agent_config.agent.name for agent_config in agents_with_configs]

        game_description = f"""Here is the topic: {specified_topic}.
        Speakers are: {', '.join(agent_names)}."""

        player_descriptor_system_message = SystemMessage(
            content="You can add detail to the description of each debate candidate."
        )

        try:
            dialogue_agents = []

            for agent_with_configs in agents_with_configs:
                name = agent_with_configs.agent.name

                # description = self.generate_character_description(
                #     player_descriptor_system_message, game_description, name, llm
                # )

                character_header = self.generate_character_header(
                    specified_topic,
                    game_description,
                    name,
                    agent_with_configs.agent.role,
                )

                bidding_template = self.generate_character_bidding_template(
                    character_header, name, agent_with_configs.agent.role
                )

                # character_system_message = self.generate_character_system_message(
                #     specified_topic, name, character_header
                # )

                dialogue_agents.append(
                    BiddingDialogueAgent(
                        name=name,
                        agent_with_configs=agent_with_configs,
                        system_message=SystemMessage(
                            content=SystemMessageBuilder(agent_with_configs).build()
                        ),
                        bidding_template=bidding_template,
                        model=get_llm(self.settings, agent_with_configs),
                        session_id=self.session_id,
                        tools=self.get_tools(agent_with_configs, self.settings),
                        sender_name=self.sender_name,
                        is_memory=team.is_memory,
                        run_logs_manager=self.run_logs_manager,
                    )
                )

            max_iters = 1

            n = 0

            simulator = DialogueSimulator(
                agents=dialogue_agents,
                selection_function=self.select_next_speaker,
                is_memory=team.is_memory,
            )
            simulator.reset()
            simulator.inject("Debate Moderator", specified_topic)
            print(f"(Debate Moderator): {specified_topic}")
            print("\n")

            while n < max_iters:
                status_config = ConfigModel.get_config_by_session_id(
                    db, self.session_id, self.provider_account
                )

                if status_config.value == ChatStatus.STOPPED.value:
                    break

                agent_id, agent_name, message = simulator.step()

                print(f"({agent_name}): {message}")
                print("\n")

                db.session.refresh(status_config)

                if status_config.value == ChatStatus.STOPPED.value:
                    break

                ai_message = history.create_ai_message(message, None, agent_id)

                # if team.is_memory:
                memory.ai_name = agent_name
                memory.save_ai_message(message)

                self.chat_pubsub_service.send_chat_message(chat_message=ai_message)

                n += 1
        except Exception as err:
            ai_message = history.create_ai_message(str(err))
            memory.save_ai_message(str(err))
            self.chat_pubsub_service.send_chat_message(chat_message=ai_message)
