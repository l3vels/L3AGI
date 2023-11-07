import asyncio
import base64
import io
import os
from logging import log

import requests
from deepgram import Deepgram
from dotenv import load_dotenv

from services.aws_s3 import AWSS3Service
from typings.agent import ConfigsOutput
from typings.config import AccountVoiceSettings
from typings.voice import (VoiceInput, VoiceSynthesizerResponse,
                           VoiceTextInput, VoiceTranscriberResponse)

load_dotenv()


async def text_to_speech(
    text: str, configs: ConfigsOutput, voice_settings: AccountVoiceSettings
) -> VoiceSynthesizerResponse:
    """
    Synthesize text to speech by Agent config

    """

    # todo text to speech
    synthesizer = configs.synthesizer  # you can check with it later which synthesizer
    default_voice = configs.default_voice or None

    # voice_settings
    voice_id = configs.voice_id or None

    voice = await playht_text_to_speech(input, {})

    key = f"account_e5d915b2-7ccf-11ee-b962-0242ac120002/chat/voice-{voice_id}.mp3"
    img_data = io.BytesIO(voice)
    url = AWSS3Service.upload(body=img_data, key=key, content_type="audio/mp3")

    return VoiceTranscriberResponse(audio_url=url)

    # if input.agent_id is None:

    # else:
    #     l3 = L3Service(request)
    #     agent = l3.get_agent(input.agent_id)
    #     configs = agent.get('configs', {})

    #     match_synthesizer = {
    #         'PlayHT': playht_text_to_speech,
    #     }

    #     synthesizer = configs.get('synthesizer', 'PlayHT')
    #     voice = await match_synthesizer[synthesizer](input, configs)
    #     voice_id = uuid.uuid4()

    #     key = f"account_e5d915b2-7ccf-11ee-b962-0242ac120002/chat/voice-{voice_id}.mp3"

    #     img_data = io.BytesIO(voice)
    #     url = AWSS3Service.upload(
    #         body=img_data, key=key, content_type="audio/mp3"
    #     )

    #     return VoiceTranscriberResponse(audio_url=url)


async def speech_to_text(
    text: str, configs: ConfigsOutput, voice_settings: AccountVoiceSettings
) -> VoiceTranscriberResponse:
    """
    Transcribe speech to text by Agent config

    """
    return await deepgram_speech_to_text(text, {})

    # if input.agent_id is None:

    # else:
    #     l3 = L3Service(request)
    #     agent = l3.get_agent(input.agent_id)
    #     configs = agent.get('configs', {})

    #     match_transcriber = {
    #         'Deepgram': deepgram_speech_to_text,
    #     }

    #     transcriber = configs.get('transcriber', 'Deepgram')
    #     return await match_transcriber[transcriber](input, configs)


async def playht_text_to_speech(input: VoiceTextInput, configs: dict) -> bytes:
    API_KEY = os.environ["PLAY_HT_API_KEY"]
    USER_ID = os.environ["PLAY_HT_USER_ID"]

    payload = {
        "quality": "high",
        "output_format": "mp3",
        "speed": 1,
        "sample_rate": 24000,
        "text": input.prompt,
        "voice": "larry",
    }

    headers = {
        "accept": "text/event-stream",
        "content-type": "application/json",
        "AUTHORIZATION": f"Bearer {API_KEY}",
        "X-USER-ID": USER_ID,
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


async def deepgram_speech_to_text(
    input: VoiceInput, configs: dict
) -> VoiceTranscriberResponse:
    deepgram = Deepgram(os.environ["DEEPGRAM_API_KEY"])
    audio_bytes = base64.b64decode(input.audio_data)

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

    response = await asyncio.create_task(
        deepgram.transcription.prerecorded(source, playload)
    )

    results = response.get("results", {})
    channels = results.get("channels", [])

    transcribed_text = ""
    for channel in channels:
        alternatives = channel.get("alternatives", [])
        for alternative in alternatives:
            transcript = alternative.get("transcript", "")
            transcribed_text += transcript + " "

    return VoiceTranscriberResponse(text=transcribed_text.strip('"'))
