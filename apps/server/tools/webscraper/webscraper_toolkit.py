from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey
from tools.webscraper.webscraper import WebScraperTool


class WebScraperToolkit(BaseToolkit, ABC):
    name: str = "Web Scraper Toolkit"
    description: str = "Extract data from websites effortlessly, turning web content into actionable insights."
    slug: str = "webscraper"
    toolkit_id = "78d8a328-9ec0-476a-b028-d4c7f801e395"

    def get_tools(self) -> List[BaseTool]:
        return [WebScraperTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
