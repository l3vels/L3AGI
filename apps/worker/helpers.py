import requests
from config import Config


def fetch_scheduled_runs():
    schedules = requests.get(f"{Config.SERVER_URL}/schedule/due").json()
    return schedules


def run_schedule(schedule_id: str):
    res = requests.post(f"{Config.SERVER_URL}/schedule/{schedule_id}/run")
    return res


def execute_scheduled_runs():
    schedules = fetch_scheduled_runs()

    for schedule in schedules:
        # run_schedule(schedule.schedule.id)
        print(f"{schedule['schedule']['name']} is due to run.")
