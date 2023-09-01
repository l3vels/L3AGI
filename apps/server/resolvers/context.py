from strawberry.fastapi import BaseContext, GraphQLRouter
from strawberry.types import Info as _Info
from strawberry.types.info import RootValueType
from strawberry.fastapi import GraphQLRouter
from functools import cached_property
from typings.user import User
from services.auth import authorize

class Context(BaseContext):
    @cached_property
    def user(self) -> User | None:
        if not self.request:
            return None

        authorization = self.request.headers.get("Authorization", None)
        return authorize(authorization)


Info = _Info[Context, RootValueType]

async def get_context() -> Context:
    return Context()