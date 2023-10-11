from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey
from tools.youtube.youtube_search import YoutubeSearchTool


class YoutubeSearchToolkit(BaseToolkit, ABC):
    name: str = "Youtube Toolkit"
    description: str = "Toolkit containing tools for searching Youtube"
    slug: str = "youtube"
    toolkit_id = "86bb1f1b-cca2-4e3f-b173-2cf80b60f371"

    def get_tools(self) -> List[BaseTool]:
        return [YoutubeSearchTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
