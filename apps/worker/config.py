import os
from dotenv import load_dotenv

load_dotenv(override=False)


class Config:
    """Config class for the application."""

    ENV = os.environ.get("ENV")

    SERVER_URL = os.environ.get("SERVER_URL")

    SENTRY_DSN = os.environ.get("SENTRY_DSN")
