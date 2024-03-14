import os
from typing import List, Optional

import requests
from fastapi import APIRouter, Depends
from fastapi_sqlalchemy import db

from models.config import ConfigModel
from typings.auth import UserAccount
from typings.voice import VoiceOutput
from utils.auth import authenticate, authenticate_by_token_or_api_key
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
def get_voice_options(
    page: Optional[int] = 1,
    per_page: Optional[int] = 10,
    auth: UserAccount = Depends(authenticate_by_token_or_api_key),
):
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
    labsUrl = os.environ.get("ELEVEN_LABS_VOICE_LIST_API")
    labsHeaders = {
        "xi-api-key": ELEVEN_LABS_API_KEY or os.environ.get("ELEVEN_LABS_API_KEY")
    }
    labsResponse = requests.get(labsUrl, headers=labsHeaders)

    # PlayHT
    playHtUrl = os.environ.get("PLAY_HT_VOICE_LIST_API")
    playHtHeaders = {
        "accept": "application/json",
        "AUTHORIZATION": PLAY_HT_API_KEY or os.environ.get("PLAY_HT_API_KEY"),
        "X-USER-ID": PLAY_HT_USER_ID or os.environ.get("PLAY_HT_USER_ID"),
    }
    playHtResponse = requests.get(playHtUrl, headers=playHtHeaders)
    play_ht_all_voices = playHtResponse.json()

    start = (page - 1) * per_page
    end = start + per_page
    paginated_voices = play_ht_all_voices[start:end]

    # Azure
    azureUrl = os.environ.get("AZURE_VOICE_LIST_API")
    azureHeaders = {
        "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY
        or os.environ.get("AZURE_SPEECH_KEY"),
    }
    azureResponse = requests.get(azureUrl, headers=azureHeaders)
    azure_voices = azureResponse.json()

    start = (page - 1) * per_page
    end = start + per_page
    paginated_azure_voices = azure_voices[start:end]

    combined_response = {
        "elevenLabsVoices": labsResponse.json(),
        "playHtVoices": play_ht_all_voices,
        "azureVoices": azure_voices,
    }

    return combined_response
