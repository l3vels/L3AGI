
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from models.user import UserModel
from models.account import AccountModel
from models.user_account import UserAccountModel
from typings.user import UserOutput, UserInput
from typings.user_account import UserAccountInput
from utils.auth import authenticate, generate_token
from typings.user import UserInput
from typings.auth import LoginInput, RegisterInput
from typings.account import AccountInput
from utils.user import convert_users_to_user_list, convert_model_to_response
from exceptions import UserNotFoundException
import requests
from exceptions import AuthenticationException, UserException

router = APIRouter()


def register(input: RegisterInput):
    """
    Register
    """
    if UserModel.get_user_by_email(input.email):
         raise UserException("User already exists!")
     
    # Create a new user
    user_input = UserInput(name=input.name, email=input.email)
    user = UserModel.create_user(db=db, user=user_input)
    
    # Create a new account
    account_input = AccountInput(name=input.name)
    account = AccountModel.create_account(db=db, account=account_input, user=user)


    # Create a new user-account
    user_account_input = UserAccountInput(user_id=user.id, account_id=account.id)
    user_account = UserAccountModel.create_user_account(db=db, user_account=user_account_input, user=body.user_id)

    return {"account": account, "user": user, "user_account": user_account}

def login(input:LoginInput):
    """
    Login
    """
    user = UserModel.get_user_by_email(input.email)
    if not user:
        raise UserNotFoundException("Incorrect username or password")
    return user

    

def login_with_google(token: str):
    """
    Authenticate with Google
    """
    try:
        # Verify the token with Google's API
        response = requests.get(f'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}')

        if response.status_code == 200:
            # If the token is valid, Google's API will return the user's information
            user_info = response.json()

            # You can then use this information to create or update a user in your database
            # For example, you might have a function like this:
            # user = create_or_update_user(user_info)

            return user

        else:
            # If the token is not valid, Google's API will return an error
            raise AuthenticationException('Invalid token')

    except requests.exceptions.RequestException as e:
        raise AuthenticationException('Could not authenticate with Google')
    
def login_with_github(name:str, email: str, account_name:str):
    """
    Authenticate with Google
    """
    user = UserModel.get_user_by_email(email)
    if not user:
        register_input = RegisterInput(name=name, email=email, account_name=account_name)
        registered = register(register_input)
        return registered['user']        
   
    return user
    