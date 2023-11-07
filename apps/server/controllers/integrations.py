from typing import List

from fastapi import APIRouter

from integrations.get_integrations import get_all_integration_providers
from typings.integrations import IntegrationOutput

router = APIRouter()


@router.get("", response_model=List[IntegrationOutput])
def get_integrations() -> List[IntegrationOutput]:
    """
    Get all integrations

    """

    return get_all_integration_providers()
