from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey


class GmailToolkit(BaseToolkit, ABC):
    name: str = "Gmail Toolkit"
    description: str = "A reliable and secure email service, offering seamless communication and organization for individuals and businesses alike."
    slug: str = "gmail"
    toolkit_id = "83dcc628-7f8f-4abd-b5bc-8636c497c8a7"

    is_active = False

    def get_tools(self) -> List[BaseTool]:
        return []

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
