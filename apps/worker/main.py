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
        headers={"Authorization": Config.SERVER_AUTH_TOKEN},
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
        headers={"Authorization": Config.SERVER_AUTH_TOKEN},
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
        headers={"Authorization": Config.SERVER_AUTH_TOKEN},
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
        headers={"Authorization": Config.SERVER_AUTH_TOKEN},
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
        f"{Config.PR_DEV_SERVER_URL}/v1/campaign/due",
        headers={"Authorization": Config.SERVER_AUTH_TOKEN},
    )

    campaigns = res.json()

    campaign_ids = [campaign["id"] for campaign in campaigns]

    for campaign in campaigns:
        res = requests.post(
            f"{Config.PR_DEV_SERVER_URL}/v1/campaign/{campaign['id']}/start",
            headers={"Authorization": Config.SERVER_AUTH_TOKEN},
        )

        contact_ids = res.json()

        for contact_id in contact_ids:
            make_phone_call.apply_async(
                args=[campaign["id"], contact_id, campaign["account_id"]]
            )

    return campaign_ids


@app.task(
    name="make-phone-call",
    queue="phone_call_queue",
    bind=True,
)
def make_phone_call(self, campaign_id: str, contact_id: str, account_id: str):
    res = requests.post(
        f"{Config.PR_DEV_SERVER_URL}/call/campaign",
        headers={
            "Authorization": Config.SERVER_AUTH_TOKEN,
            "Content-Type": "application/json",
        },
        json={
            "campaign_id": campaign_id,
            "contact_id": contact_id,
        },
    )

    call_json = res.json()
    message = call_json.get("message")

    if "Call limit exceeded" in message:
        return "Already 2 calls are made. Skipping this contact."

    chat_id = call_json.get("chat_id")

    start_time = time.time()

    FORTY_FIVE_MINUTES_IN_SECONDS = 2700

    # Checks for the status of the phone call to make sure phone call is finished
    while True:
        if time.time() - start_time > FORTY_FIVE_MINUTES_IN_SECONDS:
            break

        status_res = requests.get(
            f"{Config.PR_DEV_SERVER_URL}/call/{chat_id}",
            headers={
                "Authorization": Config.SERVER_AUTH_TOKEN,
                "Account-ID": account_id,
            },
        )

        status = status_res.json().get("status")

        FIFTEEN_MINUTES_IN_SECONDS = 900

        if status is not None:
            if status == "Busy":
                self.retry(countdown=FIFTEEN_MINUTES_IN_SECONDS)
            else:
                break

        time.sleep(10)

    return f"Phone call finished with status {status}"


if __name__ == "__main__":
    app.start()
