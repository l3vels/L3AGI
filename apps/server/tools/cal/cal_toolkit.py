from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey, ToolEnvKeyType
from tools.cal.cal_booking_tool import CalBookingTool
from tools.cal.cal_get_available_tool import CalGetAvailableDatesTool


class CalToolkit(BaseToolkit, ABC):
    name: str = "Cal.com Toolkit"
    description: str = "The simple solution for managing your schedule online. Streamline your appointments, events, and tasks with ease."
    slug: str = "cal"
    toolkit_id = "be23abc5-1e33-431e-8a9a-9233c527143b"
    is_voice = True

    def get_tools(self) -> List[BaseTool]:
        return [CalGetAvailableDatesTool(), CalBookingTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return [
            ToolEnvKey(
                label="API key",
                key="CALCOM_API_KEY",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            ToolEnvKey(
                label="Username",
                key="CALCOM_USERNAME",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=False,
            ),
        ]
