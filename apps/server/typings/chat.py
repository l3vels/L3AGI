from typing import Optional, List, Dict
from uuid import UUID
from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class ChatStatus(Enum):
    IDLE = 'Idle'
    RUNNING = 'Running'
    STOPPED = 'Stopped'

class ChatMessageInput(BaseModel):
    prompt: str
    is_private_chat: bool
    local_chat_message_ref_id: Optional[str] = None
    agent_id: Optional[UUID] = None
    team_id: Optional[UUID] = None
    parent_id: Optional[UUID] = None


class ChatMessageOutput(BaseModel):
    id: UUID
    parent_id: Optional[UUID] = None
    parent: Optional[Dict] = None
    session_id: str
    agent_id: Optional[UUID] = None
    agent: Optional[Dict] = None
    team_id: Optional[UUID] = None
    team: Optional[Dict] = None
    user_id: UUID
    creator: Optional[Dict] = None
    account_id: UUID
    message: Dict
    thoughts: Optional[List[Dict]] = None
    created_on: datetime


class NegotiateOutput(BaseModel):
    url: str

class ChatStopInput(BaseModel):
    is_private_chat: bool
    agent_id: Optional[UUID] = None
    team_id: Optional[UUID] = None