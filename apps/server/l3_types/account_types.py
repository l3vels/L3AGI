from pydantic import BaseModel, UUID4
from typing import List, Optional

class AccountInput(BaseModel):
    user_id: UUID4
    name: Optional[str]
    location: Optional[str]
    deleted: Optional[bool]

class AccountResponse(BaseModel):
    id: UUID4
    user_id: UUID4
    name: Optional[str]
    location: Optional[str]
    deleted: Optional[bool]
