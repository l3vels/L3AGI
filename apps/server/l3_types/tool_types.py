from pydantic import BaseModel, UUID4
from typing import List, Optional

class ToolInput(BaseModel):
    name: str
    description: Optional[str]
    group_name: Optional[str]
    class_name: Optional[str]


class ToolResponse(ToolInput):
    id: str
    name: str
    description: Optional[str]
    group_name: Optional[str]
    class_name: Optional[str]
    is_deleted: bool
    is_system: bool
    account_id: UUID4


