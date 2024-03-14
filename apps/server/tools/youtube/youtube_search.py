from typing import Optional, Type

from langchain.callbacks.manager import CallbackManagerForToolRun
from langchain_community.tools import YouTubeSearchTool
from pydantic import BaseModel, Field

from tools.base import BaseTool


class YoutubeSearchSchema(BaseModel):
    query: str = Field(
        ...,
        description="The search query for Youtube search.",
    )


class YoutubeSearchTool(BaseTool):
    """Tool that queries YouTube."""

    name = "Youtube Search"

    slug = "youtubeSearch"

    description = (
        "search for youtube videos associated with a person. "
        "the input to this tool should be a comma separated list, "
        "the first part contains a person name and the second a "
        "number that is the maximum number of video results "
        "to return aka num_results. the second part is optional"
    )

    args_schema: Type[YoutubeSearchSchema] = YoutubeSearchSchema

    tool_id = "59209d41-83cf-48c5-806a-ec87a55cdcc4"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Search Youtube and return the results."""
        youtube = YouTubeSearchTool()
        return youtube.run(query)
