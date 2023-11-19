import json
from typing import Optional, Type

import sendgrid
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field
from sendgrid.helpers.mail import Mail

from exceptions import ToolEnvKeyException
from tools.base import BaseTool


class SendGridSendSchema(BaseModel):
    query: str = Field(
        ...,
        description=(
            "Parameter is JSON string representing action input.\n"
            '"to" Python str, which is objective in natural language provided by user\n'
            '"subject" Python str, which is objective in natural language provided by user\n'
            '"content" Python str, which is objective in natural language provided by user\n'
        ),
    )


class SendGridSendTool(BaseTool):
    """Tool that sends an email using SendGrid."""

    name = "SendGrid Send"

    slug = "sendGridSend"

    description = (
        "Parameter is JSON string representing action input.\n"
        '"to" Python str, which is objective in natural language provided by user\n'
        '"subject" Python str, which is objective in natural language provided by user\n'
        '"content" Python str, which is objective in natural language provided by user\n'
    )

    args_schema: Type[SendGridSendSchema] = SendGridSendSchema

    tool_id = "01ae313c-bf14-4d0d-8ea9-efa3b1a5507a"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        api_key = self.get_env_key("SENDGRID_API_KEY")
        from_email = self.get_env_key("SENDGRID_FROM_EMAIL")

        if not api_key:
            raise ToolEnvKeyException(
                "Please fill SendGrid API Key in the [SendGrid Toolkit](/toolkits/sendgrid)"
            )

        if not from_email:
            raise ToolEnvKeyException(
                "Please fill SendGrid From Email in the [SendGrid Toolkit](/toolkits/sendgrid)"
            )

        sg = sendgrid.SendGridAPIClient(api_key=api_key)

        action = json.loads(query)

        subject = action["subject"]
        if not subject:
            subject = "Empty Subject"

        mail = Mail(
            from_email=from_email,
            to_emails=action["to"],  # Use recipient_email instead of to_email
            subject=subject,  # Use email_subject instead of subject
            html_content=action["content"],  # Use email_content instead of content
        )

        try:
            response = sg.send(mail)
            return "Email sent successfully. Response: " + str(response.status_code)
        except Exception as err:
            return "Error: " + str(err)
