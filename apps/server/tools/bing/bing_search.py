from typing import Optional, Type

from langchain.callbacks.manager import CallbackManagerForToolRun
from langchain.utilities.bing_search import BingSearchAPIWrapper
from pydantic import BaseModel, Field

from exceptions import ToolEnvKeyException
from tools.base import BaseTool


class BingSearchSchema(BaseModel):
    query: str = Field(
        ...,
        description="The search query for Bing search.",
    )


class BingSearchTool(BaseTool):
    name = "Bing Search"

    slug = "bingSearch"

    description = (
        "A tool for performing a Bing search."
        "useful for when you need to answer questions about current events"
    )

    args_schema: Type[BingSearchSchema] = BingSearchSchema

    tool_id = "88be4eef-6d3c-4eaa-b7a5-a30dda650c14"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Search Bing and return the results."""
        bing_subscription_key = self.get_env_key("BING_SUBSCRIPTION_KEY")

        if not bing_subscription_key:
            raise ToolEnvKeyException(
                f"Please fill Bing Subscription Key in the [Bing Search Toolkit](/toolkits/{self.toolkit_slug})"
            )

        search = BingSearchAPIWrapper(
            bing_subscription_key=bing_subscription_key,
            bing_search_url="https://api.bing.microsoft.com/v7.0/search",
        )

        try:
            return search.run(query)
        except Exception as err:
            if "401 Client Error: PermissionDenied for url" in str(err):
                raise ToolEnvKeyException(
                    f"Bing Subscription Key is not valid. Please check in the [Bing Search Toolkit](/toolkits/{self.toolkit_slug})"
                )

            return "Could not search using Bing. Please try again later."
