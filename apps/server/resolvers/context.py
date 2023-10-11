from strawberry.fastapi import BaseContext
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType
from functools import cached_property
from typings.user import User
from typings.auth import UserAccount
from services.auth import authorize
from fastapi_jwt_auth import AuthJWT


class Context(BaseContext):
    @cached_property
    def user(self) -> User | None:
        if not self.request:
            return None

        auth = AuthJWT(self.request, self.response)
        user_account = authorize(auth)
        return user_account.user

    @cached_property
    def user_account(self) -> UserAccount | None:
        if not self.request:
            return None
        account_id = self.request.headers.get("account_id", None)
        auth = AuthJWT(self.request, self.response)
        user_account = authorize(account_id, auth)
        return user_account


Info = _Info[Context, RootValueType]


async def get_context() -> Context:
    return Context()
