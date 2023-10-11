from typing import List

from fastapi import APIRouter, Depends

from typings.auth import UserAccount
from typings.llm import LLMProviders
from utils.auth import authenticate

router = APIRouter()


@router.get("/providers", response_model=List[object])
def get_llm_providers(auth: UserAccount = Depends(authenticate)) -> List[object]:
    """
    Get all tools by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[Object]: List of tools associated with the account.
    """
    # Update comment
    return [
        {
            "isActive": True,
            "provider": LLMProviders.OPEN_AI,
            "models": ["gpt-3.5-turbo", "gpt-4", "gpt-3.5-turbo-16k"],
        },
        {
            "isActive": True,
            "provider": LLMProviders.HUGGING_FACE,
            "models": [
                "meta-llama/Llama-2-70b-chat-hf",
                "meta-llama/Llama-2-13b-chat-hf",
                "meta-llama/Llama-2-7b-chat-hf",
                "tiiuae/falcon-180b",
                "nomic-ai/gpt4all-13b-snoozy",
                "mrm8488/t5-base-finetuned-wikiSQL",
                "GPT4ALL",
                "gpt4all-j",
                "GPT4All-J v1.1-breezy",
                "GPT4All Falcon",
                "Llama-2-7b",
            ],
        },
        {
            "isActive": True,
            "provider": LLMProviders.REPLICATE,
            "models": [],
        },
        {
            "isActive": False,
            "provider": "Google Palm",
            "models": ["google-palm-bison-001", "models/chat-bison-001"],
        },
    ]
