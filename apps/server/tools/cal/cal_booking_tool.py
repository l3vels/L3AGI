import json
import os
from datetime import datetime, timedelta
from typing import Optional, Type

import requests
from dotenv import load_dotenv
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field

from exceptions import ToolEnvKeyException, ToolException
from tools.base import BaseTool

load_dotenv()


class CalBookingSchema(BaseModel):
    query: str = Field(
        ...,
        description=(
            "This task involves managing a JSON string that represents an action query.\n"
            "Generate a JSON output containing:\n"
            "Time format entries for 'start' and 'end' fields, where 'end' can be left empty. Please use the format: 'YYYY-MM-DDTHH:MM:SS.000Z'\n"
            "Optional fields such as 'name', 'email', 'meetingurl', 'timeZone', 'title', and 'description'.\n"
            "If 'timeZone' is unspecified, assign the default as 'America/New York'"
        ),
    )


class CalBookingTool(BaseTool):
    """
    Tool books a calendar to a date with Email
    """

    name = "Cal.com Book a calendar with Email"

    description = (
        "This task involves managing a JSON string that represents an action query.\n"
        "Generate a JSON output containing:\n"
        "Time format entries for 'start' and 'end' fields, where 'end' can be left empty. Please use the format: 'YYYY-MM-DDTHH:MM:SS.000Z'\n"
        "Optional fields such as 'name', 'email', 'meetingurl', 'timeZone', 'title', and 'description'.\n"
        "If 'timeZone' is unspecified, assign the default as 'America/New York'"
    )

    args_schema: Type[CalBookingSchema] = CalBookingSchema

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

        action = json.loads(query)
        print("-->", action)

        start = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%S.000Z")
        end = (datetime.now() + timedelta(days=1, hours=1)).strftime(
            "%Y-%m-%dT%H:%M:%S.000Z"
        )
        name = action.get("name", "")
        email = action.get("email", "")
        timeZone = action.get("timeZone", "America/New York")
        language = action.get("language", "English")
        title = action.get("title", "")
        description = (action.get("description", ""),)
        meetingurl = action.get("meetingurl", "")

        if not meetingurl:
            location = {"optionValue": meetingurl, "value": "other"}
            pass
        else:
            location = {"optionValue": "Cal Video", "value": "global"}
            pass

        api = os.environ.get("CALCOM_API")
        try:
            api = f"{api}/bookings"
            response = requests.post(
                api,
                params={"apiKey": cal_api_key},
                json={
                    "username": cal_username,
                    "eventTypeId": 7,
                    "start": start,
                    "end": end,
                    "responses": {
                        "name": name,
                        "email": email,
                        "location": location,
                    },
                    "timeZone": timeZone,
                    "language": language,
                    "title": title,
                    "description": description,
                    "metadata": {},
                },
            )
        except Exception as e:
            raise ToolException(str(e))

        return str(response.json())
