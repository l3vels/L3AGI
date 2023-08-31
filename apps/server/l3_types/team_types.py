from pydantic import BaseModel, UUID4
from typing import List, Optional

class TeamInput(BaseModel):
    name: str
    description: Optional[str]
    project_id: Optional[UUID4]
    type: str


class TeamResponse(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    project_id: Optional[UUID4] 
    type: str
    is_deleted: bool
    is_system: bool
    is_template: bool
    account_id: UUID4
    created_by: Optional[UUID4]
    modified_by: Optional[UUID4]

