olga_configs = {
    "info": {"logo": "", "welcomeMessage": ""},
    "naming": {
        "home": "",
        "agent": "",
        "team": "",
        "datasource": "",
        "model": "",
        "discovery": "",
        "chat": "",
        "toolkit": "",
        "schedules": "",
        "integration": "",
    },
    "modules": {
        "home": {
            "welcome_message": "",
            "submodules": {
                "team": False,
                "agent": True,
                "discovery": True,
            },
        },
        "chat": {
            "active": True,
            "label": "",
            "submodules": {
                "team": False,
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
