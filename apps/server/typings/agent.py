from pydantic import BaseModel, UUID4
from typing import List, Optional
from typings.user import UserOutput

class AgentInput(BaseModel):
    name: str
    description: Optional[str]
    agent_type:Optional[str]
    workspace_id: Optional[UUID4]
    role: Optional[str]
    is_memory: Optional[bool]
    # avatar: Optional[str]
    is_template: bool

class ConfigInput(BaseModel):
    goals: List[str]
    constraints: List[str]
    tools: List[str]
    datasources: List[str]
    model_provider: str
    model_version: str
    temperature: float
    instructions: List[str]
    suggestions: Optional[List[str]]
    greeting: Optional[str]
    text: Optional[str]

    
class AgentConfigInput(BaseModel):
    agent: AgentInput
    configs: ConfigInput


class ConfigsOutput(BaseModel):
    goals: List[str]
    constraints: List[str]
    tools: List[str]
    datasources: List[str]
    model_provider: str
    model_version: str
    temperature: float
    instructions: List[str]
    suggestions: Optional[List[str]]
    greeting: Optional[str]
    text: Optional[str]


class AgentOutput(BaseModel):
    id: UUID4
    name: str
    description: str
    agent_type: Optional[str]
    workspace_id: Optional[UUID4]
    parent_id: Optional[UUID4]
    role: str
    is_template: bool
    is_deleted: bool
    is_public: bool
    account_id: UUID4
    created_by: Optional[UUID4]
    creator: Optional[UserOutput]
    modified_by: Optional[UUID4]
    is_memory: Optional[bool]
    avatar: Optional[str]
    
class AgentWithConfigsOutput(BaseModel):
    agent: AgentOutput
    configs: Optional[ConfigsOutput]
 
    
    

