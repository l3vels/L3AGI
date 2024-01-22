from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class VoiceInput(BaseModel):
    audio_data: str
    local_chat_message_ref_id: Optional[str] = None
    agent_id: Optional[UUID] = None
    team_id: Optional[UUID] = None
    parent_id: Optional[UUID] = None
