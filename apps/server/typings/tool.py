from typing import List, Optional

from pydantic import UUID4, BaseModel


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


class SingleToolOutput(BaseModel):
    tool_id: UUID4
    name: str
    description: str


class ToolOutput(BaseModel):
    toolkit_id: UUID4
    is_active: bool
    is_public: bool
    is_voice: bool
    name: str
    description: str
    slug: str
    fields: List[ToolFieldOutput]
    tools: List[SingleToolOutput]


class ToolRunInput(BaseModel):
    query: str
    toolkit_slug: str
    tool_slug: str
    # agent_id: str


class ToolRunOutput(BaseModel):
    response: str
    is_success: bool
