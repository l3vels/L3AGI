import asyncio
from datetime import timedelta

from celery import Celery

from config import Config
from helpers import execute_scheduled_runs

app = Celery("l3agi", include=["main"], imports=["main"])

app.conf.broker_url = Config.REDIS_URL
app.conf.result_backend = Config.REDIS_URL
app.conf.worker_concurrency = 10
app.conf.accept_content = ["application/x-python-serialize", "application/json"]

CELERY_BEAT_SCHEDULE = {
    "execute-scheduled-runs": {
        "task": "execute-scheduled-runs",
        "schedule": timedelta(minutes=2),
    },
}


app.conf.beat_schedule = CELERY_BEAT_SCHEDULE


@app.task(
    name="execute-scheduled-runs",
    autoretry_for=(Exception,),
    retry_backoff=2,
    max_retries=5,
)
def execute_scheduled_runs_task():
    print("Running scheduled agents")

    asyncio.run(execute_scheduled_runs())


if __name__ == "__main__":
    app.start()
