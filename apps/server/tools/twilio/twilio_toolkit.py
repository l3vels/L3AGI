from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey, ToolEnvKeyType
from tools.twilio.twilio_send import TwilioSendTool


class TwilioSearchToolkit(BaseToolkit, ABC):
    name: str = "Twilio Toolkit"
    description: str = "Toolkit containing tools for searching Twilio"
    slug: str = "twilio"
    toolkit_id = "8dcb3215-a3ec-4da6-a673-60e4af61e86d"

    def get_tools(self) -> List[BaseTool]:
        return [TwilioSendTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return [
            ToolEnvKey(
                label="Account SID",
                key="TWILIO_ACCOUNT_SID",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=False,
            ),
            ToolEnvKey(
                label="Auth Token",
                key="TWILIO_AUTH_TOKEN",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            ToolEnvKey(
                label="From Number",
                key="TWILIO_FROM_NUMBER",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=False,
            ),
        ]
