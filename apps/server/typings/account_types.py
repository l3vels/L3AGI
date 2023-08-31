from pydantic import BaseModel, UUID4
from typing import List, Optional

class AccountInput(BaseModel):
    user_id: UUID4
    name: Optional[str]
    deleted: Optional[bool]

class AccountOutput(BaseModel):
    id: UUID4
    user_id: UUID4
    name: Optional[str]
    deleted: Optional[bool]
