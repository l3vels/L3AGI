from typing import Optional, Type
from pydantic import BaseModel, Field
from langchain.tools import BaseTool
from langchain import SerpAPIWrapper
from langchain.callbacks.manager import (
    CallbackManagerForToolRun,
)
from langchain.agents.agent_toolkits import Toolkit, GmailToolkit, JsonToolkit
# from langchain.agents.agent_toolkits.base import BaseToolkit


class SerpGoogleSearchSchema(BaseModel):
    query: str = Field(
        ...,
        description="The search query for Google search.",
    )

class SerpGoogleSearchTool(BaseTool):
    name = "SerpGoogleSearch"
    
    description = (
        "A tool for performing a Google search and extracting snippets and webpages."
        "useful for when you need to answer questions about current events"
    )

    args_schema: Type[SerpGoogleSearchSchema] = SerpGoogleSearchSchema


    # Tool should have id

    # TODO: tool should return some schema of key value pairs

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Search Google and return the results."""
        search = SerpAPIWrapper()
        return search.run(query)

