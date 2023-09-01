from typing import Optional, Type
from pydantic import BaseModel, Field
from langchain.callbacks.manager import (
    CallbackManagerForToolRun,
)
from tools.base import BaseTool


class TwilioSendSchema(BaseModel):
    query: str = Field(
        ...,
        description="The message and number for Twilio send.",
    )

class TwilioSendTool(BaseTool):
    """Tool that queries Twilio."""

    name = "Twilio Send"
    
    description = (
        "Send a text message using Twilio."
    )

    args_schema: Type[TwilioSendSchema] = TwilioSendSchema

    tool_id = "df345cd5-1fd7-4655-9bfe-6c629c605a98"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Send text message and return."""
        return ""

