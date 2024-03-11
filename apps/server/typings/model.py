from enum import Enum
from typing import Optional

from pydantic import BaseModel


class ModelProviders(Enum):
    OPEN_AI = "OpenAI"
    HUGGING_FACE = "Hugging Face"
    REPLICATE = "Replicate"
    CLAUDE = "Claude"

    def __str__(self) -> str:
        return self.value


class ModelOutput(BaseModel):
    id: str
    provider: ModelProviders
    name: str
    value: Optional[str]
    fine_tuning: bool
    is_fine_tuned: Optional[bool]
    is_voice: Optional[bool]
