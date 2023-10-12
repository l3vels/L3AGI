from enum import Enum

from pydantic import BaseModel


class ModelProviders(Enum):
    OPEN_AI = "OpenAI"
    HUGGING_FACE = "Hugging Face"
    REPLICATE = "Replicate"

    def __str__(self) -> str:
        return self.value


class ModelOutput(BaseModel):
    id: str
    provider: ModelProviders
    name: str
    value: str
