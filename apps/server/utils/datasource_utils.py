from models.datasource import DatasourceModel
from typing import List, Optional
from l3_types.datasource_types import DatasourceResponse, DatasourceInput
from utils.type_utils import convert_value_to_type

def convert_model_to_response(datasource_model: DatasourceModel) -> DatasourceResponse:
    datasource_data = {}
    
    # Extract attributes from DatasourceModel using annotations of Datasource
    for key in DatasourceResponse.__annotations__.keys():
        if hasattr(datasource_model, key):
            target_type = DatasourceResponse.__annotations__.get(key)
            datasource_data[key] = convert_value_to_type(value=getattr(datasource_model, key), target_type=target_type)

    return DatasourceResponse(**datasource_data)


def convert_datasources_to_datasource_list(datasources: List[DatasourceModel]) -> List[DatasourceResponse]:
    return [convert_model_to_response(datasource_model) for datasource_model in datasources]