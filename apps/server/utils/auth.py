from typing import Tuple
import gql.transport.exceptions
from fastapi import HTTPException, Request
from api.client import L3Api
from fastapi.security import OAuth2PasswordBearer
from api.user import User
from api.account import Account

from typings.auth_types import UserAccount

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def authenticate(request: Request) -> Tuple[User, Account]:
    try:
        api = L3Api(request.headers, request.cookies)
        user = api.user.fetch_user()
        account = api.account.fetch_account()
        # return user, account
        return UserAccount(user=user, account=account)
    except gql.transport.exceptions.TransportQueryError:
        raise HTTPException(status_code=401, detail="Unauthorized")
