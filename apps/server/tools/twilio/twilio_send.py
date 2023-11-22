from typing import Optional, Type

from langchain.callbacks.manager import CallbackManagerForToolRun
from langchain.utilities.twilio import TwilioAPIWrapper
from pydantic import BaseModel, Field

from exceptions import ToolEnvKeyException
from tools.base import BaseTool


class TwilioSendSchema(BaseModel):
    query: str = Field(
        ...,
        description="The message and phone number for Twilio to send to separated by semicolon",
    )


class TwilioSendTool(BaseTool):
    """Tool that sends text message using Twilio."""

    name = "Twilio Send"

    slug = "twilioSend"

    description = (
        "Send a text message or SMS using Twilio."
        "Input query is the message and phone number for Twilio to send separated by semicolon"
    )

    args_schema: Type[TwilioSendSchema] = TwilioSendSchema

    tool_id = "df345cd5-1fd7-4655-9bfe-6c629c605a98"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Send text message and return."""
        account_sid = self.get_env_key("TWILIO_ACCOUNT_SID")
        auth_token = self.get_env_key("TWILIO_AUTH_TOKEN")
        from_number = self.get_env_key("TWILIO_FROM_NUMBER")

        if not account_sid:
            raise ToolEnvKeyException(
                f"Please fill Twilio Account SID in the [Twilio Toolkit](/toolkits/{self.toolkit_slug})"
            )

        if not auth_token:
            raise ToolEnvKeyException(
                f"Please fill Twilio Auth Token in the [Twilio Toolkit](/toolkits/{self.toolkit_slug})"
            )

        if not from_number:
            raise ToolEnvKeyException(
                f"Please fill Twilio From Number in the [Twilio Toolkit](/toolkits/{self.toolkit_slug})"
            )

        twilio = TwilioAPIWrapper(
            account_sid=account_sid,
            auth_token=auth_token,
            from_number=from_number,
        )

        message, phone = query.split(";")

        try:
            sid = twilio.run(message.strip(), phone.strip())
            return "Text message was sent successfully. Message SID: " + sid
        except Exception as err:
            return "Error: " + str(err)
