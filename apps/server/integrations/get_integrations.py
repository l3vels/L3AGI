from typing import List

from integrations.base import BaseIntegration
from integrations.telegram.telegram_integration import TelegramIntegration
from typings.integrations import IntegrationOutput

INTEGRATIONS: List[BaseIntegration] = [
    TelegramIntegration(),
]


COMING_SOON = [
    {
        "is_public": True,
        "is_active": False,
        "name": "WhatsApp",
        "description": "Connect L3AGI chat with WhatsApp for smooth communication between sessions.",
    },
    {
        "is_public": True,
        "is_active": False,
        "name": "Facebook Messenger",
        "description": "Connect L3AGI chat with Facebook's Messenger for smooth communication between sessions.",
    },
]


def get_all_integration_providers():
    """Return a list of all integrations."""
    result = []

    for integration in INTEGRATIONS:
        result.append(
            IntegrationOutput(
                id=integration.id,
                is_public=True,
                is_active=integration.is_active,
                name=integration.name,
                slug=integration.slug,
                description=integration.description,
                fields=[
                    {
                        "label": env_key.label,
                        "key": env_key.key,
                        "type": str(env_key.key_type),
                        "is_required": env_key.is_required,
                        "is_secret": env_key.is_secret,
                        "default_value": str(env_key.default_value)
                        if env_key.default_value is not None
                        else None,
                    }
                    for env_key in integration.get_env_keys()
                ],
                # tools=[
                #     {
                #         "tool_id": tool.tool_id,
                #         "name": tool.name,
                #         "description": tool.description,
                #     }
                #     for tool in voice.get_tools()
                # ],
            )
        )

    for integration in COMING_SOON:
        result.append(
            IntegrationOutput(
                id=None,  # Update this if COMING_SOON has an 'id' field
                is_public=integration["is_public"],
                is_active=integration["is_active"],
                name=integration["name"],
                description=integration["description"],
                fields=[],  # Update this if COMING_SOON has a 'fields' field
            )
        )

    return result
