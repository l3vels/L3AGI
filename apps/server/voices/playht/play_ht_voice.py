from abc import ABC
from typing import List

from voices.base import BaseVoice, VoiceEnvKey, VoiceEnvKeyType


class PlayHTVoice(BaseVoice, ABC):
    name: str = "Play.HT"
    description: str = "Create ultra realistic Text to Speech (TTS) using PlayHT’s AI Voice Generator. Our Voice AI instantly converts text in to natural sounding humanlike voice performances across any language and accent."
    slug: str = "playht"
    is_synthesizer: bool = True
    is_transcriber: bool = False

    id = "142e60f5-2d46-4b1a-9054-0764e553eed6"

    def get_env_keys(self) -> List[VoiceEnvKey]:
        return [
            VoiceEnvKey(
                label="API key",
                key="PLAY_HT_API_KEY",
                key_type=VoiceEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            VoiceEnvKey(
                label="User ID",
                key="PLAY_HT_USER_ID",
                key_type=VoiceEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            VoiceEnvKey(
                label="Default Voice Id",
                key="DEFAULT_VOICE_ID",
                key_type=VoiceEnvKeyType.STRING,
                is_required=False,
                is_secret=False,
                default_value="larry",
            ),
            VoiceEnvKey(
                label="Sampling Rate",
                key="SAMPLING_RATE",
                key_type=VoiceEnvKeyType.INT,
                is_required=False,
                is_secret=False,
                default_value=8000,
            ),
            VoiceEnvKey(
                label="Audio Encoding",
                key="AUDIO_ENCODING",
                key_type=VoiceEnvKeyType.STRING,
                is_required=False,
                is_secret=False,
                default_value="mulaw",
            ),
        ]
