heyyou_configs = {
    "naming": {
        "home": "Home",
        "agent": "Influencers",
        "team": "Team",
        "datasource": "Knowledges",
        "models": "Models",
        "discovery": "Discovery",
        "chat": "Influencers",
        "toolkits": "Toolkits",
        "schedules": "Schedules",
        "welcome_message": "BUILD AI BOT FOR INFLUENCERS",
        "description": "Open-source tool that enables AI agents to collaborate as effectively as human teams",
    },
    "modules": {
        "home": {
            "submodules": {
                "team": False,
                "agent": True,
                "discovery": True,
            }
        },
        "chat": {
            "name": "Influencers",
            "active": True,
            "submodules": {
                "agent": True,
                "session": True,
            },
        },
        "model": True,
        # "toolkit": True,
        "datasource": True,
        "discovery": False,
        "Session": False,
        "Discovery": False,
        "schedule": True,
    },
}
