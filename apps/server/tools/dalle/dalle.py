import os
from typing import Optional, Type
from uuid import uuid4

import requests
from fastapi import HTTPException
from langchain.callbacks.manager import CallbackManagerForToolRun
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.utilities.dalle_image_generator import DallEAPIWrapper
from openai import OpenAI
from pydantic import BaseModel, Field

from services.aws_s3 import AWSS3Service
from tools.base import BaseTool
from utils.model import get_llm

# from langchain_openai import OpenAI


class DalleSchema(BaseModel):
    query: str = Field(
        ...,
        description="Generate images with ai",
    )


class DalleTool(BaseTool):
    """Tool that generates images"""

    name = "DALL-E"

    slug = "dalle"

    description = "Generate images based on prompt"

    args_schema: Type[DalleSchema] = DalleSchema

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
        try:
            llm = get_llm(self.settings, self.agent_with_configs)
            prompt = PromptTemplate(
                input_variables=["image_desc"],
                template="Generate a detailed prompt to generate an image based on the following description: {image_desc}",
            )
            chain = LLMChain(llm=llm, prompt=prompt)

            dalle_image_url = DallEAPIWrapper(api_key=self.settings.openai_api_key).run(
                chain.run(query)
            )

            image_url = get_final_image_url(
                image_url=dalle_image_url, account=self.account
            )

            return image_url

        except Exception as err:
            return str(err)


def get_final_image_url(image_url: str, account):
    response = requests.get(image_url, stream=True)
    if response.status_code == 200:
        content_type = response.headers["content-type"]
        image_body = response.content
        name = image_url.split("/")[-1] or f"image-{uuid4()}"

        if "." in name:
            name, ext = name.rsplit(".", 1)
        else:
            # Handle the case where there is no file extension
            # You might want to assign a default extension or raise an error
            ext = "png"

        key = f"account_{account.id}/files/dalle-{uuid4()}.{ext}"

        final_url = AWSS3Service.upload(
            key=key, content_type=content_type, body=image_body
        )

        return final_url
    else:
        raise HTTPException(status_code=400, detail="Could not retrieve image from URL")
