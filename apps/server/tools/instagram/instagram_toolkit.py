from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey


class InstagramToolkit(BaseToolkit, ABC):
    name: str = "Instagram Toolkit"
    description: str = "Toolkit containing tools for Instagram"
    slug: str = "instagram"
    toolkit_id = "5fc51d2a-8681-4674-9554-9a1004443dd3"

    is_active = False

    def get_tools(self) -> List[BaseTool]:
        return []

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
