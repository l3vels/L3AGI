from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey
from tools.twilio.twilio_send import TwilioSendTool

class TwilioSearchToolkit(BaseToolkit, ABC):
    name: str = "Twilio Toolkit"
    description: str = "Toolkit containing tools for searching Twilio"
    slug: str = "twilio"
    toolkit_id = "8dcb3215-a3ec-4da6-a673-60e4af61e86d"

    is_active = False

    def get_tools(self) -> List[BaseTool]:
        return [TwilioSendTool()]
    
    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
