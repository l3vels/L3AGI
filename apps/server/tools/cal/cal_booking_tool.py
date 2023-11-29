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


class CalBookingSchema(BaseModel):
    query: str = Field(
        ...,
        description=(
            "Your task involves managing a JSON string representing an action query.\n"
            "Generate a JSON output including:\n"
            "Time format entries for 'start' and 'end' fields, where 'end' can be left empty (Use format: 'YYYY-MM-DDTHH:MM:SS.000Z').\n"
            "Optional fields such as 'name', 'email', 'location', 'timeZone', 'title', 'notes', 'description', and 'duration' (represented as '30min').\n"
            "If 'timeZone' is unspecified, default it to 'America/New York'.\n"
            "Format the time relative to the current time; if the specified time is in the past, automatically format provided time for tomorrow \n"
            "The current time is " + datetime.now().strftime("%d/%m/%Y")
        ),
    )


class CalBookingTool(BaseTool):
    """
    Tool books a calendar to a date with Email
    """

    name = "Cal.com Book a calendar with Email"

    slug = "calBookCalendar"

    description = (
        "Your task involves managing a JSON string representing an action query.\n"
        "Generate a JSON output including:\n"
        "Time format entries for 'start' and 'end' fields, where 'end' can be left empty (Use format: 'YYYY-MM-DDTHH:MM:SS.000Z').\n"
        "Optional fields such as 'name', 'email', 'location', 'timeZone', 'title', 'notes', 'description', and 'duration' (represented as '30min').\n"
        "If 'timeZone' is unspecified, default it to 'America/New York'.\n"
        "Format the time relative to the current time; if the specified time is in the past, automatically format provided time for tomorrow \n"
        "The current time is " + datetime.now().strftime("%d/%m/%Y")
    )

    args_schema: Type[CalBookingSchema] = CalBookingSchema

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

        action = json.loads(query)

        start = action.get("start") or (datetime.now() + timedelta(days=1)).strftime(
            "%Y-%m-%dT%H:%M:%S.000Z"
        )
        duration = action.get("duration")

        try:
            res = requests.get(
                f"{base_url}/event-types", params={"apiKey": cal_api_key}
            )
            event_types = res.json().get("event_types", [])
            if not event_types:
                raise ToolException(
                    "Booking an event is not available with your account. Please specify an Event Type in your Cal.com account."
                )

            if not duration:
                duration = event_types[0].get("id")
            else:
                for event_type in event_types:
                    if event_type.get("slug") == duration:
                        duration = event_type.get("id")
                        break
                else:
                    raise ToolException(
                        "No available Event Type was found with specified duration"
                    )
        except Exception as e:
            raise ToolException(str(e))

        try:
            response = requests.post(
                f"{base_url}/bookings",
                params={"apiKey": cal_api_key},
                json={
                    "eventTypeId": duration,
                    "start": start,
                    "end": action.get("end", ""),
                    "metadata": {},  # TODO(low): research what we can pass here
                    "responses": {
                        "name": action.get("name", self.account.name),
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
