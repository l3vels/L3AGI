from pydantic import BaseModel
from api.user import User
from api.account import Account
from pydantic import BaseModel, UUID4
from typing import List, Optional

class UserAccountInput(BaseModel):
    user_id: Optional[UUID4]
    account_id: UUID4
    
class UserAccountOutput(BaseModel):
    id: UUID4
    user_id: Optional[UUID4]
    account_id: UUID4

class QueryParams(BaseModel):
    id: Optional[str]
    user_id: Optional[UUID4]
    account_id: Optional[UUID4]
