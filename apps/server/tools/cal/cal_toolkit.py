from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey, ToolEnvKeyType


class CalToolkit(BaseToolkit, ABC):
    name: str = "Cal.com Toolkit"
    description: str = (
        "Toolkit containing tools for performing interaction with cal.com"
    )
    slug: str = "cal.com"
    toolkit_id = "be23abc5-1e33-431e-8a9a-9233c527143b"

    def get_tools(self) -> List[BaseTool]:
        return []

    def get_env_keys(self) -> List[ToolEnvKey]:
        return [
            ToolEnvKey(
                label="API key",
                key="CALCOM_API_KEY",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            )
        ]
