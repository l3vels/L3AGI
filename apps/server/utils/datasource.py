from models.datasource import DatasourceModel
from typing import List
from typings.datasource import DatasourceOutput
from utils.type import convert_value_to_type


def convert_model_to_response(datasource_model: DatasourceModel) -> DatasourceOutput:
    datasource_data = {}

    # Extract attributes from DatasourceModel using annotations of Datasource
    for key in DatasourceOutput.__annotations__.keys():
        if hasattr(datasource_model, key):
            target_type = DatasourceOutput.__annotations__.get(key)
            datasource_data[key] = convert_value_to_type(
                value=getattr(datasource_model, key), target_type=target_type
            )

    return DatasourceOutput(**datasource_data)


def convert_datasources_to_datasource_list(
    datasources: List[DatasourceModel],
) -> List[DatasourceOutput]:
    return [
        convert_model_to_response(datasource_model) for datasource_model in datasources
    ]
