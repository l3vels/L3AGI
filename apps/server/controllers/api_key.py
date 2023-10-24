from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db

from exceptions import ApiKeyNotFoundException
from models.api_key import ApiKeyModel
from typings.api_key import ApiKeyInput, ApiKeyOutput
from typings.auth import UserAccount
from utils.api_key import (convert_api_keys_to_api_key_list,
                           convert_model_to_response)
from utils.auth import authenticate

router = APIRouter()


@router.post("", status_code=201, response_model=ApiKeyOutput)
def create_api_key(
    api_key: ApiKeyInput, auth: UserAccount = Depends(authenticate)
) -> ApiKeyOutput:
    """
    Create a new api_key with configurations.

    Args:
        api_key (ApiKeyInput): Data for creating a new api_key with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        ApiKeyOutput: Created api_key object.
    """
    # Consider adding try-except for error handling during creation if needed
    # todo need generate token
    db_api_key = ApiKeyModel.create_api_key(
        db, api_key=api_key, user=auth.user, account=auth.account
    )
    return convert_model_to_response(
        ApiKeyModel.get_api_key_by_id(db, db_api_key.id, auth.account), False
    )


@router.put(
    "/{id}", status_code=200, response_model=ApiKeyOutput
)  # Changed status code to 200
def update_api_key(
    id: str, api_key: ApiKeyInput, auth: UserAccount = Depends(authenticate)
) -> ApiKeyOutput:
    """
    Update an existing api_key with configurations.

    Args:
        id (str): ID of the api_key to update.
        api_key (ApiKeyInput): Data for updating the api_key with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        ApiKeyOutput: Updated api_key object.
    """
    try:
        db_api_key = ApiKeyModel.update_api_key(
            db, id=id, api_key=api_key, user=auth.user, account=auth.account
        )
        return convert_model_to_response(
            ApiKeyModel.get_api_key_by_id(db, db_api_key.id, auth.account), True
        )

    except ApiKeyNotFoundException:
        raise HTTPException(status_code=404, detail="ApiKey not found")


@router.get("", response_model=List[ApiKeyOutput])
def get_api_keys(auth: UserAccount = Depends(authenticate)) -> List[ApiKeyOutput]:
    """
    Get all api_keys by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[ApiKeyOutput]: List of api_keys associated with the account.
    """
    db_api_keys = ApiKeyModel.get_api_keys(db=db, account=auth.account)
    return convert_api_keys_to_api_key_list(db_api_keys)


@router.get("/{id}", response_model=ApiKeyOutput)
def get_api_key_by_id(
    id: str, auth: UserAccount = Depends(authenticate)
) -> ApiKeyOutput:
    """
    Get a api_key by its ID.

    Args:
        id (str): ID of the api_key.
        auth (UserAccount): Authenticated user account.

    Returns:
        ApiKeyOutput: ApiKey associated with the given ID.
    """
    db_api_key = ApiKeyModel.get_api_key_by_id(db, api_key_id=id, account=auth.account)

    if not db_api_key or db_api_key.is_deleted:
        raise HTTPException(
            status_code=404, detail="ApiKey not found"
        )  # Ensure consistent case in error messages

    return convert_model_to_response(db_api_key, True)


@router.delete("/{api_key_id}", status_code=200)  # Changed status code to 204
def delete_api_key(api_key_id: str, auth: UserAccount = Depends(authenticate)):
    """
    Delete a api_key by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        api_key_id (str): ID of the api_key to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        ApiKeyModel.delete_by_id(db, api_key_id=api_key_id, account=auth.account)
        return {"message": "ApiKey deleted successfully"}

    except ApiKeyNotFoundException:
        raise HTTPException(status_code=404, detail="ApiKey not found")
