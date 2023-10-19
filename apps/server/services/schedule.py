from datetime import datetime

import arrow
from croniter import croniter
from fastapi_sqlalchemy import db
from sqlalchemy.orm import sessionmaker

from models.chat import ChatModel
from models.db import engine
from models.schedule import ScheduleModel
from services.chat import create_client_message
from typings.auth import UserAccount
from typings.chat import ChatInput, ChatMessageInput
from typings.schedule import ScheduleConfigInput, ScheduleWithConfigsOutput
from utils.schedule import convert_schedules_to_schedule_list

Session = sessionmaker(bind=engine)
session = Session()


def run_scheduled_agents():
    schedules = ScheduleModel.get_due_schedules(session)
    schedules_with_configs = convert_schedules_to_schedule_list(schedules)

    for schedule in schedules:
        iter = croniter(schedule.cron_expression, datetime.now())
        next_run = iter.get_next(datetime)
        schedule.next_run_time = next_run

    session.commit()

    for schedule_with_config in schedules_with_configs:
        run_schedule(schedule_with_config)


def run_schedule(schedule_with_configs: ScheduleWithConfigsOutput, auth: UserAccount):
    schedule = schedule_with_configs.schedule
    configs = schedule_with_configs.configs

    if configs.create_session_on_run:
        chat = ChatModel.create_chat(
            db,
            chat=ChatInput(
                name=f"{schedule.name} - {arrow.get(datetime.now()).format('DD MMM, YYYY, HH:mm')}",
                is_public=True,
                agent_id=configs.agent_id,
                team_id=None,
            ),
            user=auth.user,
            account=auth.account,
        )

    prompt = "Complete following tasks:\n"

    for task in configs.tasks:
        prompt += f"- {task}\n"

    create_client_message(
        body=ChatMessageInput(prompt=prompt, chat_id=chat.id), auth=auth
    )
