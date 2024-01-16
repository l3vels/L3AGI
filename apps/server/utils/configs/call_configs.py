call_configs = {
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
    },
    "modules": {
        "home": {
            "welcome_message": "",
            "submodules": {
                "team": True,
                "agent": True,
                "discovery": True,
            },
        },
        "chat": {
            "active": True,
            "label": "",
            "submodules": {
                "team": True,
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
        "discovery": True,
        "session": True,
        "schedule": True,
        "contact": True,
        "group": True,
    },
}
