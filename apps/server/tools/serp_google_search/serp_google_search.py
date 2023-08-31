from typing import Optional, Type
from pydantic import BaseModel, Field
from langchain import SerpAPIWrapper
from langchain.callbacks.manager import (
    CallbackManagerForToolRun,
)
# from langchain.agents.agent_toolkits import Toolkit, GmailToolkit, JsonToolkit
from tools.base import BaseTool


class SerpGoogleSearchSchema(BaseModel):
    query: str = Field(
        ...,
        description="The search query for Google search.",
    )

class SerpGoogleSearchTool(BaseTool):
    name = "Serp Google Search"
    
    description = (
        "A tool for performing a Google search and extracting snippets and webpages."
        "useful for when you need to answer questions about current events"
    )

    args_schema: Type[SerpGoogleSearchSchema] = SerpGoogleSearchSchema

    tool_id = "a66b3b20-d0a2-4b53-a775-197bc492e816"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Search Google and return the results."""
        search = SerpAPIWrapper()
        search.serpapi_api_key = self.get_env_key("SERP_API_KEY")
        return search.run(query)

