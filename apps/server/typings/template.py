from pydantic import BaseModel, Field, validator, condecimal
from typing import Optional
from uuid import UUID
from decimal import Decimal
from enum import Enum
from datetime import datetime


class TemplateTypeEnum(str, Enum):
    serverless = "serverless"
    pod = 'pod'


class TemplateComputeTypeEnum(str, Enum):
    nvidia_gpu = "nvidia gpu"
    amd_gpu = 'amd gpu'
    cpu = 'cpu'


class TemplateVisibilityEnum(str, Enum):
    public = "public"
    private = "private"


class CreateTemplateOutput(BaseModel):
    success: bool
    message: str


class TemplateInput(BaseModel):
    name: str
    description: Optional[str]
    template_type: TemplateTypeEnum
    compute_type: TemplateComputeTypeEnum
    container_image: str
    container_start_command: Optional[str]
    container_disk: Optional[condecimal(max_digits=5, decimal_places=0, ge=5)]
    volume_disk: Optional[condecimal(max_digits=5, decimal_places=0, ge=0)]
    volume_mount_path: Optional[str]
    expose_http_ports: Optional[str]
    expose_tcp_ports: Optional[str]
    template_visibility: TemplateVisibilityEnum
    environment_variables: Optional[dict]


class TemplateOutput(TemplateInput):
    id: UUID
    account_id: UUID
    created_by: UUID
    modified_by: Optional[UUID]
    created_on: datetime

    class Config:
        orm_mode = True
