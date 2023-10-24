call_configs = {
    "info": {"logo": "", "welcomeMessage": "Welcome to L3AGI"},
    "naming": {
        "home": "Home",
        "agent": "Agent",
        "team": "Team",
        "datasource": "Data sources",
        "models": "Models",
        "discovery": "Discovery",
        "chat": "Agents",
        "toolkits": "Toolkits",
        "schedules": "Schedules",
    },
    "modules": {
        "home": {
            "welcome_message": "Build your ",
            "submodules": {
                "team": False,
                "agent": True,
                "discovery": True,
            },
        },
        "chat": {
            "active": True,
            "label": "Multi-Agent",
            "submodules": {
                "team": False,
                "agent": True,
                "session": True,
            },
        },
        "model": {
            "active": True,
            "label": "Fine-tunings",
            "submodules": {
                "models": False,
                "fine-tuning": True,
            },
        },
        "toolkit": False,  # True
        "datasource": False,
        "discovery": False,
        "Session": True,
        "schedule": True,
        "contact": True,
        "group": True,
    },
}
