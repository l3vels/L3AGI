
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from models.account import AccountModel
from l3_types.account_types import AccountResponse, AccountInput
from utils.auth import authenticate
from l3_types.user_account_types import UserAccount
from utils.account_utils import convert_accounts_to_account_list, convert_model_to_response
from exceptions import AccountNotFoundException

router = APIRouter()

