from pydantic import BaseModel
from api.user import User
from api.account import Account
from pydantic import BaseModel, UUID4
from typing import List, Optional

class UserAccount(BaseModel):
    user: User
    account: Account
    
