from enum import Enum


class LLMProviders(Enum):
    OPEN_AI = "OpenAI"
    HUGGING_FACE = "Hugging Face"
    REPLICATE = "Replicate"

    def __str__(self) -> str:
        return self.value
