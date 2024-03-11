from abc import ABC
from typing import List

from tools.base import BaseTool, BaseToolkit, ToolEnvKey
from tools.image_generator.image_generator import ImageGeneratorTool


class ImageGeneratorToolkit(BaseToolkit, ABC):
    name: str = "Image generator Toolkit"
    description: str = "Toolkit containing tools for generating images"
    slug: str = "imageGenerator"
    toolkit_id = "74e51975-2b6d-4cd4-a105-be40fee2fec1"

    def get_tools(self) -> List[BaseTool]:
        return [ImageGeneratorTool()]

    def get_env_keys(self) -> List[ToolEnvKey]:
        return []
