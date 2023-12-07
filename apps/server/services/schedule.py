from datetime import datetime, timedelta
from typing import Dict, Optional

import arrow
from fastapi_sqlalchemy import db

from models.chat import ChatModel
from models.schedule import ScheduleModel
from services.chat import create_client_message, create_user_message
from typings.auth import UserAccount
from typings.chat import ChatInput, ChatMessageInput, ChatUserMessageInput
from typings.schedule import ScheduleRunInput, ScheduleStatus
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
    schedule_run_input: Optional[ScheduleRunInput] = None,
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

        if schedule_run_input:
            prompt = replace_nested_templates(
                prompt, schedule_run_input.system_message_params
            )

        #         prompt = prompt.replace(
        #             "{{chat_history}}",
        #             """
        # L3 Agent: Hello, Mirian, how have you been, my friend?
        # Mirian: Hello. I'm good. Can you a booking on cal dot com.
        # L3 Agent: Sure, Mirian!
        # L3 Agent: I've successfully booked a meeting for you on Cal.com
        # L3 Agent: You'll receive a confirmation email shortly.
        # L3 Agent: The meeting is scheduled for December 5th, from 2:00 PM to 3:00 PM, in Tbilisi time.
        # L3 Agent: Is there anything else I can assist you with?
        # Mirian: Yes please also send me an SMS and email after call.
        #         """,
        #         )

        #         prompt = prompt.replace("{{contact.phone}}", "+995595056022")
        #         prompt = prompt.replace("{{contact.email}}", "oqradzemirian@gmail.com")

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
