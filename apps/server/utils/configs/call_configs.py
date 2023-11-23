call_configs = {
    "info": {"logo": "", "welcomeMessage": "Welcome to L3AGI"},
    "naming": {
        "home": "Home",
        "agent": "Agent",
        "team": "Team",
        "datasource": "Data source",
        "models": "Model",
        "discovery": "Discovery",
        "chat": "Agents",
        "toolkits": "Toolkit",
    },
    "modules": {
        "home": {
            "welcome_message": "Build Your Conversational Agents",
            "submodules": {
                "team": True,
                "agent": True,
                "discovery": True,
            },
        },
        "chat": {
            "active": True,
            "label": "Multi-Agent",
            "submodules": {
                "team": True,
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
        "discovery": True,
        "Session": True,
        "schedule": True,
        "contact": True,
        "group": True,
    },
}
