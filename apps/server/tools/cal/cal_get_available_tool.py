import json
from datetime import datetime, timedelta
from typing import Optional, Type

import requests
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field

from exceptions import ToolEnvKeyException, ToolException
from tools.base import BaseTool


class CalGetAvailableDatesSchema(BaseModel):
    query: str = Field(
        ...,
        description=(
            "Your task is to process a JSON string representing a time-related query for a specific action. \n"
            "Give me 'dateFrom' and 'dateTo' fields in JSON format, formatted as dd/mm/yyyy. \n"
            "Ensure that the maximum difference between 'dateFrom' and 'dateTo' does not exceed 7 days. \n"
            "Task is to interpret these expressions without exceeding 7 days (1 week) and translate them into date formats \n"
            "The current date for reference is " + datetime.now().strftime("%d/%m/%Y")
        ),
    )


class CalGetAvailableDatesTool(BaseTool):
    """
    Tool that fetches available dates from Cal.com
    """

    name = "Cal.com Get Available Dates"

    slug = "calendarAvailabilities"

    description = (
        "Your task is to process a JSON string representing a time-related query for a specific action. \n"
        "Give me 'dateFrom' and 'dateTo' fields in JSON format, formatted as dd/mm/yyyy. \n"
        "Ensure that the maximum difference between 'dateFrom' and 'dateTo' does not exceed 7 days. \n"
        "Task is to interpret these expressions without exceeding 7 days (1 week) and translate them into date formats \n"
        "The current date for reference is " + datetime.now().strftime("%d/%m/%Y")
    )

    args_schema: Type[CalGetAvailableDatesSchema] = CalGetAvailableDatesSchema

    tool_id = "137d736b-ad3c-4004-81ee-acd9b9be0f3c"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        base_url = "https://api.cal.com/v1"
        cal_api_key = self.get_env_key("CALCOM_API_KEY")
        cal_username = self.get_env_key("CALCOM_USERNAME")

        if not cal_api_key or not cal_username:
            raise ToolEnvKeyException(
                f"Please fill Cal.com Username and API Key in the [Cal.com Toolkit](/toolkits/{self.toolkit_slug})"
            )

        if query != self.slug:
            dates = json.loads(query)
        else:
            dates = {
                "dateFrom": datetime.now().strftime("%d/%m/%Y"),
                "dateTo": (datetime.now() + timedelta(weeks=1)).strftime("%d/%m/%Y"),
            }

        dateFrom = datetime.strptime(dates["dateFrom"], "%d/%m/%Y").timestamp()
        dateTo = datetime.strptime(dates["dateTo"], "%d/%m/%Y").timestamp()
        try:
            api = f"{base_url}/availability"
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
            raise ToolException(str(e))

        data = response.json()

        busy = data["busy"]
        timeZone = data["timeZone"]
        workingHours = data["workingHours"]

        result = f"Busy Time Ranges: {busy}\nTime Zone: {timeZone}\n"
        if workingHours:
            result += "Working Hours:\n"
            for hours in workingHours:
                result += f' - Days: {hours["days"]}, Start Time: {hours["startTime"]}, End Time: {hours["endTime"]}\n'

        return result
