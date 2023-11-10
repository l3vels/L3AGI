from abc import ABC
from typing import List

from voices.base import BaseVoice, VoiceEnvKey, VoiceEnvKeyType


class DeepgramVoice(BaseVoice, ABC):
    name: str = "Deepgram"
    description: str = "Power your apps with world-class speech-to-text and domain-specific language models (DSLMs). Effortlessly accurate. Blazing fast. Enterprise-ready scale. Unbeatable pricing. Everything developers need to build with confidence and ship faster."
    slug: str = "deepgram"
    is_synthesizer: bool = False
    is_transcriber: bool = True

    id = "b44769b1-1a20-44d3-b0f1-8b4c96e6a02a"

    def get_env_keys(self) -> List[VoiceEnvKey]:
        return [
            VoiceEnvKey(
                label="API key",
                key="DEEPGRAM_API_KEY",
                key_type=VoiceEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            )
        ]
