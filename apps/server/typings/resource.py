from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from enum import Enum


class ResourceTypeEnum(str, Enum):
    cpu = "cpu"
    gpu = "gpu"


class ResourceStatusEnum(str, Enum):
    low = 'low'
    high = 'high'
    unavailable = 'unavailable'


class ResourceDiscTypeEnum(str, Enum):
    ssd = 'ssd'
    nvme = 'nvme'
    unavailable = 'unavailable'


class ResourceCloudTypeEnum(str, Enum):
    secure_cloud = 'secure cloud'
    community_cloud = 'community cloud'
    unavailable = 'unavailable'


class ResourceInput(BaseModel):
    name: str
    display_name: str
    type: ResourceTypeEnum
    category: Optional[str] = None
    ram: Optional[float] = None
    secure_price: Optional[float] = None
    one_month_price: Optional[float] = None
    three_month_price: Optional[float] = None
    six_month_price: Optional[float] = None
    max_gpu: Optional[float] = None
    lowest_price: dict
    status: Optional[ResourceStatusEnum] = None
    disc_type: Optional[ResourceDiscTypeEnum] = None
    cloud_type: Optional[ResourceCloudTypeEnum] = None
    region: str
    cuda_version: Optional[float] = None


class ResourceOutput(ResourceInput):
    id: UUID

    class Config:
        orm_mode = True
