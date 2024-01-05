import os

from dotenv import load_dotenv

load_dotenv(override=False)


class Config:
    """Config class for the application."""

    REDIS_URL = os.environ.get("REDIS_URL")

    SERVER_URL = os.environ.get("SERVER_URL")

    PR_DEV_SERVER_URL = os.environ.get("PR_DEV_SERVER_URL")

    SERVER_AUTH_TOKEN = os.environ.get("SERVER_AUTH_TOKEN")
