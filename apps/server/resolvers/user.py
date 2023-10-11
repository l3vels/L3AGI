from typings.user import User
from strawberry.types import Info
import strawberry


@strawberry.type
class UserQuery:
    @strawberry.field
    def user(self, info: Info) -> User:
        user = info.context.user_account.user
        return user


@strawberry.type
class UserMutation:
    @strawberry.mutation
    def update_user(self, name: str, info: Info) -> bool:
        # info.context["background_tasks"].add_task(notify_new_flavour, name)
        return True
