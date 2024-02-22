import os
from typing import List

import requests
from fastapi import APIRouter, Depends
from fastapi_sqlalchemy import db

from models.config import ConfigModel
from typings.auth import UserAccount
from typings.voice import VoiceOutput
from utils.auth import (authenticate, authenticate_by_any,
                        authenticate_by_token_or_api_key)
from voices.get_voices import get_all_voice_providers

router = APIRouter()


@router.get("", response_model=List[VoiceOutput])
def get_voices() -> List[VoiceOutput]:
    """
    Get all voices by account ID.

    """

    # db_tools = ToolModel.get_tools(db=db, account=auth.account)

    return get_all_voice_providers()
    # return convert_tools_to_tool_list(db_tools)


@router.get("/options")
def get_voice_options(auth: UserAccount = Depends(authenticate_by_token_or_api_key)):
    """
    Get all voice options.
    """

    voice_settings = ConfigModel.get_account_voice_settings(db.session, auth.account.id)

    PLAY_HT_API_KEY = voice_settings.PLAY_HT_API_KEY
    PLAY_HT_USER_ID = voice_settings.PLAY_HT_USER_ID
    ELEVEN_LABS_API_KEY = voice_settings.ELEVEN_LABS_API_KEY

    AZURE_SPEECH_KEY = voice_settings.AZURE_SPEECH_KEY
    AZURE_SPEECH_REGION = voice_settings.AZURE_SPEECH_REGION

    # ElevenLabs
    labsUrl = "https://api.elevenlabs.io/v1/voices"
    labsHeaders = {
        "xi-api-key": ELEVEN_LABS_API_KEY or os.environ.get("ELEVEN_LABS_API_KEY")
    }
    labsResponse = requests.get(labsUrl, headers=labsHeaders)

    # PlayHT
    playHtUrl = "https://api.play.ht/api/v2/voices"
    playHtHeaders = {
        "accept": "application/json",
        "AUTHORIZATION": PLAY_HT_API_KEY or os.environ.get("PLAY_HT_API_KEY"),
        "X-USER-ID": PLAY_HT_USER_ID or os.environ.get("PLAY_HT_USER_ID"),
    }
    playHtResponse = requests.get(playHtUrl, headers=playHtHeaders)

    # Azure
    msTtsUrl = "https://eastus.tts.speech.microsoft.com/cognitiveservices/voices/list"
    msTtsHeaders = {
        "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY
        or os.environ.get("AZURE_SPEECH_KEY"),
    }
    msTtsResponse = requests.get(msTtsUrl, headers=msTtsHeaders)

    combined_response = {
        "elevenLabsVoices": labsResponse.json(),
        "playHtVoices": playHtResponse.json(),
        "azureVoices": msTtsResponse.json(),
    }

    return combined_response
