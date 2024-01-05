from typing import Optional

from fastapi import Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
from fastapi_sqlalchemy import db

from exceptions import UserException
from models.account import AccountModel
from models.user import UserModel
from models.user_account import UserAccountModel
from typings.account import AccountInput
from typings.auth import LoginInput, RegisterInput, UserAccount
from typings.user import UserInput
from typings.user_account import UserAccountInput
from utils.account import \
    convert_model_to_response as convert_model_to_response_account
from utils.user import \
    convert_model_to_response as convert_model_to_response_user


def register(input: RegisterInput):
    """
    Register
    """

    if UserModel.get_user_by_email(db=db, email=input.email):
        raise UserException("User already exists!")

    # Create a new user
    user_input = UserInput(
        name=input.name, email=input.email, password=input.password, avatar=input.avatar
    )
    user = UserModel.create_user(db=db, user=user_input)

    # Create a new account
    account_input = AccountInput(name=input.name)
    account = AccountModel.create_account(db=db, account=account_input, user=user)

    # Create a new user-account
    user_account_input = UserAccountInput(user_id=user.id, account_id=account.id)
    user_account = UserAccountModel.create_user_account(
        db=db, user_account=user_account_input
    )

    return {"account": account, "user": user, "user_account": user_account}


def login(input: LoginInput):
    """
    Login
    """
    db_user = UserModel.get_user_by_email(db=db, email=input.email)
    if not db_user or not UserModel.verify_password(db_user.password, input.password):
        raise UserException("User email or password is incorrect")

    return db_user


# def login_with_google(token: str):
#     """
#     Authenticate with Google
#     """
#     try:
#         # Verify the token with Google's API
#         response = requests.get(f'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}')

#         if response.status_code == 200:
#             # If the token is valid, Google's API will return the user's information
#             user_info = response.json()

#             # You can then use this information to create or update a user in your database
#             # For example, you might have a function like this:
#             # user = create_or_update_user(user_info)

#             return user

#         else:
#             # If the token is not valid, Google's API will return an error
#             raise AuthenticationException('Invalid token')

#     except requests.exceptions.RequestException as e:
#         raise AuthenticationException('Could not authenticate with Google')


def login_with_github(name: str, email: str, account_name: str, avatar: Optional[str]):
    """
    Authenticate with Google
    """
    user = UserModel.get_user_by_email(db, email)
    if not user:
        register_input = RegisterInput(
            name=name, email=email, account_name=account_name, avatar=avatar
        )
        registered = register(register_input)
        return registered["user"]

    return user


def authorize(account_id: str, Authorize: AuthJWT = Depends()) -> UserAccount:
    try:
        email = Authorize.get_jwt_subject()
        db_user = UserModel.get_user_by_email(db, email)
        if account_id == "undefined" or not account_id:
            db_account = AccountModel.get_account_created_by(db, db_user.id)
        else:
            db_account = AccountModel.get_account_by_access(
                db, user_id=db_user.id, account_id=account_id
            )
        return UserAccount(
            user=convert_model_to_response_user(db_user),
            account=convert_model_to_response_account(db_account),
        )
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid auth token")
