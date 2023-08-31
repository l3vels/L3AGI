from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey
from tools.duck_duck_go.duck_duck_go import DuckDuckGoSearchTool

class DuckDuckGoSearchToolkit(BaseToolkit, ABC):
    name: str = "DuckDuckGo Search Toolkit"
    description: str = "Toolkit containing tools for performing DuckDuckGo search"
    toolkit_id = "96e0157e-2769-40b6-829c-7ed7fb8a32da"

    def get_tools(self) -> List[BaseTool]:
        return [DuckDuckGoSearchTool()]
    
    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
