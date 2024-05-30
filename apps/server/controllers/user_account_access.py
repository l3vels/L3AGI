from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
import services.auth as auth_service
from typings.user import UserInput
from models.user import UserModel
from models.user_account_access import UserAccountAccessModel
from models.user_account import UserAccountModel
from utils.auth import authenticate
from typings.auth import UserAccount
from typings.user_account_access import (
    GetUserAccountAccessOutput,
    UserAccountAccessInput,
    UserAccountAccessDbInput,
    UserAccountAccessOutput,
    SharedUserAccountAccessOutput
)
from exceptions import UserAccessNotFoundException
from utils.user_account_access import (
    generate_random_string,
    convert_user_access_to_list,
    shared_user_access_to_list
)

router = APIRouter()


@router.post("", response_model=UserAccountAccessOutput, status_code=201)
def create_user_account_access(
    input: UserAccountAccessInput,
    auth: UserAccount = Depends(authenticate)
):
    """
    Create a new user_account_access with configurations.

    Args:
        user_account_access (UserAccountAccessInput): Data for creating a new user_account_access with configurations.

    Returns:
        Message: A message indicating that the user_account_access was successfully created.
    """
    try:
        body = input.dict()

        current_user_account = UserAccountModel.get_user_account_by_user_id(
                    db=db,
                    user_id=auth.user.id
                )

        existing_user = UserModel.get_user_by_email(db=db, email=body['email'])

        if not existing_user:
            random_pass = generate_random_string(8)
            print('random_pass', random_pass)
            user_input = UserInput(**{
                'name': body['email'],
                'email': body['email'],
                'account_name': 'Account Name',
                'password': random_pass,
                'avatar': ""
            })

            response = auth_service.register(input=user_input)
            create_user_account_access_input = UserAccountAccessDbInput(
                assigned_user_id=response['user'].id,
                assigned_account_id=response['account'].id
            )

            response = UserAccountAccessModel.create_user_account_access(
                db=db,
                user_account_access=create_user_account_access_input,
                user=auth.user,
                account_id=current_user_account.account_id
            )
            if not response:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="User access not successfully added"
                )

            return {
                    "success": True,
                    "message": "User access successfully added"
                }
        else:
            user_account = UserAccountModel.get_user_account_by_user_id(
                    db=db,
                    user_id=existing_user.id
                )

            if UserAccountAccessModel.get_user_account_access_assigned(
                db=db,
                assigner_user_id=user_account.user_id,
                assigned_account_id=user_account.account_id,
                account_id=current_user_account.account_id
            ):
                return {
                        'success': False,
                        'message': 'User access already exists'
                    }

            create_user_account_access_input = UserAccountAccessDbInput(
                assigned_user_id=user_account.user_id,
                assigned_account_id=user_account.account_id
            )

            response = UserAccountAccessModel.create_user_account_access(
                db=db,
                user_account_access=create_user_account_access_input,
                user=auth.user,
                account_id=current_user_account.account_id
            )

            if response is None:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="User access not successfully added"
                )

            return {"success": True, "message": "User access successfully added"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get(
    "",
    response_model=list[GetUserAccountAccessOutput],
    status_code=200
)
def get_user_account_access(auth: UserAccount = Depends(authenticate)):
    """
    Get user account access data.

    Args:
        auth (UserAccount): User account object obtained from authentication.

    Returns:
        UserAccountAccess: User account access data.
    """
    try:
        data = UserAccountAccessModel.get_user_account_access(
            db=db,
            account=auth.account,
            user=auth.user
        )

        result = convert_user_access_to_list(data)

        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.delete(
    "/{user_account_access_id}",
    response_model=UserAccountAccessOutput,
    status_code=201
)
def delete_user_account_access(
    user_account_access_id: str,
    auth: UserAccount = Depends(authenticate)
):
    """
    Delete user account access data.

    Args:
        auth (UserAccount): User account object obtained from authentication.

    Returns:
        UserAccountAccess: User account access data.
    """
    try:
        current_user_account = UserAccountModel.get_user_account_by_user_id(
            db=db,
            user_id=auth.user.id
        )

        UserAccountAccessModel.delete_user_account_access_by_id(
            db=db,
            user_account_access_id=user_account_access_id,
            account_id=current_user_account.account_id
        )

        return {"success": True, "message": "User access successfully deleted"}
    except UserAccessNotFoundException:
        raise HTTPException(status_code=404, detail="User access not found")

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get(
    "/access",
    response_model=list[SharedUserAccountAccessOutput],
    status_code=200
)
def get_shared_user_account_access(auth: UserAccount = Depends(authenticate)):
    """_summary_

    Args:
        auth (UserAccount, optional): _description_. Defaults to Depends(authenticate).

    Raises:
        HTTPException: _description_

    Returns:
        _type_: _description_
    """
    try:
        user_access = UserAccountAccessModel.get_shared_user_account_access(
            db=db,
            account=auth.account,
            user=auth.user
        )

        result = shared_user_access_to_list(user_access)

        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
