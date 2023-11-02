call_configs = {
    "info": {"logo": "", "welcomeMessage": "Welcome to L3AGI"},
    "naming": {
        "home": "Home",
        "agent": "Agent",
        "team": "Team",
        "datasource": "Data sources",
        "models": "Model",
        "discovery": "Discovery",
        "chat": "Agents",
        "toolkits": "Toolkit",
        "schedules": "Campaigns",
    },
    "modules": {
        "home": {
            "welcome_message": "Build Your Conversational Agents",
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
        "toolkit": True,  # True
        "datasource": False,
        "discovery": False,
        "Session": True,
        "schedule": True,
        "contact": True,
        "group": True,
    },
}
