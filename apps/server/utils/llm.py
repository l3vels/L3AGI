from langchain.chat_models import ChatOpenAI
from langchain.llms.huggingface_hub import HuggingFaceHub
from langchain.llms.replicate import Replicate

from typings.config import AccountSettings
from typings.llm import LLMProviders


def get_llm(
    settings: AccountSettings, provider: str, model_name: str, temperature: float
):
    if provider == LLMProviders.OPEN_AI.value:
        return ChatOpenAI(
            openai_api_key=settings.openai_api_key,
            temperature=temperature,
            model_name=model_name or "gpt-4",
        )
    elif provider == LLMProviders.HUGGING_FACE.value:
        return HuggingFaceHub(
            huggingfacehub_api_token=settings.hugging_face_access_token,
            repo_id=model_name,
            model_kwargs={
                "temperature": temperature,
            },
        )
    elif provider == LLMProviders.REPLICATE.value:
        return Replicate(
            replicate_api_token=settings.replicate_api_token,
            model=model_name,
            model_kwargs={
                "temperature": temperature,
            },
        )
