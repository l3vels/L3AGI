from typing import Optional, Type

from langchain.agents import AgentType, initialize_agent
from langchain.agents.agent_toolkits import ZapierToolkit
from langchain.callbacks.manager import CallbackManagerForToolRun
from langchain.llms import OpenAI
from langchain.utilities.zapier import ZapierNLAWrapper
from pydantic import BaseModel, Field

from exceptions import ToolEnvKeyException
from tools.base import BaseTool
from utils.model import get_llm


class ZapierSendSchema(BaseModel):
    query: str = Field(
        ...,
        description=(
            "Before running any Actions tell the user that they need to reply after the Action completes to continue."
            "Step 1. Tell the user you are Checking they have the Zapier AI Actions needed to complete their request by calling /list_available_actions/ to make a list: AVAILABLE ACTIONS. Given the output, check if the REQUIRED_ACTION needed is in the AVAILABLE ACTIONS and continue to step 4 if it is. If not, continue to step 2."
            "Step 2. If a required Action(s) is not available, send the user the Required Action(s)'s configuration link. Tell them to let you know when they've enabled the Zapier AI Action."
            "Step 3. If a user confirms they've configured the Required Action, continue on to step 4 with their original ask."
            "Step 4. Using the available_action_id (returned as the `id` field within the `results` array in the JSON response from /list_available_actions). Fill in the strings needed for the run_action operation. Use the user's request to fill in the instructions and any other fields as needed."
        ),
    )


class ZapierSendTool(BaseTool):
    """Tool that queries Zapier."""

    name = "Zapier Send"

    description = (
        "Before running any Actions tell the user that they need to reply after the Action completes to continue."
        "Step 1. Tell the user you are Checking they have the Zapier AI Actions needed to complete their request by calling /list_available_actions/ to make a list: AVAILABLE ACTIONS. Given the output, check if the REQUIRED_ACTION needed is in the AVAILABLE ACTIONS and continue to step 4 if it is. If not, continue to step 2."
        "Step 2. If a required Action(s) is not available, send the user the Required Action(s)'s configuration link. Tell them to let you know when they've enabled the Zapier AI Action."
        "Step 3. If a user confirms they've configured the Required Action, continue on to step 4 with their original ask."
        "Step 4. Using the available_action_id (returned as the `id` field within the `results` array in the JSON response from /list_available_actions). Fill in the strings needed for the run_action operation. Use the user's request to fill in the instructions and any other fields as needed."
    )

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

        try:
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
            # return agent.run(query)
            response = agent.run(query)
            return "successful Response: " + str(response.status_code)
        except Exception as err:
            import traceback

            stack_trace = traceback.format_exc()
            print(f"An error occurred: {err}\nStack trace:\n{stack_trace}")
            return "Error: " + str(err)
