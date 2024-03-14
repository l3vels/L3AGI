from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey
from tools.twitter.tweet import TweetTool


class TwitterToolkit(BaseToolkit, ABC):
    name: str = "Twitter Toolkit"
    description: str = "Connect, share, and stay informed with the latest updates and discussions from around the world."
    slug: str = "twitter"
    toolkit_id = "0e0ae6fb-0f1c-4d00-bc84-1feb2a6824c6"

    is_active = False

    def get_tools(self) -> List[BaseTool]:
        return [TweetTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
