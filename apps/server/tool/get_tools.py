from tool.serp_google_search.serp_google_search import SerpGoogleSearchTool

TOOLS = {
    'SerpGoogleSearch': SerpGoogleSearchTool,
}

def get_tools(tool_names: str):
    """Return a list of tools."""
    tools = []

    for tool_name in tool_names:
        tools.append(TOOLS[tool_name])

    return tools