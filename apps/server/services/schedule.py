from datetime import datetime, timedelta

import arrow
from fastapi_sqlalchemy import db
from sqlalchemy.orm import sessionmaker

from models.chat import ChatModel
from models.db import engine
from models.schedule import ScheduleModel
from services.chat import create_client_message
from typings.auth import UserAccount
from typings.chat import ChatInput, ChatMessageInput
from utils.schedule import convert_model_to_response


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


def run_scheduled_agents():
    Session = sessionmaker(bind=engine)
    session = Session()

    schedules = ScheduleModel.get_due_schedules(session)

    for schedule in schedules:
        run_schedule(session, schedule)


def run_schedule(
    session,
    schedule: ScheduleModel,
):
    schedule_with_configs = convert_model_to_response(schedule)
    configs = schedule_with_configs.configs

    user = schedule.creator
    account = schedule.account

    if configs.create_session_on_run:
        chat = ChatModel.create_chat(
            db,
            chat=ChatInput(
                name=f"{schedule.name} - {arrow.get(datetime.now()).format('DD MMM, YYYY, HH:mm')}",
                is_public=True,
                agent_id=configs.agent_id,
                team_id=None,
            ),
            user=user,
            account=account,
        )

    prompt = "Complete following tasks:\n"

    for task in configs.tasks:
        prompt += f"- {task}\n"

    create_client_message(
        body=ChatMessageInput(prompt=prompt, chat_id=chat.id),
        auth=UserAccount(user=user, account=account),
    )

    if schedule_with_configs.configs.is_recurring:
        interval_in_seconds = parse_interval_to_seconds(schedule.interval)

        schedule.next_run_date = schedule.next_run_date + timedelta(
            seconds=interval_in_seconds
        )

    session.commit()
