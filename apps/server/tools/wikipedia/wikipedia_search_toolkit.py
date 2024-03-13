from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey
from tools.wikipedia.wikipedia_search import WikipediaSearchTool


class WikipediaSearchToolkit(BaseToolkit, ABC):
    name: str = "Wikipedia Toolkit"
    description: str = "Your free encyclopedia, offering a vast repository of knowledge on virtually every topic imaginable."
    slug: str = "wikipedia"
    toolkit_id = "efc08c7c-dd11-427d-9137-47c59202e99f"

    def get_tools(self) -> List[BaseTool]:
        return [WikipediaSearchTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
