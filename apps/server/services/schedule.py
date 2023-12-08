from datetime import datetime, timedelta
from typing import Dict

import arrow
from fastapi_sqlalchemy import db

from models.chat import ChatModel
from models.schedule import ScheduleModel
from services.chat import create_client_message, create_user_message
from typings.auth import UserAccount
from typings.chat import ChatInput, ChatMessageInput, ChatUserMessageInput
from typings.schedule import ScheduleStatus
from utils.schedule import convert_model_to_response


def replace_nested_templates(prompt: str, params: Dict, prefix=""):
    for key, value in params.items():
        if isinstance(value, dict):
            prompt = replace_nested_templates(prompt, value, f"{prefix}{key}.")
        else:
            prompt = prompt.replace(f"{{{{{prefix}{key}}}}}", str(value))
    return prompt


def parse_interval_to_seconds(interval: str) -> int:
    units = {
        "minutes": 60,
        "hours": 3600,
        "days": 86400,
        "weeks": 604800,
        "months": 2592000,
    }

    interval = " ".join(interval.split())
    value, unit = interval.split(" ")

    return int(value) * units[unit]


def execute_scheduled_run(
    session,
    schedule: ScheduleModel,
):
    schedule.status = ScheduleStatus.PROCESSING.value
    session.commit()

    try:
        schedule_with_configs = convert_model_to_response(schedule)
        configs = schedule_with_configs.configs

        user = schedule.creator
        account = schedule.account

        chat: ChatModel = None

        if configs.create_session_on_run:
            chat = ChatModel.create_chat(
                db,
                chat=ChatInput(
                    name=f"{schedule.name} - {arrow.get(datetime.now()).format('DD MMM, YYYY, HH:mm')}",
                    is_public=True,
                    agent_id=configs.agent_id,
                    team_id=configs.team_id,
                ),
                user=user,
                account=account,
            )

        prompt = ""

        for task in configs.tasks:
            prompt += f"- {task}\n"

        if chat:
            create_client_message(
                body=ChatMessageInput(prompt=prompt, chat_id=chat.id if chat else None),
                auth=UserAccount(user=user.to_dict(), account=account.to_dict()),
            )
        else:
            create_user_message(
                body=ChatUserMessageInput(
                    prompt=prompt, agent_id=configs.agent_id, team_id=configs.team_id
                ),
                auth=UserAccount(user=user.to_dict(), account=account.to_dict()),
            )

        # Check if the schedule is recurring and the end date is not exceeded
        if schedule_with_configs.configs.is_recurring:
            interval_in_seconds = parse_interval_to_seconds(schedule.interval)

            next_run_date = schedule.next_run_date + timedelta(
                seconds=interval_in_seconds
            )

            if next_run_date <= schedule.end_date:
                schedule.next_run_date = next_run_date
            else:
                schedule.next_run_date = None

        schedule.status = ScheduleStatus.PENDING.value
        session.commit()
    except Exception as err:
        schedule.status = ScheduleStatus.PENDING.value
        session.commit()
        raise err
