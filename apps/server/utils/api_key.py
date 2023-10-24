from typing import List

from models.api_key import ApiKeyModel
from typings.api_key import ApiKeyOutput
from utils.type import convert_value_to_type


def convert_model_to_response(
    api_key_model: ApiKeyModel, is_hide_token: bool
) -> ApiKeyOutput:
    api_key_data = {}

    # Extract attributes from ApiKeyModel using annotations of ApiKey
    for key in ApiKeyOutput.__annotations__.keys():
        if hasattr(api_key_model, key):
            target_type = ApiKeyOutput.__annotations__.get(key)
            value = getattr(api_key_model, key)
            if is_hide_token and key == "token":
                # Hide the last 4 characters of the token
                value = (
                    value[:-28] + "************************"
                    if value is not None
                    else None
                )
            api_key_data[key] = convert_value_to_type(
                value=value, target_type=target_type
            )

    return ApiKeyOutput(**api_key_data)


def convert_api_keys_to_api_key_list(api_keys: List[ApiKeyModel]) -> List[ApiKeyOutput]:
    return [
        convert_model_to_response(api_key_model, True) for api_key_model in api_keys
    ]
