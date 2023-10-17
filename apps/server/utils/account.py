from models.account import AccountModel
from typing import List
from typings.account import AccountOutput
from utils.type import convert_value_to_type

default_configs = {
    "info": {
        "logo": '',
        "welcomeMessage": "Welcome to L3AGI"
    },
    "naming": {
        "home": 'Home',
        "agent": "Agent",
        "team": "Team",
        "datasource": "Data sources",
        "models": "Models",
        "discovery": "Discovery",
        "chat": "Multi-Agent",
        "toolkits": "Toolkits",
        "schedules": "Schedules"
    },
    "modules": {
        "home": {
            "welcome_message": "Build your ",
            "submodules": {
                "team": {
                    "operations": {
                        "create": True,
                        "list": True,
                        "edit": True,
                        "delete": True
                    }
                },
                "agent": True,
                "discovery": True,
            }
        },
        "chat" :{
            "active": True,
            "label": "Multi-Agent",
            "submodules": {
                "team": {
                    "operations": {
                        "create": True,
                        "list": True,
                        "edit": True
                    }
                },
                "agent": True,
                "session": True
            }
        },
        "model" : {
            "active" : True,
            "label": "Models",
            "submodules": {
                "models": {
                    "operations": {
                        "create": True,
                        "list": True,
                        "edit": True,
                    }
                },
                "fine-tuning": {
                    "operations": True
                }
            }
        },
        "toolkit": True, #True
        "datasource": True,
        "discovery": False,
        "Session": False,
        "schedule": False
    },
}



def convert_model_to_response(account_model: AccountModel) -> AccountOutput:
    account_data = {}
    # if not account_model.configs:
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
