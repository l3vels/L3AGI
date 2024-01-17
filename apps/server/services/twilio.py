from typing import Any, List, Optional

from fastapi import HTTPException
from fastapi_sqlalchemy import db
from twilio.base.exceptions import TwilioRestException
from twilio.rest import Client

from models.agent_config import AgentConfigModel
from models.config import ConfigModel
from typings.agent import AgentType, AgentWithConfigsOutput
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
        or agent_with_configs.agent.agent_type != AgentType.INBOUND.value
    ):
        return

    configs = ConfigModel.get_configs(db, ConfigQueryParams(), auth.account)

    twilio_account_sid = find_config(configs, "TWILIO_ACCOUNT_SID")
    twilio_auth_token = find_config(configs, "TWILIO_AUTH_TOKEN")

    if (
        twilio_account_sid is None
        or twilio_account_sid == ""
        or twilio_auth_token is None
        or twilio_auth_token == ""
    ):
        raise HTTPException(
            status_code=400,
            detail="Fill Twilio credentials to update phone number webhook",
        )

    phone_number_sid_exists = AgentConfigModel.get_config_by_key(
        db.session, "twilio_phone_number_sid", auth.account.id
    )

    if phone_number_sid_exists:
        raise HTTPException(
            status_code=400,
            detail=f"Phone number SID is already used by {phone_number_sid_exists.agent.name}",
        )

    try:
        client = Client(twilio_account_sid, twilio_auth_token)

        # TODO base url from env
        client.incoming_phone_numbers(phone_number_sid).update(
            voice_url=f"https://api-pr-dev.l3agi.com/inbound/{str(auth.account.id)}/{str(agent_with_configs.agent.id)}",
        )
    except TwilioRestException as e:
        message = e.msg

        if "Unable to update record" in e.msg:
            message = "Twilio Phone number SID Is Invalid"

        raise HTTPException(status_code=400, detail=message)
