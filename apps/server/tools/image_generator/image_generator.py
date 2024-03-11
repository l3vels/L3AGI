import os
from typing import Optional, Type

from langchain.callbacks.manager import CallbackManagerForToolRun
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.utilities.dalle_image_generator import DallEAPIWrapper
from openai import OpenAI
from pydantic import BaseModel, Field

from tools.base import BaseTool
from utils.model import get_llm

# from langchain_openai import OpenAI





class ImageGeneratorSchema(BaseModel):
    query: str = Field(
        ...,
        description="Generate images with ai",
    )


class ImageGeneratorTool(BaseTool):
    """Tool that generates images"""

    name = "Image generator"

    slug = "imageGenerator"

    description = "Generate images based on prompt"

    args_schema: Type[ImageGeneratorSchema] = ImageGeneratorSchema

    tool_id = "f4483d81-be9c-4153-a542-a128e881a8d5"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Generate images based on prompt"""
        # client = OpenAI(api_key=self.settings.openai_api_key)
        # response = client.images.generate(
        # model="dall-e-3",
        # prompt=query,
        # size="1024x1024",
        # quality="standard",
        # n=1,
        # )

        # image_url = response.data[0].url

        llm = get_llm(self.settings, self.agent_with_configs)
        prompt = PromptTemplate(
            input_variables=["image_desc"],
            template="Generate a detailed prompt to generate an image based on the following description: {image_desc}",
        )
        chain = LLMChain(llm=llm, prompt=prompt)

        image_url = DallEAPIWrapper(api_key=self.settings.openai_api_key).run(
            chain.run(query)
        )

        return image_url
