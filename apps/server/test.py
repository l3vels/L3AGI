from langchain.smith import RunEvalConfig, run_on_dataset
from langchain_community.chat_models import ChatOpenAI
from langsmith import Client

# TODO: refactor test to use new auth

# res = requests.post(
#     f"{Config.L3_AUTH_API_URL}/auth/login",
#     json={"email": Config.TEST_USER_EMAIL, "password": Config.TEST_USER_PASSWORD},
#     timeout=30,
# )

# auth_data = res.json()

# headers = {
#     "authorization": auth_data["access_token"],
#     "x-refresh-token": auth_data["refresh_token"],
# }


def agent_factory():
    # llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
    # tools = get_tools(["SerpGoogleSearch"])

    # return initialize_agent(
    #     tools,
    #     llm,
    #     agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
    #     verbose=True,
    #     handle_parsing_errors="Check your output and make sure it conforms!",
    #     agent_kwargs={
    #         # "prefix": system_message,
    #         "system_message": system_message,
    #         # "format_instructions": FORMAT_INSTRUCTIONS,
    #         "output_parser": ConvoOutputParser(),
    #     },
    #     max_iterations=5,
    # )
    pass


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
