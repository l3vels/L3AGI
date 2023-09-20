import json
import traceback
from types import FunctionType
from typing import Dict

import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image
import base64
import io
from io import BytesIO

def chart_generator_runner(code: str) -> Dict:
    try:
        # Compile the received Python code
        compiled_code = compile(code, '<string>', 'exec')

        # Prepare a dictionary to store local variables after the execution
        local_vars = {}

        # Execute the code and store the output in local_vars
        exec(compiled_code, globals(), local_vars)

        # Find the first function in the executed code
        func = next((v for v in local_vars.values() if isinstance(v, FunctionType)), None)

        # If a function was found, call it with the JSON params
        if func is not None:
            result = func()
            return {'statusCode': 200, 'body': json.dumps({'result': result})}
        else:
            return {'statusCode': 400, 'body': json.dumps({'error': 'No function found in code'})}

    except Exception as e:
        traceback.print_exc()
        return {'statusCode': 500, 'body': json.dumps({'error': str(e)})}