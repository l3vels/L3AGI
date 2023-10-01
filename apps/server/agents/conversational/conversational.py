from langchain.agents import initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI
from postgres import PostgresChatMessageHistory
from memory.zep.zep_memory import ZepMemory
from services.pubsub import ChatPubSubService
from agents.base_agent import BaseAgent
from config import Config
from agents.conversational.output_parser import ConvoOutputParser
from utils.system_message import SystemMessageBuilder
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from agents.handle_agent_errors import handle_agent_error

class ConversationalAgent(BaseAgent):
    def run(
        self,
        settings: AccountSettings,
        chat_pubsub_service: ChatPubSubService,
        agent_with_configs: AgentWithConfigsOutput,
        tools,
        prompt: str,
        history: PostgresChatMessageHistory,
        human_message_id: str,
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

        system_message = SystemMessageBuilder(agent_with_configs).build()

        model_name = agent_with_configs.configs.model_version or "gpt-3.5-turbo"
        temperature = agent_with_configs.configs.temperature

        llm = ChatOpenAI(openai_api_key=settings.openai_api_key,temperature=temperature, model_name=model_name)

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
        )


        res: str

        try:
            res = agent.run(prompt)
        except Exception as err:
            res = handle_agent_error(err)
            
            memory.save_context({
                'input': prompt,
                'chat_history': memory.load_memory_variables({})['chat_history'],
            }, {
                'output': res,
            })
        
        ai_message = history.create_ai_message(res, human_message_id, agent_with_configs.agent.id)
        chat_pubsub_service.send_chat_message(chat_message=ai_message)

        return res
