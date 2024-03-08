from typing import Optional, Type

from langchain.callbacks.manager import CallbackManagerForToolRun
from langchain_community.utilities import ArxivAPIWrapper
from pydantic import BaseModel, Field

from tools.base import BaseTool


class ArxivSearchSchema(BaseModel):
    query: str = Field(
        ...,
        description="The search query for ArXiv search.",
    )


class ArxivSearchTool(BaseTool):
    """Tool that searches the Arxiv API."""

    name = "ArXiv Search"

    slug = "arxivSearch"

    description = (
        "A wrapper around Arxiv.org "
        "Useful for when you need to answer questions about Physics, Mathematics, "
        "Computer Science, Quantitative Biology, Quantitative Finance, Statistics, "
        "Electrical Engineering, and Economics "
        "from scientific articles on arxiv.org. "
        "Input should be a search query."
    )

    args_schema: Type[ArxivSearchSchema] = ArxivSearchSchema

    tool_id = "58e41492-40e2-40f4-b548-c72a3b36ac72"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Search Arxiv and return the results."""
        arxiv = ArxivAPIWrapper()
        return arxiv.run(query)
