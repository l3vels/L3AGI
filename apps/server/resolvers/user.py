
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from models.user_account import UserAccountModel
from models.account import AccountModel
from typings.account import AccountOutput, AccountInput
from utils.auth import authenticate
from typings.user import User
from utils.account import convert_accounts_to_account_list, convert_model_to_response
from exceptions import AccountNotFoundException
from fastapi import FastAPI, BackgroundTasks
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
