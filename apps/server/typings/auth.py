from pydantic import BaseModel
from typing import Optional
from config import Config
from typings.user import UserOutput
from typings.account import AccountOutput


class LoginInput(BaseModel):
    email: str
    password: str


class RegisterInput(BaseModel):
    name: str
    email: str
    account_name: str
    password: Optional[str]
    avatar: Optional[str]


class UserAccount(BaseModel):
    user: UserOutput
    account: AccountOutput


class AuthJWTSettings(BaseModel):
    # jwt_secret = get_config("JWT_SECRET_KEY")
    authjwt_secret_key: str = Config.JWT_SECRET_KEY


class AuthHandlerInput(BaseModel):
    code: str
