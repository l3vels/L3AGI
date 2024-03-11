import asyncio

from langchain import hub
from langchain.agents import (AgentExecutor, AgentType, create_react_agent,
                              initialize_agent)

from agents.base_agent import BaseAgent
from agents.conversational.output_parser import ConvoOutputParser
from agents.conversational.streaming_aiter import AsyncCallbackHandler
from agents.handle_agent_errors import handle_agent_error
from config import Config
from memory.zep.zep_memory import ZepMemory
from postgres import PostgresChatMessageHistory
from services.pubsub import ChatPubSubService
from services.run_log import RunLogsManager
from services.voice import speech_to_text, text_to_speech
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings, AccountVoiceSettings
from utils.model import get_llm
from utils.system_message import SystemMessageBuilder


class ConversationalAgent(BaseAgent):
    async def run(
        self,
        settings: AccountSettings,
        voice_settings: AccountVoiceSettings,
        chat_pubsub_service: ChatPubSubService,
        agent_with_configs: AgentWithConfigsOutput,
        tools,
        prompt: str,
        voice_url: str,
        history: PostgresChatMessageHistory,
        human_message_id: str,
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

        res: str

        try:
            if voice_url:
                configs = agent_with_configs.configs
                prompt = speech_to_text(voice_url, configs, voice_settings)

            llm = get_llm(
                settings,
                agent_with_configs,
            )

            streaming_handler = AsyncCallbackHandler()

            llm.streaming = True
            # llm.callbacks = [
            #     run_logs_manager.get_agent_callback_handler(),
            #     streaming_handler,
            # ]

            # agent = initialize_agent(
            #     tools,
            #     llm,
            #     agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            #     verbose=True,
            #     memory=memory,
            #     handle_parsing_errors="Check your output and make sure it conforms!",
            #     agent_kwargs={
            #         "system_message": system_message,
            #         "output_parser": ConvoOutputParser(),
            #     },
            #     callbacks=[run_logs_manager.get_agent_callback_handler()],
            # )

            agentPrompt = hub.pull("hwchase17/react")

            agent = create_react_agent(llm, tools, prompt=agentPrompt)

            agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

            chunks = []
            final_answer_detected = False

            async for event in agent_executor.astream_events(
                {"input": prompt}, version="v1"
            ):
                kind = event["event"]

                if kind == "on_chat_model_stream":
                    content = event["data"]["chunk"].content
                    if content:
                        chunks.append(content)
                        # Check if the last three elements in chunks, when stripped, are "Final", "Answer", and ":"
                        if (
                            len(chunks) >= 3
                            and chunks[-3].strip() == "Final"
                            and chunks[-2].strip() == "Answer"
                            and chunks[-1].strip() == ":"
                        ):
                            final_answer_detected = True
                            continue

                        if final_answer_detected:
                            yield content

            full_response = "".join(chunks)
            final_answer_index = full_response.find("Final Answer:")
            if final_answer_index != -1:
                # Add the length of the phrase "Final Answer:" and any subsequent whitespace or characters you want to skip
                start_index = final_answer_index + len("Final Answer:")
                # Optionally strip leading whitespace
                res = full_response[start_index:].lstrip()
            else:
                res = "Final Answer not found in response."

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

            yield res

        try:
            configs = agent_with_configs.configs
            voice_url = None
            if "Voice" in configs.response_mode:
                voice_url = text_to_speech(res, configs, voice_settings)
                pass
        except Exception as err:
            res = f"{res}\n\n{handle_agent_error(err)}"

            yield res

        ai_message = history.create_ai_message(
            res,
            human_message_id,
            agent_with_configs.agent.id,
            voice_url,
        )

        chat_pubsub_service.send_chat_message(chat_message=ai_message)
