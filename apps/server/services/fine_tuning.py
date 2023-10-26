import shutil
import time
from pathlib import Path
from uuid import uuid4

import openai

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
    fine_tuning_model: FineTuningModel, settings: AccountSettings
):
    path = Path(f"tmp/fine-tuning/{uuid4()}")
    path.mkdir(parents=True, exist_ok=True)
    name = "data.jsonl"

    absolute_path = path.joinpath(name).resolve()

    AWSS3Service.download_file(
        AWSS3Service.get_key_from_public_url(fine_tuning_model.file_url), absolute_path
    )

    file = openai.File.create(
        api_key=settings.openai_api_key,
        file=open(absolute_path, "rb"),
        purpose="fine-tune",
    )

    shutil.rmtree(path)

    fine_tuning_job = openai.FineTuningJob.create(
        api_key=settings.openai_api_key,
        training_file=file.id,
        model="gpt-3.5-turbo",
    )

    fine_tuning_model.openai_fine_tuning_id = fine_tuning_job.id

    def retrieve_job():
        from sqlalchemy.orm import Session

        from models.db import engine

        session = Session(bind=engine)

        job = openai.FineTuningJob.retrieve(
            api_key=settings.openai_api_key, id=fine_tuning_job.id
        )

        fine_tuning = FineTuningModel.get_fine_tuning_by_id(
            session, fine_tuning_model.id, fine_tuning_model.account_id
        )

        fine_tuning.status = OPENAI_TO_FINE_TUNING_STATUS[job.status].value

        is_finished = False

        if fine_tuning.status == FineTuningStatus.COMPLETED.value:
            fine_tuning.model_identifier = job.fine_tuned_model
            is_finished = True

        if job.error:
            fine_tuning.error = job.error
            is_finished = True

        session.add(fine_tuning)
        session.flush()
        session.commit()

        return is_finished

    while True:
        is_finished = retrieve_job()

        if is_finished:
            break

        time.sleep(60)
