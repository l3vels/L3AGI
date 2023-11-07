from typing import List, Optional
from uuid import UUID

from pydantic import UUID4, BaseModel


class VoiceInput(BaseModel):
    audio_data: str
    local_chat_message_ref_id: Optional[str] = None
    agent_id: Optional[UUID] = None
    team_id: Optional[UUID] = None
    parent_id: Optional[UUID] = None


class VoiceTextInput(BaseModel):
    prompt: str
    local_chat_message_ref_id: Optional[str] = None
    agent_id: Optional[UUID] = None
    team_id: Optional[UUID] = None
    parent_id: Optional[UUID] = None


class ToolInput(BaseModel):
    name: str
    description: Optional[str]
    group_name: Optional[str]
    class_name: Optional[str]


class ToolFieldOutput(BaseModel):
    label: str
    key: str
    type: str
    is_required: bool
    is_secret: bool
    default_value: Optional[str] = None


# class SingleToolOutput(BaseModel):
#     tool_id: UUID4
#     name: str
#     description: str


class VoiceOutput(BaseModel):
    id: Optional[UUID4]
    is_active: bool
    is_public: bool
    name: str
    description: Optional[str]
    slug: Optional[str]
    fields: Optional[List[ToolFieldOutput]]
    is_synthesizer: Optional[bool]
    is_transcriber: Optional[bool]
    # tools: Optional[List[SingleToolOutput]]
