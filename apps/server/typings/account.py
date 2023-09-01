from pydantic import BaseModel, UUID4
from typing import List, Optional
import strawberry

class AccountInput(BaseModel):
    name: Optional[str]
    deleted: Optional[bool]

class AccountOutput(BaseModel):
    id: UUID4
    name: Optional[str]
    deleted: Optional[bool]
    created_by: Optional[UUID4]
    modified_by: Optional[UUID4]


@strawberry.type
class Account:
    id: strawberry.ID
    name: Optional[str]
    deleted: Optional[bool]
    created_by: Optional[strawberry.ID]
    modified_by: Optional[strawberry.ID]