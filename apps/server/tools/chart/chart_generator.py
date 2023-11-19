import base64
import io
import json
import uuid
from typing import Optional, Type

import sentry_sdk
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field

from services.aws_s3 import AWSS3Service
from tools.base import BaseTool
from tools.chart.chart_generator_helper import (extract_code,
                                                generate_chart_code_chain)
from tools.chart.chart_generator_runner import chart_generator_runner


class ChartGeneratorSchema(BaseModel):
    query: str = Field(
        description=(
            "Parameter is JSON string representing action input.\n"
            '"data" Python List or Dictionary which was you got by calling report tool. data is used for pandas DataFrame\n'
            '"user_prompt" str, which is objective in natural language provided by user\n'
        )
    )


class ChartGeneratorTool(BaseTool):
    """Tool that generates charts."""

    name = "Chart Generator"

    slug = "chartGenerator"

    description = (
        "generates chart and returns image URL\n"
        "Parameter is JSON string representing action input.\n"
        '"data" Python List or Dictionary which was you got by calling report tool. data is used for pandas DataFrame\n'
        '"user_prompt" str, objective in English natural language provided by user\n'
        "Make sure to include `data` and `user_prompt` in your JSON string and nothing else\n"
    )

    args_schema: Type[ChartGeneratorSchema] = ChartGeneratorSchema

    tool_id = "6b8a6a42-407f-4127-b22f-a4bf5a27b3df"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Generate chart and return image URL"""

        try:
            action = json.loads(query)

            chain = generate_chart_code_chain(self.settings, self.agent_with_configs)
            code = chain.run(data=action)
            code = extract_code(code)

            res = chart_generator_runner(code)

            status_code = res["statusCode"]

            if status_code == 200:
                body = json.loads(res["body"])
                base64_image = body["result"]

                chart_id = uuid.uuid4()

                key = f"account_{self.account.id}/chat/chart-{chart_id}.png"
                img_data = io.BytesIO(base64.b64decode(base64_image))

                url = AWSS3Service.upload(
                    body=img_data, key=key, content_type="image/png"
                )
                return url
            else:
                return "Could not generate chart"
        except Exception as e:
            sentry_sdk.capture_exception(e)
            return "Could not generate chart"
