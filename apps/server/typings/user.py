from pydantic import BaseModel, UUID4
from typing import List, Optional
import strawberry
class UserInput(BaseModel):
    name: Optional[str]
    email: Optional[str]
    password: Optional[str]
    avatar: Optional[str]

class UserOutput(BaseModel):
    id: UUID4
    name: str
    email: str
    avatar: Optional[str]
    
@strawberry.type
class User:
    id: strawberry.ID
    name: str
    email: str
    avatar: Optional[str]