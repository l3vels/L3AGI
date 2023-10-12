import base64  # noqa: F401
import io  # noqa: F401
import json
import traceback
from io import BytesIO  # noqa: F401
from types import FunctionType
from typing import Dict

import matplotlib.pyplot as plt  # noqa: F401
import pandas as pd  # noqa: F401
from PIL import Image  # noqa: F401


def chart_generator_runner(code: str) -> Dict:
    try:
        # Compile the received Python code
        compiled_code = compile(code, "<string>", "exec")

        # Prepare a dictionary to store local variables after the execution
        local_vars = {}

        # Execute the code and store the output in local_vars
        exec(compiled_code, globals(), local_vars)

        # Find the first function in the executed code
        func = next(
            (v for v in local_vars.values() if isinstance(v, FunctionType)), None
        )

        # If a function was found, call it with the JSON params
        if func is not None:
            result = func()
            return {"statusCode": 200, "body": json.dumps({"result": result})}
        else:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "No function found in code"}),
            }

    except Exception as e:
        traceback.print_exc()
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}
