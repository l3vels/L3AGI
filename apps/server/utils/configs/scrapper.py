scrapper_configs = {
    "info": {"logo": "", "welcomeMessage": "Welcome to L3AGI"},
    "naming": {
        "home": "Home",
        "agent": "Scrappers",
        "team": "Team",
        "datasource": "Data sources",
        "models": "Models",
        "discovery": "Discovery",
        "chat": "Scrappers",
        "toolkits": "Toolkits",
        "schedules": "Schedules",
    },
    "modules": {
        "home": {
            "submodules": {
                "team": {
                    "operations": {
                        "create": True,
                        "list": True,
                        "edit": True,
                        "delete": True,
                    }
                },
                "agent": True,
                "discovery": True,
            }
        },
        "chat": {
            "active": True,
            "label": "Scrappers",
            "submodules": {
                "team": {"operations": {"create": True, "list": True, "edit": True}},
                "agent": True,
                "session": True,
            },
        },
        "model": False,
        "toolkit": True,
        "datasource": True,
        "discovery": False,
        "Session": False,
        "schedule": False,
    },
}
