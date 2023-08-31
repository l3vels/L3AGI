
from typing import List
from fastapi import APIRouter, HTTPException, Depends, Request, Query
from fastapi_sqlalchemy import db
from fastapi.responses import RedirectResponse
from fastapi_jwt_auth import AuthJWT
import requests
from models.user import UserModel
from models.account import AccountModel
from models.user_account import UserAccountModel
from typings.user import UserOutput, UserInput
from typings.user_account import UserAccountInput
from utils.auth import authenticate
from typings.user import UserInput
from typings.auth import LoginInput, RegisterInput, GoogleInput, GithubInput, AuthJWTSettings
from typings.account import AccountInput
from utils.user_utils import convert_users_to_user_list, convert_model_to_response
from utils.auth import authenticate, generate_token
from exceptions import UserNotFoundException
from config import Config

import services.auth as auth_service


router = APIRouter()


@router.post("/login", status_code=201)
def login(body: LoginInput):
    """
    Login
    """  
    return auth_service.login(body)
      
@router.post("/login-google", status_code=201)
def login_with_google(body: GoogleInput):
    """
    Login with Google
    """
    return auth_service.login_with_google(token=body.token)
    
    
@router.post("/login-github", status_code=201)
def login_with_google(body: GithubInput):
    """
    Login with Github
    """

    github_client_id = ""
    return RedirectResponse(f'https://github.com/login/oauth/authorize?scope=user:email&client_id={github_client_id}')

@router.get('/github')
def github_auth_handler(code: str = Query(...), Authorize: AuthJWT = Depends()):
    """GitHub login callback"""

    github_token_url = 'https://github.com/login/oauth/access_token'
    github_client_id = Config.GITHUB_CLIENT_ID
    github_client_secret = Config.GITHUB_CLIENT_SECRET

    frontend_url = Config.FRONTEND_URL
    params = {
        'client_id': github_client_id,
        'client_secret': github_client_secret,
        'code': code
    }
    headers = {
        'Accept': 'application/json'
    }
    response = requests.post(github_token_url, params=params, headers=headers)
    if response.ok:
        data = response.json()
        access_token = data.get('access_token')
        github_api_url = 'https://api.github.com/user'
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        response = requests.get(github_api_url, headers=headers)
        if response.ok:
            user_data = response.json()
            user_email = user_data["email"]
            if user_email is None:
                user_email = user_data["login"] + "@github.com"
                
            user = auth_service.login_with_github(email=user_email, name=user_data["name"], account=user_data["name"] )
            jwt_token = generate_token(user_email, Authorize)
            redirect_url_success = f"{frontend_url}?access_token={jwt_token}"
            return RedirectResponse(url=redirect_url_success)
        else:
            redirect_url_failure = frontend_url
            return RedirectResponse(url=redirect_url_failure)
    else:
        redirect_url_failure = frontend_url
        return RedirectResponse(url=redirect_url_failure)
  
    
@router.post("/register", status_code=201)
def register(body: RegisterInput):
    """
    Register
    """
    data = auth_service.register(input=body)
    
@router.post("/forgot-password", status_code=201)
def forgot_password(body: RegisterInput):
    """
    Forgot password
    """
    
@router.post("/reset-password", status_code=201)
def reset_password(body: RegisterInput):
    """
    Reset password
    """
    
@router.post("/resend-verify-email", status_code=201)
def resend_verify_email(body: RegisterInput):
    """
    Reset password
    """
    