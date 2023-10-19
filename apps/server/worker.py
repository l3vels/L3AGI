from datetime import timedelta

from celery import Celery

from config import Config
from models import *  # noqa: F403
from services.schedule import run_scheduled_agents

redis_url = "redis://localhost:6379"

app = Celery("l3agi", include=["worker"], imports=["worker"])

app.conf.broker_url = redis_url + "/0"
app.conf.result_backend = redis_url + "/0"
app.conf.worker_concurrency = 10
app.conf.accept_content = ["application/x-python-serialize", "application/json"]

CELERY_BEAT_SCHEDULE = {
    "run-scheduled-agents": {
        "task": "run-scheduled-agents",
        "schedule": timedelta(seconds=5),
    },
}


app.conf.beat_schedule = CELERY_BEAT_SCHEDULE


@app.task(
    name="run-scheduled-agents",
    autoretry_for=(Exception,),
    retry_backoff=2,
    max_retries=5,
)
def run_scheduled_agents_task():
    print("Running scheduled agents")

    print(run_scheduled_agents)

    # run_scheduled_agents()


if __name__ == "__main__":
    app.start()
