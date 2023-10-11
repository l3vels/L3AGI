from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey


class GoogleCalendarToolkit(BaseToolkit, ABC):
    name: str = "Google Calendar Toolkit"
    description: str = "Toolkit containing tools for searching Google Calendar"
    slug: str = "google-calendar"
    toolkit_id = "ac34d174-6ca4-49cf-aef2-6e2cdf2e0028"

    is_active = False

    def get_tools(self) -> List[BaseTool]:
        return []

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
