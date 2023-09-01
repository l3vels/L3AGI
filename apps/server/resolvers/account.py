
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from fastapi_jwt_auth import AuthJWT
from pydantic import BaseModel

from models.user_account import UserAccountModel
from models.account import AccountModel
from typings.account import AccountOutput, AccountInput
from utils.auth import authenticate
from typings.account import Account
from utils.account import convert_accounts_to_account_list, convert_model_to_response
from exceptions import AccountNotFoundException
from fastapi import FastAPI, BackgroundTasks
from strawberry.types import Info
from strawberry.fastapi import GraphQLRouter
import strawberry

@strawberry.type
class AccountQuery:
    @strawberry.field
    def account(self, info: Info) -> Account:
        account = info.context.account
        return account


@strawberry.type
class AccountMutation:
    @strawberry.mutation
    def update_account(self, info: Info) -> Account:
        # info.context["background_tasks"].add_task(notify_new_flavour, name)
        print(info)
        return Account(id="wwww", name="Example")
