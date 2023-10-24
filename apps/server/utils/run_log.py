from typing import List

from models.run_log import RunLogModel
from typings.run import RunLogOutput
from utils.type import convert_value_to_type


def convert_model_to_response(run_log_model: RunLogModel) -> RunLogOutput:
    datasource_data = {}

    # Extract attributes from DatasourceModel using annotations of Datasource
    for key in RunLogOutput.__annotations__.keys():
        if hasattr(run_log_model, key):
            target_type = RunLogOutput.__annotations__.get(key)
            datasource_data[key] = convert_value_to_type(
                value=getattr(run_log_model, key), target_type=target_type
            )

    return RunLogOutput(**datasource_data)


def convert_run_logs_to_run_logs_list(
    run_logs: List[RunLogModel],
) -> List[RunLogOutput]:
    return [convert_model_to_response(run_log_model) for run_log_model in run_logs]
