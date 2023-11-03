from enum import Enum
from typing import Optional

from pydantic import UUID4, BaseModel


class DatasourceStatus(Enum):
    INDEXING = "Indexing"
    READY = "Ready"
    FAILED = "Failed"


class DatasourceInput(BaseModel):
    name: str
    description: Optional[str]
    source_type: str  # later enum (web-scrapping, notion, db, and so on)
    workspace_id: Optional[UUID4]


class DatasourceOutput(BaseModel):
    id: str
    name: str
    description: Optional[str]
    source_type: str  # later enum (web-scrapping, notion, db, and so on)
    status: str
    workspace_id: Optional[UUID4]
    is_deleted: bool
    is_public: bool
    account_id: UUID4
    created_by: Optional[UUID4]
    modified_by: Optional[UUID4]
    error: Optional[str]


class DatasourceSQLTableOutput(BaseModel):
    id: str
    name: str
    count: int
