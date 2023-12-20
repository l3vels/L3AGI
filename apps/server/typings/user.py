from typing import Optional

import strawberry
from pydantic import UUID4, BaseModel, Field


class UserInput(BaseModel):
    name: Optional[str]
    email: Optional[str]
    password: Optional[str]
    avatar: Optional[str]


class UserOutput(BaseModel):
    id: UUID4 = Field(..., example="550e8400-e29b-41d4-a716-446655440000")
    name: str = Field(..., example="User name")
    email: str = Field(..., example="test@gmail.com")
    avatar: Optional[str]


@strawberry.type
class User:
    id: strawberry.ID
    name: str
    email: str
    avatar: Optional[str]
