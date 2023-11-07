from typing import List, Optional

from pydantic import UUID4, BaseModel


class IntegrationFieldOutput(BaseModel):
    label: str
    key: str
    type: str
    is_required: bool
    is_secret: bool
    default_value: Optional[str] = None


class IntegrationOutput(BaseModel):
    id: Optional[UUID4]
    is_active: bool
    is_public: bool
    name: str
    description: Optional[str]
    slug: Optional[str]
    fields: Optional[List[IntegrationFieldOutput]]
