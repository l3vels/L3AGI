from typing import List

from fastapi import APIRouter

from typings.voice import VoiceOutput
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
