from typings.schedule import ScheduleWithConfigsOutput, ScheduleConfigInput
from models.chat import ChatModel
from typings.chat import ChatInput, ChatMessageInput
from fastapi_sqlalchemy import db
from typings.auth import UserAccount
from services.chat import create_client_message


def run_schedule(schedule_with_configs: ScheduleWithConfigsOutput, auth: UserAccount):
    schedule = schedule_with_configs.schedule
    configs = schedule_with_configs.configs

    if configs.create_session_on_run:
        # create session
        chat = ChatModel.create_chat(
            db,
            chat=ChatInput(
                name="Test session",
                is_public=True,
                agent_id=configs.agent_id,
                team_id=None,
            ),
            user=auth.user,
            account=auth.account,
        )

    prompt = "Complete following tasks:\n"

    for task in configs.tasks:
        prompt += f"{task}\n"

    create_client_message(
        body=ChatMessageInput(prompt=prompt, chat_id=chat.id), auth=auth
    )

    print("processed chat")
