import os
from typing import Dict, List, Optional
from uuid import UUID

from fastapi_sqlalchemy import db
from langchain.callbacks.base import BaseCallbackHandler
from langchain.chat_models import ChatOpenAI
from langchain.llms.huggingface_hub import HuggingFaceHub
from langchain.llms.replicate import Replicate

from exceptions import InvalidLLMApiKeyException
from models.fine_tuning import FineTuningModel
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from typings.model import ModelProviders

MODELS = [
    {
        "id": "8833a90e-86e4-4118-9e28-517de1a4def8",
        "provider": ModelProviders.OPEN_AI,
        "name": "GPT-3.5",
        "value": "gpt-3.5-turbo",
        "fine_tuning": False,
    },
    {
        "id": "607d5c17-45ee-4629-94b5-33e6c7fac47a",
        "provider": ModelProviders.OPEN_AI,
        "name": "GPT-3.5 613",
        "value": "gpt-3.5-turbo-613",
        "fine_tuning": True,
    },
    {
        "id": "f4fc991a-8ef8-4ae7-a395-a22057f33d4a",
        "provider": ModelProviders.OPEN_AI,
        "name": "GPT-3.5 16K",
        "value": "gpt-3.5-turbo-16k",
        "fine_tuning": False,
    },
    {
        "id": "3162d548-6c0e-4b77-8cb1-bd5478fa5270",
        "provider": ModelProviders.OPEN_AI,
        "name": "GPT-4",
        "value": "gpt-4",
        "fine_tuning": False,
    },
    {
        "id": "308346e9-80d1-44c9-b2e1-5c261a0c5931",
        "provider": ModelProviders.HUGGING_FACE,
        "name": "Llama 70B Chat",
        "value": "meta-llama/Llama-2-70b-chat-hf",
        "fine_tuning": False,
    },
    {
        "id": "9284605c-ef85-47bb-a4ee-1d6b966f4312",
        "provider": ModelProviders.HUGGING_FACE,
        "name": "Falcon 180B Chat",
        "value": "tiiuae/falcon-180B-chat",
        "fine_tuning": False,
    },
    {
        "id": "721f117a-b49b-45ac-afc7-08e7d455c2c5",
        "provider": ModelProviders.HUGGING_FACE,
        "name": "StarChat Beta",
        "value": "HuggingFaceH4/starchat-beta",
        "fine_tuning": False,
    },
    {
        "id": "5558240c-3705-4b9b-9517-0637d53b0c9e",
        "provider": ModelProviders.REPLICATE,
        "name": "Llama 70B Chat",
        "value": "meta/llama-2-70b-chat:latest",
        "fine_tuning": False,
    },
]


def get_model(models: List[Dict], model_id: str) -> Dict | None:
    for model in models:
        if model["id"] == model_id:
            return model


def get_models_with_fine_tunings(account_id: UUID):
    fine_tuning_models = FineTuningModel.get_fine_tunings(
        db.session,
        account_id,
    )

    result = MODELS.copy()

    for fine_tuning in fine_tuning_models:
        model = get_model(MODELS, str(fine_tuning.model_id))

        result.append(
            {
                "id": str(fine_tuning.id),
                "provider": model["provider"],
                "name": fine_tuning.name,
                "value": fine_tuning.model_identifier,
                "fine_tuning": False,
                "is_fine_tuned": True,
            }
        )

    return result


def get_llm(
    settings: AccountSettings,
    agent_with_configs: AgentWithConfigsOutput,
):
    models = get_models_with_fine_tunings(agent_with_configs.agent.account_id)
    model = get_model(models, agent_with_configs.configs.model)

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
