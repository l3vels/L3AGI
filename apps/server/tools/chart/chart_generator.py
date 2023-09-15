from typing import Optional, Type, Dict
import json
import re
import uuid
import requests
import io
import base64
from pydantic import BaseModel, Field
from langchain.callbacks.manager import (
    CallbackManagerForToolRun,
)
from tools.base import BaseTool
from tools.chart.chart_generator_runner import chart_generator_runner
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from services.aws_s3 import AWSS3Service


class ChartGeneratorSchema(BaseModel):
    query: str = Field(
        description=(
            "Parameter is JSON string representing action input.\n"
            "\"data\" Python List or Dictionary which was you got by calling report tool. data is used for pandas DataFrame\n"
            "\"user_prompt\" str, which is objective in natural language provided by user\n"
        )
    )

class ChartGeneratorTool(BaseTool):
    """Tool that generates charts."""

    name = "Chart Generator"
    
    description = (
        "generates chart and returns image URL\n"
        "Parameter is JSON string representing action input.\n"
        "\"data\" Python List or Dictionary which was you got by calling report tool. data is used for pandas DataFrame\n"
        "\"user_prompt\" str, which is objective in natural language provided by user\n"
    )

    args_schema: Type[ChartGeneratorSchema] = ChartGeneratorSchema

    tool_id = "6b8a6a42-407f-4127-b22f-a4bf5a27b3df"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Generate chart and return image URL"""
        print(query)

        try:
            action = json.loads(query)
            data = json.dumps(action["data"])
            user_prompt = action["user_prompt"]

            chain = generate_chart_code_chain(self.settings.openai_api_key)
            code = chain.run(user_prompt=user_prompt, data=data)
            code = extract_code(code)

            res = chart_generator_runner(
                {

                    "code": code,
                    "params": data,
                },
                None,
            )

            status_code = res["statusCode"]

            if status_code == 200:
                body = json.loads(res["body"])
                base64_image = body["result"]

                chart_id = uuid.uuid4()
                
                key = f"account_{self.account.id}/chat/chart-{chart_id}.png"
                img_data = io.BytesIO(base64.b64decode(base64_image))

                url = AWSS3Service.upload(body=img_data, key=key, content_type='image/png')
                return url
            else:
                return "Error generating chart code"
        except Exception as e:
            print(e)
            # sentry_sdk.capture_exception(e)
            return "Could not generate chart"


TEMPLATE = """
User wants to visualize "{user_prompt}". JSON data is "{data}".
Based on user prompt and JSON data, write Python code in a triple backtick Markdown code block

Notes:
- JSON data is string JSON. pandas can read it with pd.read_json
- First, think step by step what you want to do and write it down in English.
- Then generate valid Python code in a code block
- Make sure all code is valid
- it be run in a Jupyter Python 3 kernel environment.
- Define every variable before you use it.
- For data munging, you can use
    'numpy', # numpy==1.24.3
    'dateparser' #dateparser==1.1.8
    'pandas', # matplotlib==1.5.3
    'geopandas' # geopandas==0.13.2
    - For pdf extraction, 
- For pdf extraction, you can use
    'PyPDF2', # PyPDF2==3.0.1
    'pdfminer', # pdfminer==20191125
    'pdfplumber', # pdfplumber==0.9.0
- For data visualization, you can use
        'matplotlib', # matplotlib==3.7.1
    - Be sure to generate charts with matplotlib. If you need geographical charts, use geopandas with the geopandas.datasets module. 
    - I'll give give you query result as method parameters.
    - Consider query result field types when you are doing data munging.
    - Method name must be "query_runner"
    - Method must return a response Image as base64 encoded string
    - Try background of image as transparent it's possible.

1. Please output only code
2. Please do not use any other external packages to avoid ModuleNotFoundError.
"""


def generate_chart_code_chain(openai_api_key: str) -> LLMChain:
    """Generate code for chart generation."""
    llm = ChatOpenAI(openai_api_key=openai_api_key,temperature=0, model_name="gpt-4")
    prompt = PromptTemplate(input_variables=["data", "user_prompt"], template=TEMPLATE)
    return LLMChain(llm=llm, prompt=prompt)


def extract_code(text: str):
    # Match triple backtick blocks first
    triple_match = re.search(r"```(?:\w+\n)?(.+?)```", text, re.DOTALL)
    if triple_match:
        return triple_match.group(1).strip()
    else:
        # If no triple backtick blocks, match single backtick blocks
        single_match = re.search(r"`(.+?)`", text, re.DOTALL)
        if single_match:
            return single_match.group(1).strip()
    # If no code blocks found, return original text
    return text