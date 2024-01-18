from typing import Any, List, Optional
from uuid import UUID

from fastapi import HTTPException
from fastapi_sqlalchemy import db
from twilio.base.exceptions import TwilioRestException
from twilio.rest import Client

from models.agent import AgentModel
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


def check_if_phone_number_sid_exists_in_agent(
    auth: UserAccount,
    twilio_phone_number_sid: str,
    agent_id: Optional[UUID] = None,
):
    if twilio_phone_number_sid is None or twilio_phone_number_sid == "":
        return {"agent_name": None}

    query = db.session.query(AgentConfigModel)

    query = (
        query.filter(
            AgentConfigModel.key == "twilio_phone_number_sid",
            AgentConfigModel.value == twilio_phone_number_sid,
        )
        .join(AgentModel)
        .filter(
            AgentModel.account_id == auth.account.id, AgentModel.is_deleted.is_(False)
        )
    )
    if agent_id:
        query = query.filter(AgentConfigModel.agent_id != agent_id)

    phone_number_sid_exists = query.first()

    if phone_number_sid_exists:
        return {
            "agent_name": phone_number_sid_exists.agent.name,
        }

    return {"agent_name": None}


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

    models = (
        db.session.query(AgentConfigModel)
        .join(AgentModel)
        .filter(
            AgentConfigModel.key == "twilio_phone_number_sid",
            AgentConfigModel.agent_id != agent_with_configs.agent.id,
            AgentModel.account_id == auth.account.id,
        )
        .all()
    )

    for model in models:
        model.value = ""
        db.session.add(model)

    db.session.commit()

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
