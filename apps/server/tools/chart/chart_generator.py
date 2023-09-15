from typing import Optional, Type, Dict
import json
import re
from pydantic import BaseModel, Field
from langchain.callbacks.manager import (
    CallbackManagerForToolRun,
)
from tools.base import BaseTool
from tools.chart.chart_generator_runner import chart_generator_runner
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate


class ChartGeneratorSchema(BaseModel):
    query: str = Field(
        description="JSON string containing data, objective and other information. data is used in pandas DataFrame",
    )

class ChartGeneratorTool(BaseTool):
    """Tool that generates charts."""

    name = "Chart Generator"
    
    description = (
        "generates chart and returns image URL"
    )

    args_schema: Type[ChartGeneratorSchema] = ChartGeneratorSchema

    tool_id = "6b8a6a42-407f-4127-b22f-a4bf5a27b3df"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Generate chart and return image URL"""
        print(query)

        try:
            # action = json.loads(query)
            # json_data = json.dumps(action["json_data"])

            chain = generate_chart_code_chain(self.settings.openai_api_key)
            code = chain.run(data=query)
            code = extract_code(code)

            res = chart_generator_runner(
                {

                    "code": code,
                    "params": query,
                },
                None,
            )

            return "https://mathmonks.com/wp-content/uploads/2023/01/Parts-Bar-Graph.jpg"


            # status_code = res["statusCode"]

            # if status_code == 200:
            #     body = json.loads(res["body"])
            #     base64_image = body["result"]

            #     return "https://mathmonks.com/wp-content/uploads/2023/01/Parts-Bar-Graph.jpg"

            #     # upload file to s3 

            #     # result = self.api.file.generate_upload_url(
            #     #     file_name="chart.png",
            #     #     file_type="image/png",
            #     #     # game_id=game_id,
            #     #     location_field="chat",
            #     # )

            #     # img_data = io.BytesIO(base64.b64decode(base64_image))
            #     # requests.put(result["upload_url"], data=img_data)

            #     # return result["file_location"]
            # else:
            #     return "Error generating chart code"
        except Exception as e:
            # sentry_sdk.capture_exception(e)
            return "Could not generate chart"


TEMPLATE = """
Write Python code in a triple backtick Markdown code block to generate a chart based on the "data":

```
{data}
```

Notes:
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
    - Method will receive parameter "data".
    - Method must return a response Image as base64 encoded string
    - Try background of image as transparent it's possible.

1. Please output only code
2. Please do not use any other external packages to avoid ModuleNotFoundError.
"""


def generate_chart_code_chain(openai_api_key: str) -> LLMChain:
    """Generate code for chart generation."""
    llm = ChatOpenAI(openai_api_key=openai_api_key,temperature=0, model_name="gpt-4")
    prompt = PromptTemplate(input_variables=["data"], template=TEMPLATE)
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