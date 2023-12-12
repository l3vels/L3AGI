from typing import List

from typings.voice import VoiceOutput
from voices.azure.azure_voice import AzureVoice
from voices.base import BaseVoice
from voices.deepgram.deepgram_voice import DeepgramVoice
from voices.eleven_labs.eleven_labs_voice import ElevenLabsVoice
from voices.playht.play_ht_voice import PlayHTVoice

VOICES: List[BaseVoice] = [
    DeepgramVoice(),
    PlayHTVoice(),
    ElevenLabsVoice(),
    AzureVoice(),
]


COMING_SOON = [
    {
        "is_public": True,
        "is_active": False,
        "name": "Google",
        "description": "Convert text into natural-sounding speech and accurately transcribe speech into text using an API powered by the best of Google’s AI research and technology.",
    },
]


def get_all_voice_providers():
    """Return a list of all voice providers."""
    result = []

    for voice in VOICES:
        result.append(
            VoiceOutput(
                id=voice.id,
                is_public=True,
                is_active=voice.is_active,
                name=voice.name,
                slug=voice.slug,
                is_synthesizer=voice.is_synthesizer,
                is_transcriber=voice.is_transcriber,
                description=voice.description,
                fields=[
                    {
                        "label": env_key.label,
                        "key": env_key.key,
                        "type": str(env_key.key_type),
                        "is_required": env_key.is_required,
                        "is_secret": env_key.is_secret,
                        "default_value": str(env_key.default_value)
                        if env_key.default_value is not None
                        else None,
                    }
                    for env_key in voice.get_env_keys()
                ],
                # tools=[
                #     {
                #         "tool_id": tool.tool_id,
                #         "name": tool.name,
                #         "description": tool.description,
                #     }
                #     for tool in voice.get_tools()
                # ],
            )
        )

    # Convert COMING_SOON dictionaries to VoiceOutput objects
    for voice in COMING_SOON:
        result.append(
            VoiceOutput(
                id=None,  # Update this if COMING_SOON has an 'id' field
                is_public=voice["is_public"],
                is_active=voice["is_active"],
                name=voice["name"],
                description=voice["description"],
                fields=[],  # Update this if COMING_SOON has a 'fields' field
                # tools=[],  # Update this if COMING_SOON has a 'tools' field
            )
        )

    return result
