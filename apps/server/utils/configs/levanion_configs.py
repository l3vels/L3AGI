levanion_configs = {
    "info": {"logo": "", "welcomeMessage": ""},
    "naming": {
        "home": "",
        "agent": "",
        "team": "",
        "datasource": "",
        "models": "",
        "discovery": "",
        "chat": "",
        "toolkits": "",
        "schedules": "",
        "integrations": "",
    },
    "modules": {
        "home": {
            "welcome_message": "",
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
            "label": "",
            "submodules": {
                "team": {"operations": {"create": True, "list": True, "edit": True}},
                "agent": True,
                "session": True,
            },
        },
        "model": {
            "active": True,
            "label": "",
            "submodules": {
                "models": True,
                "fine-tuning": True,
            },
        },
        "integration": {
            "active": True,
            "label": "",
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
