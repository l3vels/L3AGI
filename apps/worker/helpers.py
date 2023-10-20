import asyncio
import httpx
from config import Config


async def fetch_scheduled_runs():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{Config.SERVER_URL}/schedule/due")

    return res.json()


async def run_schedule(schedule_id: str):
    async with httpx.AsyncClient() as client:
        res = await client.post(f"{Config.SERVER_URL}/schedule/{schedule_id}/run")

    return res


async def execute_scheduled_runs():
    schedules_with_configs = await fetch_scheduled_runs()

    await asyncio.gather(
        *(
            run_schedule(schedule["schedule"]["id"])
            for schedule in schedules_with_configs
        )
    )
