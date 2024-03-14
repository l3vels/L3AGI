from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey, ToolEnvKeyType
from tools.sendgrid.sendgrid_send import SendGridSendTool


class SendGridToolkit(BaseToolkit, ABC):
    name: str = "SendGrid Toolkit"
    description: str = "Empowering businesses to deliver emails that matter, reliably and at scale, with powerful email delivery solutions."
    slug: str = "sendgrid"
    toolkit_id = "52a88c82-df3c-4caa-84f3-5752ed61e36d"
    is_voice = True

    def get_tools(self) -> List[BaseTool]:
        return [SendGridSendTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return [
            ToolEnvKey(
                label="API Key",
                key="SENDGRID_API_KEY",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            ToolEnvKey(
                label="From Email",
                key="SENDGRID_FROM_EMAIL",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=False,
            ),
        ]
