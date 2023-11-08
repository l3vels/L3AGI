import asyncio
import base64
import io
import os
import uuid
from logging import log

import requests
from deepgram import Deepgram
from dotenv import load_dotenv

from services.aws_s3 import AWSS3Service
from typings.agent import ConfigsOutput
from typings.config import AccountVoiceSettings
from typings.voice import VoiceInput, VoiceTextInput
from voices.get_voices import DeepgramVoice, PlayHTVoice

load_dotenv()


def text_to_speech(
    text: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> str:
    """
    Synthesize text to speech by Agent config

    """

    synthesizers = {
        PlayHTVoice.id: playht_text_to_speech,
        # TODO: add AzureVoice.id: azure_text_to_speech, when available.
    }

    if configs.synthesizer not in synthesizers:
        return ""

    voice_id = uuid.uuid1()
    voice_bytes = synthesizers[configs.synthesizer](text, configs, settings)
    key = f"account_e5d915b2-7ccf-11ee-b962-0242ac120002/chat/voice-{voice_id}.waw"
    img_data = io.BytesIO(voice_bytes)
    url = AWSS3Service.upload(body=img_data, key=key, content_type="audio/waw")

    return url


def speech_to_text(
    url: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> str:
    """
    Transcribe speech to text by Agent config

    """

    transcribers = {
        DeepgramVoice.id: deepgram_speech_to_text,
        # TODO: add AzureVoice.id: azure_speech_to_text, when available.
    }

    if configs.transcriber not in transcribers:
        return ""

    return transcribers[configs.transcriber](url, configs, settings)


def playht_text_to_speech(
    text: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> bytes:
    payload = {
        "quality": "high",
        "output_format": "waw",
        "speed": 1,
        "sample_rate": 24000,
        "text": text,
        "voice": configs.voice_id or configs.default_voice or "larry",
    }

    headers = {
        "accept": "text/event-stream",
        "content-type": "application/json",
        "AUTHORIZATION": f"Bearer {settings.PLAY_HT_API_KEY}",
        "X-USER-ID": settings.PLAY_HT_USER_ID,
    }

    response = requests.post(
        "https://play.ht/api/v2/tts", headers=headers, json=payload, timeout=300
    )

    if response.status_code in [200, 201]:
        audio_url = response.json().get("url", "")
        if audio_url:
            audio_response = requests.get(audio_url)
            if audio_response.status_code == 200:
                return audio_response.content

    return b""


def deepgram_speech_to_text(
    url: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> str:
    response = requests.get(url)
    if response.status_code != 200:
        return ""

    audio_bytes = base64.b64decode(response.content)
    deepgram = Deepgram(settings.DEEPGRAM_API_KEY)

    source = {
        "buffer": io.BytesIO(audio_bytes),
        "mimetype": "audio/waw",
    }

    playload = {
        "smart_format": True,
        "model": "general",
        "diarize": True,
        "interim_results": False,
        "tier": "enhanced",
    }

    response = asyncio.create_task(deepgram.transcription.prerecorded(source, playload))

    results = response.get("results", {})
    channels = results.get("channels", [])

    transcribed_text = ""
    for channel in channels:
        alternatives = channel.get("alternatives", [])
        for alternative in alternatives:
            transcript = alternative.get("transcript", "")
            transcribed_text += transcript + " "

    return transcribed_text.strip('"')
