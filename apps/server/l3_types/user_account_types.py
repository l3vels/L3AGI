from pydantic import BaseModel
from api.user import User
from api.account import Account

class UserAccount(BaseModel):
    user: User
    account: Account
