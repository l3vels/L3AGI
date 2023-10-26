from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class FineTuningInput(BaseModel):
    name: str
    file_url: str


class FineTuningOutput(BaseModel):
    id: UUID
    name: str
    identifier: Optional[str]
    file_url: str
    status: Optional[str]
    model_id: Optional[UUID]
