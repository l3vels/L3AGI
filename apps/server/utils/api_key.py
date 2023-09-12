from models.api_key import ApiKeyModel
from typing import List, Optional
from typings.api_key import ApiKeyOutput, ApiKeyInput
from utils.type import convert_value_to_type

def convert_model_to_response(api_key_model: ApiKeyModel) -> ApiKeyOutput:
    api_key_data = {}
    
    # Extract attributes from ApiKeyModel using annotations of ApiKey
    for key in ApiKeyOutput.__annotations__.keys():
        if hasattr(api_key_model, key):
            target_type = ApiKeyOutput.__annotations__.get(key)
            api_key_data[key] = convert_value_to_type(value=getattr(api_key_model, key), target_type=target_type)

    return ApiKeyOutput(**api_key_data)


def convert_api_keys_to_api_key_list(api_keys: List[ApiKeyModel]) -> List[ApiKeyOutput]:
    return [convert_model_to_response(api_key_model) for api_key_model in api_keys]