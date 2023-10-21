import ast
import uuid
from typing import Union


def convert_value_to_type(value, target_type):
    # Convert the value to the specified type

    # Handle Optional type (Union with NoneType)
    if hasattr(target_type, "__origin__") and target_type.__origin__ == Union:
        # If the value is None, return it immediately
        if value is None:
            return None
        # Otherwise, get non-None types from the Union
        valid_types = [t for t in target_type.__args__ if t != type(None)]
        # If only one valid type, set the target_type to that type
        if len(valid_types) == 1:
            target_type = valid_types[0]
        else:
            # For this case, we'll just return the value as is, since we don't
            # know which type to convert it to among the Union types.
            return value

    if target_type == bool:
        if value == "True":
            return True
        elif value == "False":
            return False

        return value
    elif target_type == int:
        return int(value)
    elif target_type == float:
        return float(value)
    elif target_type == str:
        return str(value)
    elif target_type == uuid.UUID:
        if isinstance(value, uuid.UUID):
            return value
        return uuid.UUID(value)
    elif hasattr(target_type, "__origin__") and target_type.__origin__ == list:
        inner_type = target_type.__args__[0]
        if isinstance(value, str) and value.startswith("[") and value.endswith("]"):
            value = ast.literal_eval(value)
        converted_list = [convert_value_to_type(item, inner_type) for item in value]
        return converted_list
    else:
        return value
