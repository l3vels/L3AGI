import csv
import json
import shutil
from pathlib import Path
from typing import Dict
from uuid import UUID, uuid4

import openai
from openai import AuthenticationError
from sqlalchemy.orm import Session

from models.config import ConfigModel
from models.fine_tuning import FineTuningModel
from services.aws_s3 import AWSS3Service
from typings.config import AccountSettings
from typings.fine_tuning import FineTuningStatus

OPENAI_TO_FINE_TUNING_STATUS = {
    "validating_files": FineTuningStatus.VALIDATING,
    "queued": FineTuningStatus.QUEUED,
    "running": FineTuningStatus.RUNNING,
    "succeeded": FineTuningStatus.COMPLETED,
    "failed": FineTuningStatus.FAILED,
}


def fine_tune_openai_model(
    fine_tuning_model_id: UUID, account_id: UUID, settings: AccountSettings
):
    from models.db import create_session

    session = create_session()

    fine_tuning_model = FineTuningModel.get_fine_tuning_by_id(
        session, fine_tuning_model_id, account_id
    )

    path = Path(f"tmp/fine-tuning/{uuid4()}")
    path.mkdir(parents=True, exist_ok=True)

    _, ext = fine_tuning_model.file_url.rsplit(".", 1)

    downloaded_file_path = path.joinpath(f"data.{ext}").resolve()
    jsonl_absolute_path = path.joinpath("data.jsonl").resolve()

    AWSS3Service.download_file(
        AWSS3Service.get_key_from_public_url(fine_tuning_model.file_url),
        downloaded_file_path,
    )

    try:
        # Convert CSV or JSON to JSONL Format for OpenAI
        convert_to_jsonl(downloaded_file_path, ext, jsonl_absolute_path)

        file = openai.File.create(
            api_key=settings.openai_api_key,
            file=open(jsonl_absolute_path, "rb"),
            purpose="fine-tune",
        )

        shutil.rmtree(path)

        fine_tuning_job = openai.FineTuningJob.create(
            api_key=settings.openai_api_key,
            training_file=file.id,
            model="gpt-3.5-turbo",
        )

        fine_tuning_model.openai_fine_tuning_id = fine_tuning_job.id
    except AuthenticationError:
        fine_tuning_model.error = "Invalid OpenAI API Key"
    except Exception as err:
        fine_tuning_model.error = str(err)

    session.commit()


def check_fine_tuning(session: Session, id: UUID):
    try:
        fine_tuning_model = FineTuningModel.get_fine_tuning_by_id(session, id)
        settings = ConfigModel.get_account_settings(
            session, fine_tuning_model.account_id
        )

        fine_tuning_job = openai.FineTuningJob.retrieve(
            id=fine_tuning_model.openai_fine_tuning_id,
            api_key=settings.openai_api_key,
        )

        job = openai.FineTuningJob.retrieve(
            api_key=settings.openai_api_key, id=fine_tuning_job.id
        )

        fine_tuning_model.status = OPENAI_TO_FINE_TUNING_STATUS[job.status].value

        if fine_tuning_model.status == FineTuningStatus.COMPLETED.value:
            fine_tuning_model.model_identifier = job.fine_tuned_model

        if job.error and job.error.error:
            fine_tuning_model.error = job.error.error
    except AuthenticationError:
        fine_tuning_model.error = "Invalid OpenAI API Key"
    except Exception as err:
        fine_tuning_model.error = str(err)

    session.commit()


def convert_message_to_openai_conversation_format(message: Dict):
    messages = [
        {
            "role": "system",
            "content": message["System"],
        },
        {
            "role": "user",
            "content": message["User"],
        },
        {
            "role": "assistant",
            "content": message["Assistant"],
        },
    ]
    return json.dumps({"messages": messages})


def convert_to_jsonl(filepath: Path, extension: str, jsonl_filepath: Path):
    with open(filepath, "r") as file:
        if extension == "json":
            data = json.load(file)
        elif extension == "csv":
            data = csv.DictReader(file)

        with open(jsonl_filepath, "w") as jsonl_file:
            for message in data:
                jsonl_file.write(
                    convert_message_to_openai_conversation_format(message) + "\n"
                )
