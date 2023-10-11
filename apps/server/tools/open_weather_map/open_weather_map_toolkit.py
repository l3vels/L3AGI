from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey, ToolEnvKeyType
from tools.open_weather_map.open_weather_map import OpenWeatherMapTool


class OpenWeatherMapToolkit(BaseToolkit, ABC):
    name: str = "OpenWeatherMap Toolkit"
    description: str = "Toolkit containing tools for performing DuckDuckGo search"
    slug: str = "openweathermap"
    toolkit_id = "045dfbae-a9e7-4b73-9563-8a381a5e239b"

    def get_tools(self) -> List[BaseTool]:
        return [OpenWeatherMapTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return [
            ToolEnvKey(
                label="OpenWeatherMap API Key",
                key="OPENWEATHERMAP_API_KEY",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            )
        ]
