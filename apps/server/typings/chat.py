from datetime import datetime
from enum import Enum
from typing import Dict, List, Optional
from uuid import UUID

from pydantic import BaseModel


class ChatStatus(Enum):
    IDLE = "Idle"
    RUNNING = "Running"
    STOPPED = "Stopped"


class ChatUserMessageInput(BaseModel):
    prompt: str
    voice_url: Optional[str]
    audio_data: Optional[str]
    local_chat_message_ref_id: Optional[str] = None
    agent_id: Optional[UUID] = None
    team_id: Optional[UUID] = None
    parent_id: Optional[UUID] = None


class ChatMessageInput(BaseModel):
    prompt: str
    voice_url: Optional[str]
    audio_data: Optional[str]
    chat_id: Optional[UUID] = None
    # todo what it is?
    local_chat_message_ref_id: Optional[str] = None
    parent_id: Optional[UUID] = None


class InsertChatMessageInput(BaseModel):
    timestamp: int
    type: str
    content: str


class InsertChatMessagesInput(BaseModel):
    chat_id: UUID
    contact_name: str
    messages: List[InsertChatMessageInput]


class ChatInput(BaseModel):
    name: str
    is_public: Optional[bool]
    agent_id: Optional[UUID] = None
    team_id: Optional[UUID] = None
    parent_id: Optional[UUID] = None


class UpdateChatInput(BaseModel):
    # name: Optional[str]
    voice_url: Optional[str]


class ChatOutput(BaseModel):
    id: str
    name: Optional[str]
    is_public: Optional[bool]
    agent_id: Optional[UUID] = None
    team_id: Optional[UUID] = None
    team: Optional[Dict] = None
    agent: Optional[Dict] = None
    creator_user: Optional[Dict] = None
    creator_account: Optional[Dict] = None
    voice_url: Optional[str] = None
    created_on: datetime
    # provider_user: Optional[Dict] = None
    # provider_account: Optional[Dict] = None
    # creator_user_id: Optional[UUID]
    # provider_user_id: Optional[UUID]
    # account_id: Optional[UUID]


class ChatMessageOutput(BaseModel):
    id: UUID
    parent_id: Optional[UUID] = None
    parent: Optional[Dict] = None
    session_id: str
    agent_id: Optional[UUID] = None
    agent: Optional[Dict] = None
    team_id: Optional[UUID] = None
    team: Optional[Dict] = None
    sender_user_id: UUID
    sender_user: Optional[Dict] = None
    sender_account_id: UUID
    message: Dict
    thoughts: Optional[List[Dict]] = None
    created_on: datetime
    sender_name: Optional[str]
    chat_id: Optional[UUID]
    run_id: Optional[UUID] = None
    voice_url: Optional[str]


class NegotiateOutput(BaseModel):
    url: str


class ChatStopInput(BaseModel):
    agent_id: Optional[UUID] = None
    team_id: Optional[UUID] = None


class ChatListOutput(BaseModel):
    chats: List[ChatOutput]
    count: int
