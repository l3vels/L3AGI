import json
from typing import Optional, Type

import requests
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field

from exceptions import ToolEnvKeyException, ToolException
from tools.base import BaseTool


class ZapierSendSchema(BaseModel):
    query: str = Field(
        ...,
        description=(
            "Your task is to process a JSON string representing an instruction-related query for a specific action.\n"
            "Extract the 'instructions' field from the JSON, containing clear, human-readable instructions.\n"
            "Retrieve the 'action_id' separately if provided by the user; if not, set it as an empty string.\n"
            "Ensure 'action_id' is not included inside the 'instructions' field in the returned JSON.\n"
        ),
    )


class ZapierSendTool(BaseTool):
    """Tool that queries Zapier."""

    name = "Zapier Send"

    slug = "zapierSend"

    description = (
        "Your task is to process a JSON string representing an instruction-related query for a specific action.\n"
        "Extract the 'instructions' field from the JSON, containing clear, human-readable instructions.\n"
        "Retrieve the 'action_id' separately if provided by the user; if not, set it as an empty string.\n"
        "Ensure 'action_id' is not included inside the 'instructions' field in the returned JSON.\n"
    )

    args_schema: Type[ZapierSendSchema] = ZapierSendSchema

    tool_id = "657f9958-5e5d-43db-b1f7-9f7edd704480"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Send Zapier and return the results."""
        base_url = "https://actions.zapier.com/api/v1"
        zapier_nla_api_key = self.get_env_key("ZAPIER_NLA_API_KEY")

        if not zapier_nla_api_key:
            raise ToolEnvKeyException(
                "Please fill Zapier API Key in the [Zapier Toolkit](/toolkits/zapier)"
            )

        data = json.loads(query)
        try:
            response = requests.get(
                f"{base_url}/exposed/", params={"api_key": zapier_nla_api_key}
            )

            result = response.json().get("results")
            if not result:
                raise ToolException(
                    "Please set up at least one Zap in the [Zapier Dashboard](https://zapier.com/app/dashboard)"
                )

            action_id = next(
                (
                    result_item.get("id")
                    for result_item in result
                    if result_item.get("id") == data.get("action_id")
                ),
                None,
            )
            if not action_id:
                error = "Action with provided 'id' not found, Here is your available actions that you can use with Zapier Integration:\n"
                for result_item in result:
                    error += f'- {result_item["id"]} | {result_item["description"]}\n'

                raise ToolException(error)

            instructions = data.get("instructions")

            executionResponse = requests.post(
                f"{base_url}/exposed/{action_id}/execute/",
                params={"api_key": zapier_nla_api_key},
                json={
                    "instructions": str(instructions),
                    "preview_only": False,
                },
            )

            return str(executionResponse.json())
        except Exception as e:
            raise ToolException(str(e))
