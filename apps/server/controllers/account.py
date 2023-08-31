
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from models.user_account import UserAccountModel
from models.account import AccountModel
from typings.account import AccountOutput, AccountInput
from utils.auth import authenticate
from typings.auth import UserAccount
from utils.account import convert_accounts_to_account_list, convert_model_to_response
from exceptions import AccountNotFoundException

router = APIRouter()

@router.put("/{id}", status_code=200, response_model=AccountOutput)  # Changed status code to 200
def update_account(id: str, input: AccountInput, auth: UserAccount = Depends(authenticate)) -> AccountOutput:
    """
    Update an existing account with configurations.

    Args:
        id (str): ID of the account to update.
        account (AccountInput): Data for updating the account with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        AccountOutput: Updated account object.
    """
    try:
        db_account = AccountModel.update_account(db, 
                                           id=auth.account.id, 
                                           account=input, 
                                           user=auth.user)
        return convert_model_to_response(AccountModel.get_account_by_id(db, db_account.id, auth.account))
    
    except AccountNotFoundException:
        raise HTTPException(status_code=404, detail="Account not found")

@router.get("/", response_model=List[AccountOutput])
def get_user_accounts(auth: UserAccount = Depends(authenticate)) -> List[AccountOutput]:
    """
    Get all accounts by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[AccountOutput]: List of accounts associated with the account.
    """
    db_accounts = AccountModel.get_accounts(db=db, account=auth.account)
    return convert_accounts_to_account_list(db_accounts)

@router.get("/{id}", response_model=AccountOutput)
def get_account_by_id(id: str, auth: UserAccount = Depends(authenticate)) -> AccountOutput:
    """
    Get a account by its ID.

    Args:
        id (str): ID of the account.
        auth (UserAccount): Authenticated user account.

    Returns:
        AccountOutput: Account associated with the given ID.
    """
    db_account = AccountModel.get_account_by_id(db, account_id=id, account=auth.account)
    
    if not db_account or db_account.is_deleted:
        raise HTTPException(status_code=404, detail="Account not found")  # Ensure consistent case in error messages

    return convert_model_to_response(db_account)

@router.delete("/{account_id}", status_code=200)  # Changed status code to 204
def delete_account(account_id: str, auth: UserAccount = Depends(authenticate)):
    """
    Delete a account by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        account_id (str): ID of the account to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        AccountModel.delete_by_id(db, account_id=account_id, account=auth.account)
        return { "message": "Account deleted successfully" }

    except AccountNotFoundException:
        raise HTTPException(status_code=404, detail="Account not found")


