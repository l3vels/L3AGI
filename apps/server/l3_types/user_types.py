from pydantic import BaseModel, UUID4
from typing import List, Optional

class UserInput(BaseModel):
    name: Optional[str]
    email: Optional[str]

class UserResponse(BaseModel):
    id: UUID4
    name: str
    email: str
