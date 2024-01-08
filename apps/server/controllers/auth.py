import requests
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi_jwt_auth import AuthJWT

import services.auth as auth_service
from config import Config
from exceptions import UserException
from typings.auth import (AuthHandlerInput, LoginInput, RegisterInput,
                          UserAccount)
from utils.auth import (authenticate_by_any, generate_token,
                        get_user_data_from_github)

router = APIRouter()


@router.post("/login", status_code=200)
def login(body: LoginInput, req: Request, res: Response):
    """
    Login
    """
    try:
        user = auth_service.login(body)
        Authorize = AuthJWT()
        token = generate_token(user.email, Authorize)

        return {
            "success": True,
            "message": "Login successful",
            "access_token": token,
            "verified": user.is_active,
        }
    except UserException as e:
        raise HTTPException(status_code=400, detail=str(e))


# @router.post("/login-google", status_code=201)
# def login_with_google(body: GoogleInput):
#     """
#     Login with Google
#     """
#     return auth_service.login_with_google(token=body.token)


@router.post("/github-login", status_code=200)
def login_with_github():
    """
    Login with Github
    """

    client_id = Config.GITHUB_CLIENT_ID
    return {
        "auth_url": (
            f"https://github.com/login/oauth/authorize?scope=user:email&client_id={client_id}"
        )
    }


@router.post("/github-login-complete", status_code=200)
def auth_handler(body: AuthHandlerInput):
    """GitHub login callback"""

    token_url = "https://github.com/login/oauth/access_token"
    client_id = Config.GITHUB_CLIENT_ID
    client_secret = Config.GITHUB_CLIENT_SECRET
    Authorize = AuthJWT()
    params = {"client_id": client_id, "client_secret": client_secret, "code": body.code}

    headers = {"Accept": "application/json"}
    response = requests.post(token_url, params=params, headers=headers)

    if not response.ok:
        raise HTTPException(status_code=400, detail="Something is wrong!")

    data = response.json()
    access_token = data.get("access_token")
    user_data = get_user_data_from_github(access_token)

    if user_data is None:
        raise HTTPException(status_code=400, detail="Github user data does not exist!")

    user_email = user_data.get("email") or f'{user_data["login"]}@github.com'
    account_name = user_data["company"] if user_data["company"] else user_data["name"]
    avatar = user_data["avatar_url"]
    user = auth_service.login_with_github(
        name=user_data["name"],
        email=user_email,
        account_name=account_name,
        avatar=avatar,
    )

    token = generate_token(user.email, Authorize)
    return {"success": True, "access_token": token, "verified": user.is_active}


@router.post("/register", status_code=201)
def register(body: RegisterInput):
    """
    Register
    """
    try:
        auth_service.register(input=body)
        return {"success": True, "message": "User registration successful"}
    except UserException as e:
        raise HTTPException(status_code=400, detail=str(e))


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


@router.get("/account", response_model=UserAccount)
def get_agents(
    auth: UserAccount = Depends(authenticate_by_any),
) -> UserAccount:
    """
    Get User and account.
    """
    return auth
