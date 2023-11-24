dato_configs = {
    "info": {"logo": "", "welcomeMessage": "Welcome to L3AGI"},
    "naming": {
        "home": "Home",
        "agent": "Agent",
        "team": "Team",
        "datasource": "Data source",
        "models": "Model",
        "discovery": "Discovery",
        "chat": "Agents",
        "toolkits": "Toolkits",
        "schedules": "Schedules",
    },
    "modules": {
        "home": {
            "welcome_message": "Build Your Support AI Agents",
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
                "models": True,
                "fine-tuning": True,
            },
        },
        "toolkit": True,  # True
        "datasource": True,
        "discovery": False,
        "Session": True,
        "schedule": True,
        "contact": False,
        "group": False,
    },
}
