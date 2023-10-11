from models.config import ConfigModel
from typing import List
from typings.config import ConfigOutput
from utils.type import convert_value_to_type


def convert_model_to_response(config_model: ConfigModel) -> ConfigOutput:
    config_data = {}

    # Extract attributes from ConfigModel using annotations of Config
    for key in ConfigOutput.__annotations__.keys():
        if hasattr(config_model, key):
            target_type = ConfigOutput.__annotations__.get(key)
            config_data[key] = convert_value_to_type(
                value=getattr(config_model, key), target_type=target_type
            )

    return ConfigOutput(**config_data)


def convert_configs_to_config_list(configs: List[ConfigModel]) -> List[ConfigOutput]:
    return [convert_model_to_response(config_model) for config_model in configs]
