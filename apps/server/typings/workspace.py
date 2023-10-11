from pydantic import BaseModel, UUID4
from typing import Optional


class WorkspaceInput(BaseModel):
    name: str
    description: Optional[str]
    source_type: str  # later enum (web-scrapping, notion, db, and so on)
    account_id: UUID4
    is_public: Optional[bool]


class WorkspaceOutput(BaseModel):
    id: str
    name: str
    description: Optional[str]
    source_type: str  # later enum (web-scrapping, notion, db, and so on)
    account_id: UUID4
    is_deleted: bool
    is_public: bool
    created_by: Optional[UUID4]
    modified_by: Optional[UUID4]
