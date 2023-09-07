from pydantic import BaseModel, UUID4
from typing import Optional

class TeamInput(BaseModel):
    name: str
    description: Optional[str]
    team_type: str
    workspace_id: Optional[UUID4]


class TeamOutput(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    team_type: str
    workspace_id: Optional[UUID4] 
    is_deleted: bool
    is_system: bool
    is_template: bool
    account_id: UUID4
    created_by: Optional[UUID4]
    modified_by: Optional[UUID4]


class QueryParams(BaseModel):
    id: Optional[str]
    workspace_id: Optional[UUID4]

