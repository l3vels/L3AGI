from pydantic import BaseModel, UUID4
from typing import Optional


class ApiKeyInput(BaseModel):
    name: str
    description: Optional[str]
    workspace_id: Optional[UUID4]


class ApiKeyOutput(BaseModel):
    id: str
    name: str
    token: str
    description: Optional[str]
    is_deleted: bool
    account_id: UUID4
    created_by: Optional[UUID4]
    modified_by: Optional[UUID4]
