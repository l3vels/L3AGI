import time
from datetime import date, datetime, timedelta

import pytz
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
    campaign_res = requests.get(
        f"{Config.PR_DEV_SERVER_URL}/v1/campaign/{campaign_id}",
        headers={
            "Authorization": Config.SERVER_AUTH_TOKEN,
            "Account-ID": account_id,
        },
    )

    campaign = campaign_res.json()
    retry_interval = campaign.get("retry_interval", 15)

    retry_interval_in_seconds = retry_interval * 60

    working_hours_start = datetime.strptime(
        campaign.get("working_hours_start"), "%H:%M"
    ).time()
    working_hours_end = datetime.strptime(
        campaign.get("working_hours_end"), "%H:%M"
    ).time()

    tz = pytz.timezone(campaign.get("timezone"))
    current_time = datetime.now(tz).time()

    # Check if current day is between Monday and Friday
    current_day = datetime.now(tz).weekday()

    if current_day >= 0 and current_day <= 4:  # 0 is Monday, 4 is Friday
        # Check if current time is within working hours
        if not working_hours_start <= current_time <= working_hours_end:
            # Retry the task when the working hours start
            current_datetime = datetime.combine(date.today(), current_time)
            working_hours_start_datetime = datetime.combine(
                date.today(), working_hours_start
            )
            countdown = (working_hours_start_datetime - current_datetime).seconds
            self.retry(countdown=countdown)
            return "Retrying in working hours"
    else:
        # Retry the task on next Monday
        seconds_until_next_monday = (7 - current_day) * 24 * 60 * 60
        self.retry(countdown=seconds_until_next_monday)
        return "Retrying on next Monday"

    # Start phone call
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
        return "Call attempts limit reached. Skipping this contact."

    chat_id = call_json.get("chat_id")

    # Checks for the status of the phone call to make sure phone call is finished
    FORTY_FIVE_MINUTES_IN_SECONDS = 2700

    start_time = time.time()

    while True:
        # Just in case loop stuck for some reason
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

        if status is not None:
            if status in ["Busy", "No Answer", "Failed"]:
                self.retry(countdown=retry_interval_in_seconds)
            else:
                break

        time.sleep(10)

    return f"Phone call finished with status {status}"


if __name__ == "__main__":
    app.start()
