from models.tool import ToolModel
from typing import List, Optional
from typings.tool import ToolResponse, ToolInput
from utils.type import convert_value_to_type

def convert_model_to_response(tool_model: ToolModel) -> ToolResponse:
    tool_data = {}
    
    # Extract attributes from ToolModel using annotations of Tool
    for key in ToolResponse.__annotations__.keys():
        if hasattr(tool_model, key):
            target_type = ToolResponse.__annotations__.get(key)
            tool_data[key] = convert_value_to_type(value=getattr(tool_model, key), target_type=target_type)

    return ToolResponse(**tool_data)


def convert_tools_to_tool_list(tools: List[ToolModel]) -> List[ToolResponse]:
    return [convert_model_to_response(tool_model) for tool_model in tools]