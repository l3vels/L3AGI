from tools.serp_google_search.serp_google_search_toolkit import SerpGoogleSearchToolkit
from tools.webscraper.webscraper_toolkit import WebScraperToolkit
from tools.duck_duck_go.duck_duck_go_search_toolkit import DuckDuckGoSearchToolkit
from tools.bing.bing_search_toolkit import BingSearchToolkit
from tools.wikipedia.wikipedia_search_toolkit import WikipediaSearchToolkit
from tools.arxiv.arxiv_search_toolkit import ArxivSearchToolkit
from tools.open_weather_map.open_weather_map_toolkit import OpenWeatherMapToolkit
from tools.youtube.youtube_search_toolkit import YoutubeSearchToolkit
from tools.twilio.twilio_toolkit import TwilioSearchToolkit
from tools.twitter.twitter_toolkit import TwitterToolkit
from tools.instagram.instagram_toolkit import InstagramToolkit
from tools.slack.slack_toolkit import SlackToolkit
from tools.gmail.gmail_toolkit import GmailToolkit

TOOLKITS = [
    SerpGoogleSearchToolkit(),
    WebScraperToolkit(),
    DuckDuckGoSearchToolkit(),
    BingSearchToolkit(),
    WikipediaSearchToolkit(),
    ArxivSearchToolkit(),
    OpenWeatherMapToolkit(),
    YoutubeSearchToolkit(),
    TwilioSearchToolkit(),
    TwitterToolkit(),
    InstagramToolkit(),
    SlackToolkit(),
    GmailToolkit(),
]


def get_all_tools():
    """Return a list of all tools."""
    result = []

    for toolkit in TOOLKITS:
        result.append(
            {
                "toolkit_id": toolkit.toolkit_id,
                "is_system": True,
                "is_active": toolkit.is_active,
                "name": toolkit.name,
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
                        "description": tool.description,
                    }
                    for tool in toolkit.get_tools()
                ],
            }
        )

    return result


def get_tools(tool_names: str):
    """Return a list of tools."""
    tools = []

    # for tool_name in tool_names:
    # tools.append(TOOLS[tool_name])

    return tools
