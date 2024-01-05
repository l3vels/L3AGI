import time
from datetime import timedelta

import requests
from celery import Celery

from config import Config

app = Celery("l3agi", include=["main"], imports=["main"])

app.conf.broker_url = Config.REDIS_URL
app.conf.result_backend = Config.REDIS_URL
app.conf.worker_concurrency = 10
app.conf.accept_content = ["application/x-python-serialize", "application/json"]

CELERY_BEAT_SCHEDULE = {
    "register-scheduled-run-tasks": {
        "task": "register-scheduled-run-tasks",
        "schedule": timedelta(minutes=2),
    },
    "register-fine-tuning-tasks": {
        "task": "register-fine-tuning-tasks",
        "schedule": timedelta(minutes=2),
    },
    "register-campaign-phone-call-tasks": {
        "task": "register-campaign-phone-call-tasks",
        "schedule": timedelta(minutes=2),
    },
}


app.conf.beat_schedule = CELERY_BEAT_SCHEDULE


@app.task(
    name="register-scheduled-run-tasks",
    autoretry_for=(Exception,),
    retry_backoff=2,
    max_retries=5,
)
def execute_scheduled_runs_task():
    res = requests.get(
        f"{Config.SERVER_URL}/schedule/due",
        headers={"Authorization": f"Bearer {Config.SERVER_AUTH_TOKEN}"},
    )

    schedules_with_configs = res.json()

    for schedule in schedules_with_configs:
        execute_single_schedule_task.apply_async(args=[schedule["schedule"]["id"]])

    schedule_ids = [schedule["schedule"]["id"] for schedule in schedules_with_configs]
    return schedule_ids


@app.task(
    name="execute-single-schedule",
    autoretry_for=(Exception,),
    retry_backoff=2,
    max_retries=5,
)
def execute_single_schedule_task(schedule_id: str):
    res = requests.post(
        f"{Config.SERVER_URL}/schedule/{schedule_id}/run",
        headers={"Authorization": f"Bearer {Config.SERVER_AUTH_TOKEN}"},
    )
    return res.json()


@app.task(
    name="register-fine-tuning-tasks",
    autoretry_for=(Exception,),
    retry_backoff=2,
    max_retries=5,
)
def register_fine_tunings_task():
    res = requests.get(
        f"{Config.SERVER_URL}/fine-tuning/pending",
        headers={"Authorization": f"Bearer {Config.SERVER_AUTH_TOKEN}"},
    )

    fine_tunings = res.json()

    for fine_tuning in fine_tunings:
        check_single_fine_tuning_task.apply_async(args=[fine_tuning["id"]])

    fine_tuning_ids = [fine_tuning["id"] for fine_tuning in fine_tunings]
    return fine_tuning_ids


@app.task(
    name="check-single-fine-tuning",
    autoretry_for=(Exception,),
    retry_backoff=2,
    max_retries=5,
)
def check_single_fine_tuning_task(fine_tuning_id: str):
    res = requests.post(
        f"{Config.SERVER_URL}/fine-tuning/{fine_tuning_id}/check",
        headers={"Authorization": f"Bearer {Config.SERVER_AUTH_TOKEN}"},
    )

    return res.json()


@app.task(
    name="register-campaign-phone-call-tasks",
    autoretry_for=(Exception,),
    retry_backoff=2,
    max_retries=5,
)
def register_campaign_phone_call_tasks():
    res = requests.get(
        f"{Config.PR_DEV_SERVER_URL}/campaign/due",
        headers={"Authorization": f"Bearer {Config.SERVER_AUTH_TOKEN}"},
    )

    campaigns = res.json()
    campaign_ids = [campaign["id"] for campaign in campaigns]

    for campaign in campaigns:
        res = requests.post(
            f"{Config.PR_DEV_SERVER_URL}/campaign/{campaign['id']}/start",
            headers={"Authorization": f"Bearer {Config.SERVER_AUTH_TOKEN}"},
        )

        contact_ids = res.json()

        for contact_id in contact_ids:
            make_phone_call.apply_async(args=[campaign["id"], contact_id])

    return campaign_ids


@app.task(
    name="make-phone-call",
    autoretry_for=(Exception,),
    retry_backoff=2,
    max_retries=5,
)
def make_phone_call(campaign_id: str, contact_id: str):
    res = requests.post(
        f"{Config.PR_DEV_SERVER_URL}/call/campaign",
        headers={"Authorization": f"Bearer {Config.SERVER_AUTH_TOKEN}"},
        data={
            "campaign_id": campaign_id,
            "contact_id": contact_id,
        },
    )

    call_id = res.json().get("call_id")

    # Checks for the status of the phone call to make sure phone call is finished
    while True:
        status_res = requests.get(
            f"{Config.PR_DEV_SERVER_URL}/call/{call_id}",
            headers={"Authorization": f"Bearer {Config.SERVER_AUTH_TOKEN}"},
        )

        status = status_res.json().get("status")

        if status is not None:
            break

        time.sleep(15)

    return "Phone call finished"


if __name__ == "__main__":
    app.start()
