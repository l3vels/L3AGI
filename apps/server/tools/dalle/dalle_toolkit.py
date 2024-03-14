from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey
from tools.dalle.dalle import DalleTool


class DalleToolkit(BaseToolkit, ABC):
    name: str = "DALL-E Toolkit"
    description: str = "Unlock boundless creativity with AI-generated images that bring your imagination to life."
    slug: str = "dalle"
    toolkit_id = "74e51975-2b6d-4cd4-a105-be40fee2fec1"

    def get_tools(self) -> List[BaseTool]:
        return [DalleTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
