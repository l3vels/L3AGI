from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey


class InstagramToolkit(BaseToolkit, ABC):
    name: str = "Instagram Toolkit"
    description: str = "Explore, connect, and share moments that matter with friends and followers worldwide."
    slug: str = "instagram"
    toolkit_id = "5fc51d2a-8681-4674-9554-9a1004443dd3"

    is_active = False

    def get_tools(self) -> List[BaseTool]:
        return []

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
