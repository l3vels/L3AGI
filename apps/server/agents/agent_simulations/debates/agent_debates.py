from typing import List, Optional

from fastapi_sqlalchemy import db
from langchain.schema import HumanMessage, SystemMessage
from langchain_community.chat_models import ChatOpenAI

from agents.agent_simulations.agent.dialogue_agent import (DialogueAgent,
                                                           DialogueSimulator)
from agents.agent_simulations.agent.dialogue_agent_with_tools import \
    DialogueAgentWithTools
from agents.base_agent import BaseAgent
from config import Config
from exceptions import InvalidLLMApiKeyException
from memory.zep.zep_memory import ZepMemory
from models.config import ConfigModel
from models.datasource import DatasourceModel
from models.team import TeamModel
from postgres import PostgresChatMessageHistory
from services.pubsub import ChatPubSubService
from tools.datasources.get_datasource_tools import get_datasource_tools
from tools.get_tools import get_agent_tools
from typings.agent import AgentWithConfigsOutput
from typings.chat import ChatStatus
from typings.config import AccountSettings
from utils.model import get_llm
from utils.system_message import SystemMessageBuilder


class AgentDebates(BaseAgent):
    def __init__(
        self,
        settings: AccountSettings,
        chat_pubsub_service: ChatPubSubService,
        sender_name: str,
        provider_account,
        session_id,
        word_limit: Optional[int] = 50,
    ) -> None:
        super().__init__(
            sender_name=sender_name,
            provider_account=provider_account,
            session_id=session_id,
        )
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

        content = description.format(
            user_input=topic, word_limit=self.word_limit, agents=agent_summary
        )

        topic_specifier_prompt = [
            SystemMessage(content="You can make a topic more specific."),
            HumanMessage(content=content),
        ]
        # TODO: support llm after we gonna use this function
        specified_topic = ChatOpenAI(
            openai_api_key=self.settings.openai_api_key,
            temperature=1.0,
            model_name="gpt-4",
        )(topic_specifier_prompt).content
        return specified_topic

    # TODO: reuse in conversational and teams
    def get_tools(
        self, agent_with_configs: AgentWithConfigsOutput, settings: AccountSettings
    ):
        datasources = (
            db.session.query(DatasourceModel)
            .filter(DatasourceModel.id.in_(agent_with_configs.configs.datasources))
            .all()
        )
        datasource_tools = get_datasource_tools(
            datasources, settings, self.provider_account, agent_with_configs, None
        )
        agent_tools = get_agent_tools(
            agent_with_configs.configs.tools,
            db,
            self.provider_account,
            settings,
            agent_with_configs,
            None,
        )
        return datasource_tools + agent_tools

    def run(
        self,
        topic: str,
        team: TeamModel,
        agents_with_configs: List[AgentWithConfigsOutput],
        history: PostgresChatMessageHistory,
    ):
        specified_topic = (
            topic  # self.generate_specified_prompt(topic, agent_summary_string, team)
        )

        print(f"Original topic:\n{topic}\n")
        print(f"Detailed topic:\n{specified_topic}\n")

        memory = ZepMemory(
            session_id=self.session_id,
            url=Config.ZEP_API_URL,
            api_key=Config.ZEP_API_KEY,
            memory_key="chat_history",
            return_messages=True,
        )

        memory.human_name = self.sender_name
        memory.save_human_message(specified_topic)

        # specified_topic_ai_message = history.create_ai_message(specified_topic)
        # self.chat_pubsub_service.send_chat_message(chat_message=specified_topic_ai_message)

        try:
            dialogue_agents = [
                DialogueAgentWithTools(
                    name=agent_with_config.agent.name,
                    agent_with_configs=agent_with_config,
                    system_message=SystemMessage(
                        content=SystemMessageBuilder(agent_with_config).build()
                    ),
                    model=get_llm(
                        self.settings,
                        agent_with_config,
                    ),
                    tools=self.get_tools(agent_with_config, self.settings),
                    top_k_results=2,
                    session_id=self.session_id,
                    sender_name=self.sender_name,
                    is_memory=team.is_memory,
                )
                for agent_with_config in agents_with_configs
            ]

            max_iters = 6
            n = 0

            simulator = DialogueSimulator(
                agents=dialogue_agents,
                selection_function=self.select_next_speaker,
                is_memory=team.is_memory,
            )
            simulator.reset()
            simulator.inject("Moderator", specified_topic)

            while n < max_iters:
                status_config = ConfigModel.get_config_by_session_id(
                    db, self.session_id, self.provider_account
                )

                if status_config.value == ChatStatus.STOPPED.value:
                    break

                agent_id, agent_name, message = simulator.step()

                db.session.refresh(status_config)

                if status_config.value == ChatStatus.STOPPED.value:
                    break

                ai_message = history.create_ai_message(message, None, agent_id)

                if team.is_memory:
                    memory.ai_name = agent_name
                    memory.save_ai_message(message)

                self.chat_pubsub_service.send_chat_message(chat_message=ai_message)

                n += 1
        except InvalidLLMApiKeyException as err:
            ai_message = history.create_ai_message(str(err))
            memory.save_ai_message(str(err))
            self.chat_pubsub_service.send_chat_message(chat_message=ai_message)
