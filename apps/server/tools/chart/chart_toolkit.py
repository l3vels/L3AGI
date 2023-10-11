from abc import ABC
from typing import List
from tools.base import BaseToolkit, BaseTool, ToolEnvKey
from tools.chart.chart_generator import ChartGeneratorTool


class ChartToolkit(BaseToolkit, ABC):
    name: str = "Chart Toolkit"
    description: str = "Toolkit containing tools for generating different types of charts including bar, pie, line."
    slug: str = "chart"
    toolkit_id = "a54f1ebc-5984-47e8-9292-fa9256ebe623"

    def get_tools(self) -> List[BaseTool]:
        return [ChartGeneratorTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
