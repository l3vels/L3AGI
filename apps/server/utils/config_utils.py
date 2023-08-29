from models.config import ConfigModel
from typing import List, Optional
from l3_types.config_types import ConfigResponse, ConfigInput
from utils.type_utils import convert_value_to_type

def convert_model_to_response(config_model: ConfigModel) -> ConfigResponse:
    config_data = {}
    
    # Extract attributes from ConfigModel using annotations of Config
    for key in ConfigResponse.__annotations__.keys():
        if hasattr(config_model, key):
            target_type = ConfigResponse.__annotations__.get(key)
            config_data[key] = convert_value_to_type(value=getattr(config_model, key), target_type=target_type)

    return ConfigResponse(**config_data)


def convert_configs_to_config_list(configs: List[ConfigModel]) -> List[ConfigResponse]:
    return [convert_model_to_response(config_model) for config_model in configs]