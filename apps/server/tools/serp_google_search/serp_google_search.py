from typing import Optional, Type
from pydantic import BaseModel, Field
from langchain import SerpAPIWrapper
from langchain.callbacks.manager import (
    CallbackManagerForToolRun,
)
from exceptions import ToolEnvKeyException
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
        serpapi_api_key = self.get_env_key("SERP_API_KEY")

        if not serpapi_api_key:
            raise ToolEnvKeyException(f"Please fill Serp API Key in the [Google SERP Search Toolkit](/tools/{self.toolkit_id})")
        
        search = SerpAPIWrapper(serpapi_api_key=serpapi_api_key)

        try:
            return search.run(query)
        except Exception as err:
            if "Invalid API key" in str(err):
                raise ToolEnvKeyException(f"Serp API Key is not valid. Please check in the [Google SERP Search Toolkit](/tools/{self.toolkit_id})")

            return "Could not search Google. Please try again later."