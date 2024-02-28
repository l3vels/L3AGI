import asyncio
import io
import json
import uuid

import requests

from exceptions import SynthesizerException, TranscriberException
from services.aws_s3 import AWSS3Service
from typings.agent import ConfigsOutput
from typings.config import AccountVoiceSettings


def text_to_speech(
    text: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> str:
    """
    Synthesize text to speech by Agent config

    """

    synthesizers = {
        "142e60f5-2d46-4b1a-9054-0764e553eed6": playht_text_to_speech,
        "509fd791-578f-40be-971f-c6753957c307": eleven_labs_text_to_speech,
        "dc872426-a95c-4c41-83a2-5e5ed43670cd": azure_text_to_speech,
    }

    if configs.synthesizer not in synthesizers:
        raise SynthesizerException(
            "The selected synthesizer implementation is not available. Please choose a different synthesizer option or contact support for assistance."
        )

    id = uuid.uuid1()
    voice_bytes = synthesizers[configs.synthesizer](text, configs, settings)
    key = f"account_e5d915b2-7ccf-11ee-b962-0242ac120002/chat/voice-{id}.waw"
    url = AWSS3Service.upload(
        body=io.BytesIO(voice_bytes), key=key, content_type="audio/waw"
    )

    return url


def speech_to_text(
    url: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> str:
    """
    Transcribe speech to text by Agent config

    """

    transcribers = {
        "b44769b1-1a20-44d3-b0f1-8b4c96e6a02a": deepgram_speech_to_text,
        # TODO: add AzureVoice.id: azure_speech_to_text, when available.
    }

    if configs.transcriber not in transcribers:
        raise SynthesizerException(
            "The selected transcriber implementation is not available. Please choose a different transcriber option or contact support for assistance."
        )

    text = asyncio.run(transcribers[configs.transcriber](url, configs, settings))
    return text


def playht_text_to_speech(
    text: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> bytes:
    if (
        settings.PLAY_HT_USER_ID is None
        or settings.PLAY_HT_API_KEY is None
        or not settings.PLAY_HT_USER_ID
        or not settings.PLAY_HT_API_KEY
    ):
        raise SynthesizerException(
            "Please set PlayHT credentials in [Voice Integrations](/integrations/voice/playht) in order to synthesize text to speech"
        )

    payload = {
        "quality": "high",
        "output_format": "wav",
        "speed": 1,
        "sample_rate": 24000,  # TODO: config should return sample_rate
        "text": text,
        "voice": configs.voice_id or configs.default_voice or "larry",
    }

    headers = {
        "accept": "text/event-stream",
        "content-type": "application/json",
        "AUTHORIZATION": f"Bearer {settings.PLAY_HT_API_KEY}",
        "X-USER-ID": settings.PLAY_HT_USER_ID,
    }

    try:
        response = requests.post(
            "https://play.ht/api/v2/tts", headers=headers, json=payload, timeout=300
        )
        if response.status_code in [200, 201]:
            for line in response.content.decode().split("\r\n"):
                if line.startswith("data:"):
                    try:
                        data = json.loads(line[5:])
                        if "url" in data:
                            audio_response = requests.get(data["url"])
                            if audio_response.status_code == 200:
                                return audio_response.content
                    except json.JSONDecodeError:
                        continue
    except Exception as err:
        raise SynthesizerException(str(err))

    return b""


async def deepgram_speech_to_text(
    url: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> str:
    if settings.DEEPGRAM_API_KEY is None or not settings.DEEPGRAM_API_KEY:
        raise TranscriberException(
            "Please set the Deepgram API Key in [Voice Integrations](/integrations/voice/deepgram) in order to transcribe speech to text"
        )

    try:
        payload = {"url": url}
        headers = {
            "accept": "application/json",
            "content-type": "application/json",
            "Authorization": f"Token {settings.DEEPGRAM_API_KEY}",
        }

        response = requests.post(
            "https://api.deepgram.com/v1/listen?filler_words=false&summarize=v2",
            json=payload,
            headers=headers,
        )

        res = response.json()
        results = res.get("results", {})
        channels = results.get("channels", [])

        transcribed_text = ""
        for channel in channels:
            alternatives = channel.get("alternatives", [])
            for alternative in alternatives:
                transcript = alternative.get("transcript", "")
                transcribed_text += transcript + " "

        return transcribed_text.strip('"')
    except Exception as err:
        raise TranscriberException(str(err))


def eleven_labs_text_to_speech(
    text: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> bytes:
    if settings.ELEVEN_LABS_API_KEY is None or not settings.ELEVEN_LABS_API_KEY:
        raise SynthesizerException(
            "Please set Eleven Labs API Key in [Voice Integrations](/integrations/voice/elevenlabs) in order to synthesize text to speech."
        )

    url = f"https://api.elevenlabs.io/v1/text-to-speech/{configs.voice_id or configs.default_voice}"

    payload = {
        "model_id": "eleven_multilingual_v2",
        "text": text,
        "voice_settings": {"similarity_boost": 1, "stability": 1, "style": 1},
    }
    headers = {
        "xi-api-key": settings.ELEVEN_LABS_API_KEY,
        "Content-Type": "application/json",
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.content


def azure_text_to_speech(
    text: str, configs: ConfigsOutput, settings: AccountVoiceSettings
) -> bytes:
    if settings.AZURE_SPEECH_KEY is None or not settings.AZURE_SPEECH_KEY:
        raise SynthesizerException(
            "Please set Azure Speech Key in [Voice Integrations](/integrations/voice/azure) in order to synthesize text to speech."
        )

    url = f"https://{settings.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1"

    body = f"""
        <speak version='1.0' xml:lang='en-US'>
            <voice xml:lang='en-US' name='{configs.voice_id}'>
               {text}
            </voice>
        </speak>
        """

    headers = {
        "Ocp-Apim-Subscription-Key": settings.AZURE_SPEECH_KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "riff-24khz-16bit-mono-pcm",
        "User-Agent": "Your application name",
    }

    response = requests.post(url, headers=headers, data=body)
    return response.content
