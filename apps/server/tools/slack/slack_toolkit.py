from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey


class SlackToolkit(BaseToolkit, ABC):
    name: str = "Slack Toolkit"
    description: str = "Toolkit containing tools for Slack"
    slug: str = "slack"
    toolkit_id = "10ce6a71-207b-4636-8eaf-39b27e17a211"

    is_active = False

    def get_tools(self) -> List[BaseTool]:
        return []

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
