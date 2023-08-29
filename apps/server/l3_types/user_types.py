from pydantic import BaseModel, UUID4
from typing import List, Optional

class UserInput(BaseModel):
    name: Optional[str]
    email: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    deleted: Optional[bool]

class UserResponse(BaseModel):
    id: UUID4
    name: Optional[str]
    email: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]
    deleted: bool
