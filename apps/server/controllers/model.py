from typing import List

from fastapi import APIRouter

from typings.model import ModelOutput
from utils.model import MODELS

router = APIRouter()


@router.get("", response_model=List[ModelOutput])
def get_models() -> List[ModelOutput]:
    """
    Get all models.

    Returns:
        List[ModelOutput]: List of tools associated with the account.
    """

    return MODELS
