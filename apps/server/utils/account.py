from models.account import AccountModel
from typing import List
from typings.account import AccountOutput
from utils.type import convert_value_to_type

default_configs = {
    "info": {
        "logo": '',
        "welcomeMessage": "Welcome to L3AGI"
    },
    "modules" : {
        "home": {
            "active" : True,
            "showAgents": False,
            "showTeams": False                    
        },
        "agent": {
            "active" : True,
            "name": "Team",
            "actions" : {
                "addAgent": True,
                "addTeam": True,
                "createTeamChannel": True,
                "createAgentChannel": True,
            },
            "display" : {
                "teams": True,
                "agents": True,
                "channels": True                
            }           
        },
        "datasource": {
            "active" : True,
            "name": "Data sources"
        },
        "toolkit": {
            "active" : True,
            "name": "Toolkits"
        },
        "model" : {
            "active" : True,
            "name": "Models",
            "display": {
                "models": True,
                "fine-tuning": True
            }            
        },
        "contact": {
            "active" : False,
            "name": "Contact"
        },
        "group": {
            "active" : False,
            "name": "Group"
        },
        "schedule": {
            "active" : False,
            "name": "Campaign"
        },
        "discovery": {
            "active" : False,
            "name": "Discovery",
            "display" : {
                "team": True,
                "agents": True,             
            }        
            
        }
    }
}
    
def convert_model_to_response(account_model: AccountModel) -> AccountOutput:
    account_data = {}
    if not account_model.configs:
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
