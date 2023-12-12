from abc import ABC
from typing import List

from voices.base import BaseVoice, VoiceEnvKey, VoiceEnvKeyType


class ElevenLabsVoice(BaseVoice, ABC):
    name: str = "ElevenLabs"
    description: str = "Explore the most advanced text to speech and voice cloning software ever. Create lifelike voiceovers for your content or use our AI voice generator as an easy-to-use text reader."
    slug: str = "elevenlabs"
    is_synthesizer: bool = True
    is_transcriber: bool = False

    is_active: bool = True

    id = "509fd791-578f-40be-971f-c6753957c307"

    def get_env_keys(self) -> List[VoiceEnvKey]:
        return [
            VoiceEnvKey(
                label="API key",
                key="ELEVEN_LABS_API_KEY",
                key_type=VoiceEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
        ]
