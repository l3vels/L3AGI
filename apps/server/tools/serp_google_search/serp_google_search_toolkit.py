from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey, ToolEnvKeyType
from tools.serp_google_search.serp_google_search import SerpGoogleSearchTool


class SerpGoogleSearchToolkit(BaseToolkit, ABC):
    name: str = "Google SERP Search Toolkit"
    description: str = "Your gateway to discovering the most relevant and up-to-date information on the web, curated by the world's leading search engine."
    slug: str = "google-serp-search"
    toolkit_id = "fed46dde-ee8e-420b-a1bb-4a161aa01dca"

    def get_tools(self) -> List[BaseTool]:
        return [SerpGoogleSearchTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return [
            ToolEnvKey(
                label="Serp API Key",
                key="SERP_API_KEY",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            )
        ]
