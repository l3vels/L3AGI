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
            "Optional fields such as 'name', 'email', 'location', 'timeZone', 'title', 'notes', and 'description'.\n"
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
        "Optional fields such as 'name', 'email', 'location', 'timeZone', 'title', 'notes', and 'description'.\n"
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

        start = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%dT%H:%M:%S.000Z")
        end = (datetime.now() + timedelta(days=1, hours=1)).strftime(
            "%Y-%m-%dT%H:%M:%S.000Z"
        )

        api = os.environ.get("CALCOM_API")
        try:
            api = f"{api}/bookings"
            response = requests.post(
                api,
                params={"apiKey": cal_api_key},
                json={
                    "eventTypeId": 494081,
                    "start": start,
                    "end": end,
                    "metadata": {},
                    "responses": {
                        "name": action.get("name", ""),
                        "email": action.get("email", ""),
                        "notes": action.get("notes", ""),
                        "phone": action.get("phone", ""),
                        "location": action.get("location", ""),
                    },
                    "timeZone": action.get("timeZone", "Asia/Tbilisi"),
                    "language": action.get("language", "en"),
                    "title": action.get("title", ""),
                    "description": action.get("description", ""),
                    "hasHashedBookingLink": False,
                    "hashedLink": None,
                },
            )
        except Exception as e:
            raise ToolException(str(e))

        return str(response.json())
