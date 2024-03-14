from typing import Optional, Type

from langchain.callbacks.manager import CallbackManagerForToolRun
from langchain_community.utilities import OpenWeatherMapAPIWrapper
from pydantic import BaseModel, Field

from exceptions import ToolEnvKeyException
from tools.base import BaseTool


class OpenWeatherMapSchema(BaseModel):
    query: str = Field(
        ...,
        description="The search query for OpenWeatherMap.",
    )


class OpenWeatherMapTool(BaseTool):
    """Tool that queries the OpenWeatherMap API."""

    name = "OpenWeatherMap Search"

    slug = "openWeatherMapSearch"

    description = (
        "A wrapper around OpenWeatherMap API. "
        "Useful for fetching current weather information for a specified location. "
        "Input should be a location string (e.g. London,GB)."
    )

    args_schema: Type[OpenWeatherMapSchema] = OpenWeatherMapSchema

    tool_id = "47a7e8c6-49f2-4b8d-8ba4-8879099e1be2"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Search OpenWeatherMap and return the results."""
        openweathermap_api_key = self.get_env_key("OPENWEATHERMAP_API_KEY")

        if not openweathermap_api_key:
            raise ToolEnvKeyException(
                f"Please fill OpenWeatherMap API Key in the [OpenWeatherMap Toolkit](/toolkits/{self.toolkit_slug})"
            )

        search = OpenWeatherMapAPIWrapper(openweathermap_api_key=openweathermap_api_key)

        try:
            return search.run(query)
        except Exception as err:
            if "Invalid API Key" in str(err):
                raise ToolEnvKeyException(
                    f"OpenWeatherMap API Key is not valid. Please check in the [OpenWeatherMap Toolkit](/toolkits/{self.toolkit_slug})"
                )

            return "Could not retrieve weather information using OpenWeatherMap. Please try again later."
