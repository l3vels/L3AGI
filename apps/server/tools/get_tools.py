from typing import List

from tools.arxiv.arxiv_search_toolkit import ArxivSearchToolkit
from tools.base import BaseTool, BaseToolkit
from tools.bing.bing_search_toolkit import BingSearchToolkit
from tools.cal.cal_toolkit import CalToolkit
from tools.chart.chart_toolkit import ChartToolkit
from tools.dalle.dalle_toolkit import DalleToolkit
from tools.duck_duck_go.duck_duck_go_search_toolkit import \
    DuckDuckGoSearchToolkit
from tools.gmail.gmail_toolkit import GmailToolkit
from tools.google_calendar.google_calendar_toolkit import GoogleCalendarToolkit
from tools.instagram.instagram_toolkit import InstagramToolkit
from tools.open_weather_map.open_weather_map_toolkit import \
    OpenWeatherMapToolkit
from tools.sendgrid.sendgrid_toolkit import SendGridToolkit
from tools.serp_google_search.serp_google_search_toolkit import \
    SerpGoogleSearchToolkit
from tools.slack.slack_toolkit import SlackToolkit
from tools.twilio.twilio_toolkit import TwilioSearchToolkit
from tools.twitter.twitter_toolkit import TwitterToolkit
from tools.webscraper.webscraper_toolkit import WebScraperToolkit
from tools.wikipedia.wikipedia_search_toolkit import WikipediaSearchToolkit
from tools.youtube.youtube_search_toolkit import YoutubeSearchToolkit
from tools.zapier.zapier_toolkit import ZapierSendToolkit

TOOLKITS: List[BaseToolkit] = [
    SerpGoogleSearchToolkit(),
    WebScraperToolkit(),
    DuckDuckGoSearchToolkit(),
    BingSearchToolkit(),
    WikipediaSearchToolkit(),
    ArxivSearchToolkit(),
    OpenWeatherMapToolkit(),
    YoutubeSearchToolkit(),
    TwilioSearchToolkit(),
    SendGridToolkit(),
    ZapierSendToolkit(),
    DalleToolkit(),
    ChartToolkit(),
    CalToolkit(),
    TwitterToolkit(),
    InstagramToolkit(),
    SlackToolkit(),
    GmailToolkit(),
    GoogleCalendarToolkit(),
]


def get_all_tools():
    """Return a list of all tools."""
    result = []

    for toolkit in TOOLKITS:
        result.append(
            {
                "toolkit_id": toolkit.toolkit_id,
                "is_public": True,
                "is_active": toolkit.is_active,
                "is_voice": toolkit.is_voice,
                "name": toolkit.name,
                "slug": toolkit.slug,
                "description": toolkit.description,
                "fields": [
                    {
                        "label": env_key.label,
                        "key": env_key.key,
                        "type": str(env_key.key_type),
                        "is_required": env_key.is_required,
                        "is_secret": env_key.is_secret,
                    }
                    for env_key in toolkit.get_env_keys()
                ],
                "tools": [
                    {
                        "tool_id": tool.tool_id,
                        "name": tool.name,
                        "slug": tool.slug,
                        "description": tool.description,
                    }
                    for tool in toolkit.get_tools()
                ],
            }
        )

    return result


def get_toolkit_id_by_tool_name(tool_name: str) -> str | None:
    toolkits = get_all_tools()

    for toolkit in toolkits:
        for tool in toolkit["tools"]:
            if tool["name"] == tool_name:
                return toolkit["toolkit_id"]


def get_tool_by_slug(
    toolkit_slug: str, tool_slug: str, db, account, agent_with_configs
) -> BaseTool | None:
    for toolkit in TOOLKITS:
        if toolkit_slug != toolkit.slug:
            continue

        tools = toolkit.get_tools_with_configs(
            db, account, agent_with_configs, None, None
        )
        for tool in tools:
            if tool.slug == tool_slug:
                return tool


def get_agent_tools(
    toolkit_ids: List[str], db, account, settings, agent_with_configs, callback_handler
) -> List[BaseTool]:
    """Return a list of tools."""
    tools = []

    for toolkit in TOOLKITS:
        if toolkit.toolkit_id in toolkit_ids:
            tools.extend(
                toolkit.get_tools_with_configs(
                    db, account, settings, agent_with_configs, callback_handler
                )
            )

    return tools
