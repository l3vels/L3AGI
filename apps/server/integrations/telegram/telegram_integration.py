from abc import ABC
from typing import List

from integrations.base import (BaseIntegration, IntegrationEnvKey,
                               IntegrationEnvKeyType)


class TelegramIntegration(BaseIntegration, ABC):
    name: str = "Telegram Bot"
    description: str = "Connect L3AGI chat with a Telegram bot for smooth communication between sessions."
    slug: str = "telegram"

    id = "2c2849ab-c74e-485c-9603-b8a18280c7b1"

    def get_env_keys(self) -> List[IntegrationEnvKey]:
        return [
            IntegrationEnvKey(
                label="Bot API Token Key",
                key="TELEGRAM_BOT_API_KEY",
                key_type=IntegrationEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            IntegrationEnvKey(
                label="Bot Username",
                key="TELEGRAM_BOT_USERNAME",
                key_type=IntegrationEnvKeyType.STRING,
                is_required=False,
                is_secret=False,
            ),
        ]
