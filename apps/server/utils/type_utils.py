from typing import List, Optional
import ast
import uuid

def convert_value_to_type(value, target_type):
    # Convert the value to the specified type
    if target_type == bool:
        return bool(value)
    elif target_type == int:
        return int(value)
    elif target_type == float:
        return float(value)
    elif target_type == str:
        return str(value)
    elif target_type == uuid.UUID:
        # If the target type is UUID, check if the value is already a UUID or convert it
        if isinstance(value, uuid.UUID):
            return value
        return uuid.UUID(value)  # Convert the string to a UUID object
    elif hasattr(target_type, "__origin__") and target_type.__origin__ == list:
        # Handle List type - introspect to get the inner type
        inner_type = target_type.__args__[0]
        
        # If value is a string representation of a list, parse it
        if isinstance(value, str) and value.startswith('[') and value.endswith(']'):
            value = ast.literal_eval(value)
        
        converted_list = [convert_value_to_type(item, inner_type) for item in value]
        
        # Debugging information:
        # print(f"Converted {value} to {converted_list} for target type {target_type}")
        
        return converted_list
    else:
        # Default: Return the value as-is
        return value


