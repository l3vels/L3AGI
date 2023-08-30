from pydantic import BaseModel, UUID4
from typing import List, Optional

class TeamInput(BaseModel):
    name: str
    description: Optional[str]
    project_id: Optional[UUID4] #store based on project or some grouping data


class TeamResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    project_id: Optional[UUID4] #store based on project or some grouping data
    is_deleted: bool
    is_system: bool
    account_id: UUID4
    created_by: UUID4
    modified_by: Optional[UUID4]
