import sentry_sdk
from openai import APITimeoutError as TimeoutError
from openai import AuthenticationError, RateLimitError

from exceptions import (InvalidLLMApiKeyException, PlannerEmptyTasksException,
                        SynthesizerException, ToolEnvKeyException,
                        ToolException, TranscriberException)


def handle_agent_error(err: Exception) -> str:
    if isinstance(err, RateLimitError):
        return "OpenAI reached it's rate limit, please check billing on OpenAI"
    elif isinstance(err, AuthenticationError):
        return "Your OpenAI API key is invalid. Please recheck it in [Settings](/integrations?setting=openai)"
    elif isinstance(err, TimeoutError):
        return "OpenAI timed out, please try again later"
    # elif isinstance(err, ServiceUnavailableError):
    #     return "OpenAI service is unavailable at the moment, please try again later"
    elif isinstance(err, ToolEnvKeyException):
        return str(err)
    elif isinstance(err, PlannerEmptyTasksException):
        return "There are no tasks to execute."
    elif isinstance(err, InvalidLLMApiKeyException):
        return str(err)
    elif isinstance(err, ToolException):
        return str(err)
    elif isinstance(err, TranscriberException):
        return str(err)
    elif isinstance(err, SynthesizerException):
        return str(err)
    else:
        sentry_sdk.capture_exception(err)
        return str(err)
