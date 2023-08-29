from pydantic import BaseModel, UUID4
from typing import Optional

class RoleInput(BaseModel):
    name: Optional[str]

class RoleResponse(BaseModel):
    id: UUID4
    name: Optional[str]
