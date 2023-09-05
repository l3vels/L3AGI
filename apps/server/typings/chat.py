from typing import Optional, Dict
from uuid import UUID
from pydantic import BaseModel
from datetime import datetime

class ChatMessageInput(BaseModel):
    prompt: str
    is_private_chat: bool
    local_chat_message_ref_id: Optional[str] = None
    agent_id: Optional[UUID] = None
    parent_id: Optional[str] = None


class NegotiateOutput(BaseModel):
    url: str

class ChatMessageOutput(BaseModel):
    id: UUID
    session_id: str
    user_id: UUID
    account_id: UUID
    parent: Optional[Dict] = None
    parent_id: Optional[str] = None
    agent_id: Optional[UUID] = None
    message: Dict
    thoughts: Dict
    created_on: datetime
