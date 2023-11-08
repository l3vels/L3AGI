levanion_configs = {
    "info": {"logo": "", "welcomeMessage": "Welcome to L3AGI"},
    "naming": {
        "home": "Home",
        "agent": "Agent",
        "team": "Team",
        "datasource": "Data source",
        "models": "Model",
        "discovery": "Discovery",
        "chat": "Multi-Agent",
        "toolkits": "Toolkit",
        "schedules": "Schedule",
        "integrations": "Integration",
    },
    "modules": {
        "home": {
            "welcome_message": "Build your ",
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
            },
        },
        "chat": {
            "active": True,
            "label": "Multi-Agent",
            "submodules": {
                "team": {"operations": {"create": True, "list": True, "edit": True}},
                "agent": True,
                "session": True,
            },
        },
        "model": {
            "active": True,
            "label": "Models",
            "submodules": {
                "models": True,
                "fine-tuning": True,
            },
        },
        "integration": {
            "active": True,
            "label": "Integrations",
            "submodules": {
                "toolkit": {
                    "operations": {
                        "create": True,
                        "list": True,
                        "edit": True,
                    }
                },
                "voices": True,
                "telephony": False,
            },
        },
        "toolkit": True,  # True
        "datasource": True,
        "discovery": True,
        "Session": True,
        "schedule": True,
        "contact": True,
        "group": True,
        "external-links": True,
    },
}
