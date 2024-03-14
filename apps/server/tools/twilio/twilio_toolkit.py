from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey, ToolEnvKeyType
from tools.twilio.twilio_send import TwilioSendTool


class TwilioSearchToolkit(BaseToolkit, ABC):
    name: str = "Twilio Toolkit"
    description: str = "Empowering developers to build flexible and reliable communication solutions through APIs for messaging, voice, and video."
    slug: str = "twilio"
    toolkit_id = "8dcb3215-a3ec-4da6-a673-60e4af61e86d"
    is_voice = True

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
