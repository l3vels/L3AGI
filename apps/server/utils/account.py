from models.account import AccountModel
from typing import List
from typings.account import AccountOutput
from utils.type import convert_value_to_type
from utils.configs.default import default_configs
from utils.configs.scrapper import scrapper_configs
from utils.configs.heyyou import heyyou_configs
from utils.configs.heyyou import levanion_configs


def convert_model_to_response(account_model: AccountModel) -> AccountOutput:
    account_data = {}
    # if not account_model.configs:
    if account_model.name == 'scrapper':
        account_model.configs = scrapper_configs
    elif account_model.name == 'heyyou':
        account_model.configs = heyyou_configs
    elif account_model.name == 'levan':
        account_model.configs = levanion_configs
    else:
        account_model.configs = default_configs
        
    # Extract attributes from AccountModel using annotations of Account
    for key in AccountOutput.__annotations__.keys():
        if hasattr(account_model, key):
            target_type = AccountOutput.__annotations__.get(key)
            account_data[key] = convert_value_to_type(
                value=getattr(account_model, key), target_type=target_type
            )
            
    return AccountOutput(**account_data)


def convert_accounts_to_account_list(
    accounts: List[AccountModel],
) -> List[AccountOutput]:
    return [convert_model_to_response(account_model) for account_model in accounts]
