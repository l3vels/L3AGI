from typing import List

from models.fine_tuning import FineTuningModel
from typings.fine_tuning import FineTuningOutput
from utils.type import convert_value_to_type


def convert_model_to_response(model: FineTuningModel) -> FineTuningOutput:
    data = {}

    for key in FineTuningOutput.__annotations__.keys():
        if hasattr(model, key):
            target_type = FineTuningOutput.__annotations__.get(key)
            data[key] = convert_value_to_type(
                value=getattr(model, key), target_type=target_type
            )

    return FineTuningOutput(**data)


def convert_fine_tunings_to_fine_tuning_list(
    fine_tunings: List[FineTuningModel],
) -> List[FineTuningOutput]:
    return [
        convert_model_to_response(fine_tuning_model)
        for fine_tuning_model in fine_tunings
    ]
