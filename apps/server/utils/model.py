import os

from langchain.chat_models import ChatOpenAI
from langchain.llms.huggingface_hub import HuggingFaceHub
from langchain.llms.replicate import Replicate

from exceptions import InvalidLLMApiKeyException
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from typings.model import ModelProviders

MODELS = [
    {
        "id": "8833a90e-86e4-4118-9e28-517de1a4def8",
        "provider": ModelProviders.OPEN_AI,
        "name": "GPT-3.5",
        "value": "gpt-3.5-turbo",
    },
    {
        "id": "f4fc991a-8ef8-4ae7-a395-a22057f33d4a",
        "provider": ModelProviders.OPEN_AI,
        "name": "GPT-3.5 16K",
        "value": "gpt-3.5-turbo-16k",
    },
    {
        "id": "3162d548-6c0e-4b77-8cb1-bd5478fa5270",
        "provider": ModelProviders.OPEN_AI,
        "name": "GPT-4",
        "value": "gpt-4",
    },
    {
        "id": "308346e9-80d1-44c9-b2e1-5c261a0c5931",
        "provider": ModelProviders.HUGGING_FACE,
        "name": "Llama 70B Chat",
        "value": "meta-llama/Llama-2-70b-chat-hf",
    },
    {
        "id": "9284605c-ef85-47bb-a4ee-1d6b966f4312",
        "provider": ModelProviders.HUGGING_FACE,
        "name": "Falcon 180B Chat",
        "value": "tiiuae/falcon-180B-chat",
    },
    {
        "id": "721f117a-b49b-45ac-afc7-08e7d455c2c5",
        "provider": ModelProviders.HUGGING_FACE,
        "name": "StarChat Beta",
        "value": "HuggingFaceH4/starchat-beta",
    },
    {
        "id": "5558240c-3705-4b9b-9517-0637d53b0c9e",
        "provider": ModelProviders.REPLICATE,
        "name": "Llama 70B Chat",
        "value": "meta/llama-2-70b-chat:latest",
    },
    {
        "id": "b0d125ab-5833-4bcd-8ac6-c39780ff990c",
        "provider": ModelProviders.REPLICATE,
        "name": "Vicuna 13B",
        "value": "replicate/vicuna-13b:latest",
    },
]


def get_model(model_id: str):
    for model in MODELS:
        if model["id"] == model_id:
            return model

    return MODELS[0]  # Default


def get_llm(
    settings: AccountSettings,
    agent_with_configs: AgentWithConfigsOutput,
):
    model = get_model(agent_with_configs.configs.model)
    model_name = model["value"]
    provider = model["provider"]

    temperature = agent_with_configs.configs.temperature

    if provider == ModelProviders.OPEN_AI:
        if not settings.openai_api_key:
            raise InvalidLLMApiKeyException(
                "Please set OpenAI API Key in [Settings](/settings)"
            )

        return ChatOpenAI(
            openai_api_key=settings.openai_api_key,
            temperature=temperature,
            model_name=model_name,
        )
    elif provider == ModelProviders.HUGGING_FACE:
        if not settings.hugging_face_access_token:
            raise InvalidLLMApiKeyException(
                "Please set Hugging Face Access Token in [Settings](/settings)"
            )

        return HuggingFaceHub(
            huggingfacehub_api_token=settings.hugging_face_access_token,
            repo_id=model_name,
            model_kwargs={
                "temperature": temperature,
            },
        )
    elif provider == ModelProviders.REPLICATE:
        if not settings.replicate_api_token:
            raise InvalidLLMApiKeyException(
                "Please set Replicate API Token in [Settings](/settings)"
            )

        os.environ["REPLICATE_API_TOKEN"] = settings.replicate_api_token

        return Replicate(
            replicate_api_token=settings.replicate_api_token,
            model=model_name,
            model_kwargs={
                "temperature": temperature,
            },
        )
