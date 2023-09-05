from pydantic import BaseModel, UUID4
from typing import List, Optional

class AgentInput(BaseModel):
    name: str
    description: Optional[str]
    agent_type:Optional[str]
    project_id: Optional[UUID4]
    role: Optional[str]
    is_memory: Optional[bool]
    avatar: Optional[str]
    is_template: bool

class ConfigInput(BaseModel):
    goals: List[str]
    constraints: List[str]
    tools: List[str]
    datasources: List[str]
    mode_provider: str
    model_version: str
    temperature: float
    instructions: List[str]
    # suggestions: Optional[List[str]]
    
class AgentConfigInput(BaseModel):
    agent: AgentInput
    configs: ConfigInput


class ConfigsOutput(BaseModel):
    goals: List[str]
    constraints: List[str]
    tools: List[str]
    datasources: List[str]
    mode_provider: str
    model_version: str
    temperature: float
    instructions: List[str]
    # suggestions: Optional[List[str]]


class AgentResponse(BaseModel):
    id: UUID4
    name: str
    description: str
    agent_type: Optional[str]
    project_id: Optional[UUID4]
    role: str
    is_template: bool
    is_deleted: bool
    is_system: bool
    account_id: UUID4
    created_by: Optional[UUID4]
    modified_by: Optional[UUID4]
    is_memory: Optional[bool]
    avatar: Optional[str]
    
class AgentWithConfigsOutput(BaseModel):
    agent: AgentResponse
    configs: ConfigsOutput
 
    
    

