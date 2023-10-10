from typing import Tuple
import gql.transport.exceptions
from fastapi import HTTPException, Request, Response
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi import APIRouter, HTTPException, Depends
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import AuthJWTException
from typings.auth import UserAccount
from datetime import timedelta, datetime
from config import Config
from fastapi_sqlalchemy import db
from models.user import UserModel
from models.account import AccountModel
from typings.user import UserOutput
from typings.account import AccountOutput
import requests
from utils.account import convert_model_to_response as convert_model_to_response_account
from utils.user import convert_model_to_response as convert_model_to_response_user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def authenticate(request: Request, response: Response) -> Tuple[UserOutput, AccountOutput]:
    try:
        authorize = AuthJWT(request, response)
        authorize.jwt_required()
        email = authorize.get_jwt_subject()
        db_user = UserModel.get_user_by_email(db, email)
        account_id = request.headers.get('account_id', None)
        if account_id == 'undefined' or  not account_id:
            db_account = AccountModel.get_account_created_by(db, db_user.id)            
        else:
            db_account = AccountModel.get_account_by_access(db, user_id=db_user.id, account_id=account_id)

        return UserAccount(user=convert_model_to_response_user(db_user), 
                           account=convert_model_to_response_account(db_account))
    except gql.transport.exceptions.TransportQueryError:
        raise HTTPException(status_code=401, detail="Unauthorized")
    
def try_auth_user(request: Request, response: Response) -> Tuple[UserOutput, AccountOutput]:
    try:
        authorize = AuthJWT(request, response)
        authorize.jwt_required()
        email = authorize.get_jwt_subject()
        db_user = UserModel.get_user_by_email(db, email)
        account_id = request.headers.get('account_id', None)
        if account_id == 'undefined' or  not account_id:
            db_account = AccountModel.get_account_created_by(db, db_user.id)            
        else:
            db_account = AccountModel.get_account_by_access(db, user_id=db_user.id, account_id=account_id)

        return UserAccount(user=convert_model_to_response_user(db_user), 
                           account=convert_model_to_response_account(db_account))
    except Exception:
        return None
    

def generate_token(subject, jwt_authorizer: AuthJWT = Depends()):
    token_config = Config.JWT_EXPIRY
    if type(token_config) == str:
        token_config = int(token_config)
    if token_config is None:
        token_config = 300
    token_expiry_time = timedelta(hours=token_config)
    token = jwt_authorizer.create_access_token(subject=subject, expires_time=token_expiry_time)
    return token

def redirect_to_frontend(frontend_url):
    """Redirect to frontend URL"""
    return RedirectResponse(url=frontend_url)

def get_user_data_from_github(access_token):
    """Get user data from GitHub API"""
    github_api_url = 'https://api.github.com/user'
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(github_api_url, headers=headers)

    if response.ok:
        return response.json()
    return None