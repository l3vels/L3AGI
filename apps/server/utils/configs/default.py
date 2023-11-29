default_configs = {
    "info": {"logo": "", "welcomeMessage": "Welcome to L3AGI"},
    "naming": {
        "home": "Home",
        "agent": "Agent",
        "team": "Multi-Agent",
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
                "models": {
                    "operations": {
                        "create": True,
                        "list": True,
                        "edit": True,
                    }
                },
                "fine-tuning": {"operations": True},
            },
        },
        "toolkit": True,  # True
        "datasource": True,
        "discovery": True,
        "Session": False,
        "schedule": True,
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
                "telephony": True,
            },
        },
        "contact": False,
        "group": False,
        "external-links": True,
    },
}
