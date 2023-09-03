import main
import requests
from langsmith import Client
from langchain.chat_models import ChatOpenAI
from langchain.smith import RunEvalConfig, run_on_dataset
from langchain.agents import initialize_agent, AgentType

from config import Config
from system_message import SYSTEM_MESSAGE, format_system_message
from agents.conversational.output_parser import ConvoOutputParser
from api.client import L3Api
from tools.get_tools import get_tools

res = requests.post(
    f"{Config.L3_AUTH_API_URL}/auth/login",
    json={"email": Config.TEST_USER_EMAIL, "password": Config.TEST_USER_PASSWORD},
    timeout=30,
)

auth_data = res.json()

headers = {
    "authorization": auth_data["access_token"],
    "x-refresh-token": auth_data["refresh_token"],
}


def agent_factory():
    llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")

    api = L3Api(headers, {})

    # fetch user and account

    system_message = format_system_message(SYSTEM_MESSAGE, user, account, None, None)

    tools = get_tools(['SerpGoogleSearch'])

    return initialize_agent(
        tools,
        llm,
        agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
        verbose=True,
        handle_parsing_errors="Check your output and make sure it conforms!",
        agent_kwargs={
            # "prefix": system_message,
            "system_message": system_message,
            # "format_instructions": FORMAT_INSTRUCTIONS,
            "output_parser": ConvoOutputParser(),
        },
        max_iterations=5,
    )


agent = agent_factory()

client = Client()


eval_config = RunEvalConfig(
    evaluators=[
        "qa",
        RunEvalConfig.Criteria("helpfulness"),
        RunEvalConfig.Criteria("conciseness"),
    ],
    input_key="input",
    eval_llm=ChatOpenAI(temperature=0.5, model_name="gpt-3.5-turbo"),
)

chain_results = run_on_dataset(
    client,
    dataset_name="test-dataset",
    llm_or_chain_factory=agent_factory,
    evaluation=eval_config,
    concurrency_level=1,
    verbose=True,
)
