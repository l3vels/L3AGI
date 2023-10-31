from enum import Enum
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class FineTuningStatus(Enum):
    VALIDATING = "Validating Files"
    QUEUED = "Queued"
    RUNNING = "Running"
    FAILED = "Failed"
    COMPLETED = "Completed"


class FineTuningInput(BaseModel):
    name: str
    file_url: str
    model_id: UUID


class UpdateFineTuningInput(BaseModel):
    name: Optional[str]
    status: Optional[str]


class FineTuningOutput(BaseModel):
    id: UUID
    name: str
    identifier: Optional[str]
    file_url: str
    status: Optional[str]
    model_id: Optional[UUID]
    error: Optional[str]
