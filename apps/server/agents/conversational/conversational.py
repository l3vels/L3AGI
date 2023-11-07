from uuid import UUID

from langchain.agents import AgentType, initialize_agent

from agents.base_agent import BaseAgent
from agents.conversational.output_parser import ConvoOutputParser
from agents.handle_agent_errors import handle_agent_error
from config import Config
from memory.zep.zep_memory import ZepMemory
from postgres import PostgresChatMessageHistory
from services.pubsub import ChatPubSubService
from services.run_log import RunLogsManager
from services.voice import text_to_speech
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings, AccountVoiceSettings
from utils.model import get_llm
from utils.system_message import SystemMessageBuilder


class ConversationalAgent(BaseAgent):
    def run(
        self,
        settings: AccountSettings,
        voice_settings: AccountVoiceSettings,
        chat_pubsub_service: ChatPubSubService,
        agent_with_configs: AgentWithConfigsOutput,
        tools,
        prompt: str,
        history: PostgresChatMessageHistory,
        human_message_id: str,
        run_id: UUID,
        sender_user_id: str,
        run_logs_manager: RunLogsManager,
        pre_retrieved_context: str,
    ):
        memory = ZepMemory(
            session_id=str(self.session_id),
            url=Config.ZEP_API_URL,
            api_key=Config.ZEP_API_KEY,
            memory_key="chat_history",
            return_messages=True,
        )

        memory.human_name = self.sender_name
        memory.ai_name = agent_with_configs.agent.name

        system_message = SystemMessageBuilder(
            agent_with_configs, pre_retrieved_context
        ).build()

        run_logs_manager.create_system_run_log(system_message)

        res: str

        try:
            llm = get_llm(
                settings,
                agent_with_configs,
            )

            agent = initialize_agent(
                tools,
                llm,
                agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
                verbose=True,
                memory=memory,
                handle_parsing_errors="Check your output and make sure it conforms!",
                agent_kwargs={
                    "system_message": system_message,
                    "output_parser": ConvoOutputParser(),
                },
                callbacks=[run_logs_manager.get_agent_callback_handler()],
            )

            res = agent.run(prompt)
        except Exception as err:
            res = handle_agent_error(err)

            memory.save_context(
                {
                    "input": prompt,
                    "chat_history": memory.load_memory_variables({})["chat_history"],
                },
                {
                    "output": res,
                },
            )

        configs = agent_with_configs.configs
        audio_url = None
        if configs.response_mode.includes("Voice"):
            # todo text to speech and generate audio url
            audio_url = text_to_speech(res, configs, voice_settings)
            pass

        ai_message = history.create_ai_message(
            res, human_message_id, agent_with_configs.agent.id, audio_url
        )

        chat_pubsub_service.send_chat_message(chat_message=ai_message)

        return res
