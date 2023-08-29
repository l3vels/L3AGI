from typing import Optional
from pydantic import BaseModel
from enums import ChatMessageVersion

class ChatMessageInput(BaseModel):
    prompt: str
    version: ChatMessageVersion
    is_private_chat: bool
    game_id: Optional[str] = None
    collection_id: Optional[str] = None
    local_chat_message_ref_id: Optional[str] = None
    parent_id: Optional[str] = None


class NegotiateResponse(BaseModel):
    url: str
