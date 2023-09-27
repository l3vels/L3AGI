from pydantic import BaseModel, UUID4
from typing import List, Optional

class ConfigInput(BaseModel):
    key: str
    value: str
    key_type: str
    is_secret: bool
    is_required: bool
    agent_id: Optional[UUID4]
    toolkit_id: Optional[UUID4]
    datasource_id: Optional[UUID4]
    workspace_id: Optional[UUID4]
    team_id: Optional[UUID4]
    session_id: Optional[UUID4]


class ConfigOutput(BaseModel):
    id: str
    key: str
    value: str
    key_type: str
    is_secret: bool
    is_required: bool
    agent_id: Optional[UUID4]
    toolkit_id: Optional[UUID4]
    datasource_id: Optional[UUID4]
    team_id: Optional[UUID4]
    account_id: UUID4
    workspace_id: Optional[UUID4]
    is_deleted: bool
    created_by: Optional[UUID4]
    modified_by: Optional[UUID4]
    session_id: Optional[UUID4]
    
class ConfigQueryParams(BaseModel):
    id: Optional[str]
    key: Optional[str]
    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]
    toolkit_id: Optional[UUID4]
    datasource_id: Optional[UUID4]
    workspace_id: Optional[UUID4]
    session_id: Optional[UUID4]


class AccountSettings(BaseModel):
    openai_api_key: Optional[str]
    hugging_face_auth_token: Optional[str]