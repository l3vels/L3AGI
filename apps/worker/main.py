from datetime import timedelta

from celery import Celery

# from config import Config  # noqa: F401
from helpers import execute_scheduled_runs

redis_url = "redis://localhost:6379"

app = Celery("l3agi", include=["main"], imports=["main"])

app.conf.broker_url = redis_url + "/0"
app.conf.result_backend = redis_url + "/0"
app.conf.worker_concurrency = 10
app.conf.accept_content = ["application/x-python-serialize", "application/json"]

CELERY_BEAT_SCHEDULE = {
    "execute-scheduled-runs": {
        "task": "execute-scheduled-runs",
        "schedule": timedelta(minutes=1),
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

    execute_scheduled_runs()


if __name__ == "__main__":
    app.start()
