from pydantic import BaseModel
from uuid import UUID
from typing import List
from datetime import datetime


class UserAccountAccessInput(BaseModel):
    email: str


class UserAccountAccessDbInput(BaseModel):
    assigned_user_id: UUID
    assigned_account_id: UUID


class GetUserAccountAccessOutput(BaseModel):
    id: UUID
    assigned_user_id: UUID
    assigned_account_id: UUID
    account_id: UUID
    created_by: UUID
    created_on: datetime
    assigned_user_email: str
    assigned_user_name: str
    created_by_email: str
    created_by_name: str


class UserAccountAccessOutput(BaseModel):
    success: bool
    message: str


class SharedUserAccountAccessOutput(BaseModel):
    id: UUID
    account_id: UUID
    created_by: UUID
    created_on: datetime
    assigned_account_name: str
    created_by_email: str
    created_by_name: str
