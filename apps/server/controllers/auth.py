
from typing import List
from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi_sqlalchemy import db


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
from exceptions import UserNotFoundException
import services.auth_service as auth_service


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
    try:
        user = auth_service.login_with_google(token=body.token)
        return {"user": user}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    
@router.post("/login-google", status_code=201)
def login_with_google(body: GithubInput):
    """
    Login with Google
    """
    try:
        user = auth_service.login_with_google(token=body.token)
        return {"user": user}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    

    
@router.post("/register", status_code=201)
def register(body: RegisterInput):
    """
    Register
    """
    auth_service.register(input=body)

    return {"account": account, "user": user, "user_account": user_account}
    
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
    