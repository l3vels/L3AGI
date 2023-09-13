from typing import Tuple
import sentry_sdk
from openai.error import RateLimitError, AuthenticationError, Timeout as TimeoutError, ServiceUnavailableError
from exceptions import ToolEnvKeyException, PlannerEmptyTasksException

def handle_agent_errors(agent, prompt) -> Tuple[str, bool]:
    res: str

    is_success: bool = False

    try:
        res = agent.run(prompt)
        is_success = True
    except RateLimitError:
        res = "OpenAI reached it's rate limit, please check billing on OpenAI"
    except AuthenticationError:
        res = "Your OpenAI API key is invalid. Please recheck it in [Settings](/settings)"
    except TimeoutError:
        res = "OpenAI timed out, please try again later"
    except ServiceUnavailableError:
        res = "OpenAI service is unavailable at the moment, please try again later"
    except ToolEnvKeyException:
        res = str(err)
    except PlannerEmptyTasksException:
        res = "There are no tasks to execute."
    except Exception as err:
        sentry_sdk.capture_exception(err)
        res = f"{err}"

    return res, is_success