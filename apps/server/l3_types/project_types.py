from pydantic import BaseModel, UUID4
from typing import List, Optional

class ProjectInput(BaseModel):
    name: str
    description: Optional[str]
    source_type: str #later enum (web-scrapping, notion, db, and so on)
    account_id: UUID4
    is_system: Optional[bool]


class ProjectResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    source_type: str #later enum (web-scrapping, notion, db, and so on)
    account_id: UUID4
    is_deleted: bool
    is_system: bool
    created_by: UUID4
    modified_by: Optional[UUID4]
