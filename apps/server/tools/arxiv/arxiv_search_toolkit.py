from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey
from tools.arxiv.arxiv_search import ArxivSearchTool


class ArxivSearchToolkit(BaseToolkit, ABC):
    name: str = "ArXiv Toolkit"
    description: str = "Toolkit containing tools for searching ArXiv"
    slug: str = "arxiv"
    toolkit_id = "7e9a40e2-0b3c-4fcf-b1af-b0ffeaf1c3a0"

    def get_tools(self) -> List[BaseTool]:
        return [ArxivSearchTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
