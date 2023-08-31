
from typing import List
from fastapi import APIRouter, Depends
from utils.auth import authenticate
from typings.auth import UserAccount

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
    return [{
        "isActive": True,
        "provider": "OpenAI",
        "models": [
            "gpt-3.5-turbo",
            "gpt-4",
            "gpt-3.5-turbo-16k"            
        ]
            
    },
    {
        "isActive": False,
        "provider": "Huggingface",
        "models": [
            "GPT4ALL",
            "gpt4all-j",
            "GPT4All-J v1.1-breezy",
            "GPT4All Falcon",
            "Llama-2-7b"            
        ]
            
    },
    {
        "isActive": False,
        "provider": "Google Palm",
        "models": [
            "google-palm-bison-001",
            "models/chat-bison-001"    
        ]            
    },
    ]