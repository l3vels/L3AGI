from typing import Optional, Type

from langchain.agents import AgentType, initialize_agent
from langchain.agents.agent_toolkits import ZapierToolkit
from langchain.callbacks.manager import CallbackManagerForToolRun
from langchain.utilities.zapier import ZapierNLAWrapper
from pydantic import BaseModel, Field

from exceptions import ToolEnvKeyException
from tools.base import BaseTool
from utils.model import get_llm


class ZapierSendSchema(BaseModel):
    query: str = Field(
        ...,
        description="use zapier",
    )


class ZapierSendTool(BaseTool):
    """Tool that queries Zapier."""

    name = "Zapier Send"

    slug = "zapierSend"

    description = "use zapier"

    args_schema: Type[ZapierSendSchema] = ZapierSendSchema

    tool_id = "657f9958-5e5d-43db-b1f7-9f7edd704480"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Send Zapier and return the results."""
        zapier_nla_api_key = self.get_env_key("ZAPIER_NLA_API_KEY")

        if not zapier_nla_api_key:
            raise ToolEnvKeyException(
                "Please fill Zapier API Key in the [Zapier Toolkit](/toolkits/zapier)"
            )

        llm = get_llm(
            self.settings,
            self.agent_with_configs,
        )
        zapier = ZapierNLAWrapper(zapier_nla_api_key=zapier_nla_api_key)
        toolkit = ZapierToolkit.from_zapier_nla_wrapper(zapier)
        agent = initialize_agent(
            toolkit.get_tools(),
            llm,
            agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
            verbose=True,
        )
        return agent.run(query)
