import json
from typing import Any, Dict, Optional

import strawberry
from pydantic import UUID4, BaseModel


class AccountInput(BaseModel):
    name: Optional[str]
    deleted: Optional[bool]


@strawberry.scalar
class JSONScalar:
    @staticmethod
    def serialize(value: Any) -> str:
        return json.dumps(value)

    @staticmethod
    def parse_value(value: str) -> Any:
        return json.loads(value)


class AccountOutput(BaseModel):
    id: UUID4
    name: Optional[str]
    deleted: Optional[bool]
    created_by: Optional[UUID4]
    modified_by: Optional[UUID4]
    configs: Optional[Dict[str, Any]]


@strawberry.type
class Account:
    id: strawberry.ID
    name: Optional[str]
    deleted: Optional[bool]
    created_by: Optional[strawberry.ID]
    modified_by: Optional[strawberry.ID]
    configs: Optional[JSONScalar]
