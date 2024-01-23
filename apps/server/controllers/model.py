from typing import List

from fastapi import APIRouter, Depends

from typings.auth import UserAccount
from typings.model import ModelOutput
from utils.auth import authenticate_by_token_or_api_key
from utils.model import get_models_with_fine_tunings

router = APIRouter()


@router.get("", response_model=List[ModelOutput])
def get_models(
    auth: UserAccount = Depends(authenticate_by_token_or_api_key),
) -> List[ModelOutput]:
    """
    Get all models.

    Returns:
        List[ModelOutput]: List of tools associated with the account.
    """

    return get_models_with_fine_tunings(auth.account.id)
