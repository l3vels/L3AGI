default_configs = {
    "info": {
        "logo": '',
        "welcomeMessage": "Welcome to L3AGI"
    },
    "naming": {
        "home": 'Home',
        "agent": "Agent",
        "team": "Team",
        "datasource": "Data sources",
        "models": "Models",
        "discovery": "Discovery",
        "chat": "Multi-Agent",
        "toolkits": "Toolkits",
        "schedules": "Schedules",
        "integrations": "Integrations"
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
                        "delete": True
                    }
                },
                "agent": True,
                "discovery": True,
            }
        },
        "chat" :{
            "active": True,
            "label": "Multi-Agent",
            "submodules": {
                "team": {
                    "operations": {
                        "create": True,
                        "list": True,
                        "edit": True
                    }
                },
                "agent": True,
                "session": True
            }
        },
        "model" : {
            "active" : True,
            "label": "Models",
            "submodules": {
                "models": {
                    "operations": {
                        "create": True,
                        "list": True,
                        "edit": True,
                    }
                },
                "fine-tuning": {
                    "operations": True
                }
            }
        },
        "toolkit": True, #True
        "datasource": True,
        "discovery": True,
        "Session": False,
        "schedule": False,
        "integration" : {
            "active" : True,
            "label": "Integrations",
            "submodules": {
                "toolkit": {
                    "operations": {
                        "create": True,
                        "list": True,
                        "edit": True,
                    }
                },
                "voices": False,
                "telephony": False
            }
        },
    },
}

