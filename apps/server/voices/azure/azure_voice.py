from abc import ABC
from typing import List

from voices.base import BaseVoice, VoiceEnvKey, VoiceEnvKeyType


class AzureVoice(BaseVoice, ABC):
    name: str = "Azure"
    description: str = "Harness the power of Azure's robust voice services to enable seamless voice interactions in your applications and devices."
    slug: str = "azure"
    is_synthesizer: bool = True
    is_transcriber: bool = True

    is_active: bool = True

    id = "dc872426-a95c-4c41-83a2-5e5ed43670cd"

    def get_env_keys(self) -> List[VoiceEnvKey]:
        return [
            VoiceEnvKey(
                label="Speech Key",
                key="AZURE_SPEECH_KEY",
                key_type=VoiceEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            VoiceEnvKey(
                label="Speech Region",
                key="AZURE_SPEECH_REGION",
                key_type=VoiceEnvKeyType.STRING,
                is_required=True,
                is_secret=False,
            ),
        ]
