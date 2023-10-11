import sentry_sdk
from openai.error import (
    RateLimitError,
    AuthenticationError,
    Timeout as TimeoutError,
    ServiceUnavailableError,
)
from exceptions import ToolEnvKeyException, PlannerEmptyTasksException


def handle_agent_error(err: Exception) -> str:
    if isinstance(err, RateLimitError):
        return "OpenAI reached it's rate limit, please check billing on OpenAI"
    elif isinstance(err, AuthenticationError):
        return (
            "Your OpenAI API key is invalid. Please recheck it in [Settings](/settings)"
        )
    elif isinstance(err, TimeoutError):
        return "OpenAI timed out, please try again later"
    elif isinstance(err, ServiceUnavailableError):
        return "OpenAI service is unavailable at the moment, please try again later"
    elif isinstance(err, ToolEnvKeyException):
        return str(err)
    elif isinstance(err, PlannerEmptyTasksException):
        return "There are no tasks to execute."
    else:
        sentry_sdk.capture_exception(err)
        return f"{err}"
