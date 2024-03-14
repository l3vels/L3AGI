from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey, ToolEnvKeyType
from tools.bing.bing_search import BingSearchTool


class BingSearchToolkit(BaseToolkit, ABC):
    name: str = "Bing Search Toolkit"
    description: str = "Microsoft Bing, commonly referred to as Bing, is a search engine owned and operated by Microsoft."
    slug: str = "bing"
    toolkit_id = "505a8bc1-820a-428a-b7a9-1a33807fe172"

    def get_tools(self) -> List[BaseTool]:
        return [BingSearchTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return [
            ToolEnvKey(
                label="Bing Subscription Key",
                key="BING_SUBSCRIPTION_KEY",
                key_type=ToolEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            )
        ]
