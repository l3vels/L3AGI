import json
import os
from datetime import datetime
from typing import Optional, Type

import requests
from dotenv import load_dotenv
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field

from exceptions import ToolEnvKeyException
from tools.base import BaseTool

load_dotenv()


class CalGetAvailableDatesSchema(BaseModel):
    query: str = Field(
        ...,
        description=(
            "The input parameter is a JSON string representing a time-related query for an action."
            "Give me 'dateFrom' and 'dateTo' fields in json as formatted like: dd/mm/yyyy"
            "Task is to interpret these expressions and translate them into date formats"
            "Current date is: " + datetime.now().strftime("%d/%m/%Y")
        ),
    )


class CalGetAvailableDatesTool(BaseTool):
    """
    Tool that fetches available dates from Cal.com
    """

    name = "Cal.com Get Available Dates"

    description = (
        "The input parameter is a JSON string representing a date-related query for an action."
        "Give me 'dateFrom' and 'dateTo' fields in json as formatted like: dd/mm/yyyy"
        "Task is to interpret these expressions and translate them into date formats"
        "Current date is " + datetime.now().strftime("%d/%m/%Y")
    )

    args_schema: Type[CalGetAvailableDatesSchema] = CalGetAvailableDatesSchema

    tool_id = "137d736b-ad3c-4004-81ee-acd9b9be0f3c"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        cal_api_key = self.get_env_key("CALCOM_API_KEY")
        cal_username = self.get_env_key("CALCOM_USERNAME")

        if not cal_api_key or not cal_username:
            raise ToolEnvKeyException(
                f"Please fill Cal.com Username and API Key in the [Cal.com Toolkit](/toolkits/{self.toolkit_slug})"
            )

        dates = json.loads(query)

        api = os.environ.get("CALCOM_API")
        dateFrom = datetime.strptime(dates["dateFrom"], "%d/%m/%Y").timestamp()
        dateTo = datetime.strptime(dates["dateTo"], "%d/%m/%Y").timestamp()
        try:
            api = f"{api}/availability"
            response = requests.get(
                api,
                params={
                    "apiKey": cal_api_key,
                    "username": cal_username,
                    "dateFrom": dateFrom,
                    "dateTo": dateTo,
                },
            )
        except Exception as e:
            print("Error:", e)

        # Valid parse method for response of availability.

        return str(response.json())
