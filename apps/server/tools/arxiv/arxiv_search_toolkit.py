from abc import ABC
from typing import List

from tools.arxiv.arxiv_search import ArxivSearchTool
from tools.base import BaseTool, BaseToolkit, ToolEnvKey


class ArxivSearchToolkit(BaseToolkit, ABC):
    name: str = "ArXiv Toolkit"
    description: str = "arXiv is a free distribution service and an open-access archive for nearly 2.4 million scholarly articles in the fields of physics, mathematics, computer science, quantitative biology, quantitative finance, statistics, electrical engineering and systems science, and economics."
    slug: str = "arxiv"
    toolkit_id = "7e9a40e2-0b3c-4fcf-b1af-b0ffeaf1c3a0"

    def get_tools(self) -> List[BaseTool]:
        return [ArxivSearchTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
