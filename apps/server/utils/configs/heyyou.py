heyyou_configs = {
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
        "welcome_message": "",
        "description": "",
    },
    "modules": {
        "home": {
            "submodules": {
                "team": False,
                "agent": True,
                "discovery": True,
            }
        },
        "chat": {
            "name": "",
            "active": True,
            "submodules": {
                "agent": True,
                "session": True,
            },
        },
        "model": True,
        # "toolkit": True,
        "datasource": True,
        "discovery": False,
        "Session": False,
        "Discovery": False,
        "schedule": True,
    },
}
