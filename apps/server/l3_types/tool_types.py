from pydantic import BaseModel, UUID4
from typing import List, Optional

class ToolInput(BaseModel):
    name: str
    description: Optional[str]
    group_name: Optional[str]
    class_name: Optional[str]

class ToolFieldResponse(BaseModel):
    label: str
    key: str
    type: str
    is_required: bool
    is_secret: bool

class SingleToolResponse(BaseModel):
    tool_id: UUID4
    name: str
    description: str

class ToolResponse(BaseModel):
    toolkit_id: UUID4
    is_active: bool
    is_system: bool
    name: str
    description: str
    fields: List[ToolFieldResponse]
    tools: List[SingleToolResponse]

