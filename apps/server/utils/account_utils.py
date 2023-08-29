from models.account import AccountModel
from typing import List, Optional
from l3_types.account_types import AccountResponse, AccountInput
from utils.type_utils import convert_value_to_type

def convert_model_to_response(account_model: AccountModel) -> AccountResponse:
    account_data = {}
    
    # Extract attributes from AccountModel using annotations of Account
    for key in AccountResponse.__annotations__.keys():
        if hasattr(account_model, key):
            target_type = AccountResponse.__annotations__.get(key)
            account_data[key] = convert_value_to_type(value=getattr(account_model, key), target_type=target_type)

    return AccountResponse(**account_data)


def convert_accounts_to_account_list(accounts: List[AccountModel]) -> List[AccountResponse]:
    return [convert_model_to_response(account_model) for account_model in accounts]