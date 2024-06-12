from pydantic import BaseModel, Field, validator
from typing import Optional
from uuid import UUID
from decimal import Decimal
from enum import Enum
from datetime import datetime


class PodStatusEnum(str, Enum):
    running = 'running'
    stopped = 'stopped'


class PodTypeEnum(str, Enum):
    cpu = 'cpu'
    gpu = 'gpu'


class PodOutput(BaseModel):
    id: UUID
    pod_name: str
    price: Decimal
    status: PodStatusEnum
    provider: str
    category: str
    type: PodTypeEnum
    resource: UUID
    gpu_count: Decimal
    isinstance_pricing: dict
    account_id: UUID
    created_by: UUID
    modified_by: Optional[UUID]
    created_on: datetime
    template_name: str
    template_container_image: str
    resource_display_name: str
    resource_ram: Decimal

    class Config:
        orm_mode = True


class PodInput(BaseModel):
    pod_name: str
    price: Decimal = Field(None, gt=0)
    status: PodStatusEnum
    provider: str
    category: str
    type: PodTypeEnum
    resource: UUID
    gpu_count: Decimal = Field(None, ge=1)
    isinstance_pricing: dict
    template: UUID

    @validator('isinstance_pricing')
    def check_isinstance_pricing(cls, value):
        if not isinstance(value, dict):
            raise ValueError('isinstance_pricing must be a dictionary')
        return value


class CreatePodOutput(BaseModel):
    success: bool
    message: str
