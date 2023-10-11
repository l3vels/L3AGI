from typings.account import Account
from strawberry.types import Info
import strawberry


@strawberry.type
class AccountQuery:
    @strawberry.field
    def account(self, info: Info) -> Account:
        user_account = info.context.user_account
        return user_account.account


@strawberry.type
class AccountMutation:
    @strawberry.mutation
    def update_account(self, info: Info) -> Account:
        # todo need get account
        # info.context["background_tasks"].add_task(notify_new_flavour, name)
        print(info)
        return Account(id="wwww", name="Example")
