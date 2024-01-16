from typing import Any, List, Optional

from fastapi_sqlalchemy import db
from twilio.rest import Client

from models.config import ConfigModel
from typings.agent import AgentWithConfigsOutput
from typings.auth import UserAccount
from typings.config import ConfigQueryParams


def find_config(configs: List[ConfigModel], key: str, default: Optional[Any] = None):
    for config in configs:
        if config.key == key:
            return config.value

    return default


def update_phone_number_webhook(
    auth: UserAccount,
    agent_with_configs: AgentWithConfigsOutput,
):
    phone_number_sid = agent_with_configs.configs.twilio_phone_number_sid

    if (
        phone_number_sid is None
        or phone_number_sid == ""
        or agent_with_configs.agent.agent_type != "voice"
    ):
        return

    configs = ConfigModel.get_configs(db, ConfigQueryParams(), auth.account)

    twilio_account_sid = find_config(configs, "TWILIO_ACCOUNT_SID")
    twilio_auth_token = find_config(configs, "TWILIO_AUTH_TOKEN")

    try:
        client = Client(twilio_account_sid, twilio_auth_token)

        # TODO base url from env
        client.incoming_phone_numbers(phone_number_sid).update(
            voice_url=f"https://api-pr-dev.l3agi.com/inbound/{str(auth.account.id)}/{str(agent_with_configs.agent.id)}",
        )
    except Exception as e:
        print(e)
