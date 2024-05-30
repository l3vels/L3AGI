from datetime import timedelta
from typing import Tuple

import gql.transport.exceptions
import requests
from fastapi import Depends, HTTPException, Request, Response
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi_jwt_auth import AuthJWT
from fastapi_sqlalchemy import db

from config import Config
from models.account import AccountModel
from models.api_key import ApiKeyModel
from models.user import UserModel
from typings.account import AccountOutput
from typings.auth import UserAccount
from typings.user import UserOutput
from utils.account import \
    convert_model_to_response as convert_model_to_response_account
from utils.user import \
    convert_model_to_response as convert_model_to_response_user
from models.user_account_access import UserAccountAccessModel

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def authenticate(
    request: Request, response: Response
) -> Tuple[UserOutput, AccountOutput]:
    try:
        authorize = AuthJWT(request, response)
        authorize.jwt_required()
        email = authorize.get_jwt_subject()
        db_user = UserModel.get_user_by_email(db, email)
        account_id = request.headers.get("account_id", None)
        
        if account_id != "undefined" and account_id and UserAccountAccessModel.check_exist_user_account_access_by_account_id(db, account_id, db_user.id):
            db_account = AccountModel.get_account_by_access(
                db, user_id=db_user.id, account_id=account_id
            )
        else:
            db_account = AccountModel.get_account_created_by(db, db_user.id)
            
        # if account_id == "undefined" or not account_id:
        #     db_account = AccountModel.get_account_created_by(db, db_user.id)
        # else:
        #     db_account = AccountModel.get_account_by_access(
        #         db, user_id=db_user.id, account_id=account_id
        #     )

        return UserAccount(
            user=convert_model_to_response_user(db_user),
            account=convert_model_to_response_account(db_account),
        )
    except gql.transport.exceptions.TransportQueryError:
        raise HTTPException(status_code=401, detail="Unauthorized")


def authenticate_by_token_or_api_key(
    request: Request, response: Response
) -> Tuple[UserOutput, AccountOutput]:
    authorization = request.headers.get("Authorization", "")

    if "l3_" in authorization:
        return authenticate_by_api_key(request, response)
    else:
        return authenticate(request, response)


def authenticate_by_api_key(
    request: Request, response: Response
) -> Tuple[UserOutput, AccountOutput]:
    authorization = request.headers.get("Authorization", None)

    api_key_model = ApiKeyModel.get_api_key_by_token(db.session, authorization)

    if not api_key_model:
        raise HTTPException(status_code=401, detail="Invalid API key")

    return UserAccount(
        user=convert_model_to_response_user(api_key_model.creator),
        account=convert_model_to_response_account(api_key_model.account),
    )


def authenticate_by_auth_token(
    request: Request, response: Response
) -> Tuple[UserOutput, AccountOutput]:
    authorization = request.headers.get("Authorization", None)

    if authorization != Config.AUTH_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid auth token")

    account_id = request.headers.get("Account-ID", None)

    if account_id:
        db_account = AccountModel.get_account_by_access(
            db=db, user_id=None, account_id=account_id
        )

        if not db_account:
            raise HTTPException(status_code=401, detail="Invalid auth token")

        db_user = UserModel.get_user_by_id(db, db_account.created_by)

        return UserAccount(
            user=convert_model_to_response_user(db_user),
            account=convert_model_to_response_account(db_account),
        )


def authenticate_by_any(
    request: Request, response: Response
) -> Tuple[UserOutput, AccountOutput]:
    authorization = request.headers.get("Authorization", "")

    if "l3_" in authorization:
        return authenticate_by_api_key(request, response)
    elif "Bearer" in authorization:
        return authenticate(request, response)
    else:
        return authenticate_by_auth_token(request, response)


def try_auth_user_with_any(
    request: Request, response: Response
) -> Tuple[UserOutput, AccountOutput]:
    try:
        return authenticate_by_any(request, response)
    except Exception:
        return None


# TODO: reuse from authenticate_by_token_or_api_key and then remove try_auth_user_with_token_or_api_key
def try_auth_user(
    request: Request, response: Response
) -> Tuple[UserOutput, AccountOutput]:
    try:
        authorize = AuthJWT(request, response)
        authorize.jwt_required()
        email = authorize.get_jwt_subject()
        db_user = UserModel.get_user_by_email(db, email)
        account_id = request.headers.get("account_id", None)
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
        return None


def generate_token(subject, jwt_authorizer: AuthJWT = Depends()):
    token_config = Config.JWT_EXPIRY
    if isinstance(token_config, str) and token_config != "":
        token_config = int(token_config)
    if token_config is None:
        token_config = 300
    token_expiry_time = timedelta(hours=token_config)
    token = jwt_authorizer.create_access_token(
        subject=subject, expires_time=token_expiry_time
    )
    return token


def redirect_to_frontend(frontend_url):
    """Redirect to frontend URL"""
    return RedirectResponse(url=frontend_url)


def get_user_data_from_github(access_token):
    """Get user data from GitHub API"""
    github_api_url = "https://api.github.com/user"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(github_api_url, headers=headers)

    if response.ok:
        return response.json()
    return None
