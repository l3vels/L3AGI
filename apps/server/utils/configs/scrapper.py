scrapper_configs = {
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
            }
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
        "model": False,
        "toolkit": True,
        "datasource": True,
        "discovery": False,
        "Session": False,
        "schedule": False,
    },
}
