olga_configs = {
    "info": {"logo": "", "welcomeMessage": "Welcome to L3AGI"},
    "naming": {
        "home": "Home",
        "agent": "Agent",
        "team": "Team",
        "datasource": "Knowledge",
        "model": "Model",
        "discovery": "Discovery",
        "chat": "Agents",
        "toolkit": "Toolkit",
        "schedules": "Schedules",
        "integration": "Integration",
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
        "Session": False,
        "schedule": False,
        "contact": False,
        "group": False,
        "external-links": False,
    },
}
