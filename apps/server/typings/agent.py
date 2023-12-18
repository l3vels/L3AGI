from enum import Enum
from typing import Dict, List, Optional

from pydantic import UUID4, BaseModel, Field

from typings.user import UserOutput


class AgentType(str, Enum):
    voice = "voice"
    text = "text"


class DataSourceFlow(str, Enum):
    PRE_RETRIEVAL = "pre_execution"
    SOURCE_DETECTION = "source_detection"


class InputModeType(List[str], Enum):
    text = ["Text"]
    voice = ["Voice"]
    text_voice = ["Text", "Voice"]


class AgentInput(BaseModel):
    name: str
    description: Optional[str]
    agent_type: Optional[AgentType]
    workspace_id: Optional[UUID4]
    role: Optional[str]
    is_memory: Optional[bool]
    avatar: Optional[str]
    is_template: bool


class ConfigInput(BaseModel):
    goals: List[str]
    constraints: List[str]
    tools: List[str]
    datasources: List[str]
    model: Optional[str]
    temperature: float = Field(..., gt=0, lt=1.0)
    instructions: List[str]
    suggestions: Optional[List[str]]
    greeting: Optional[str]
    text: Optional[str]
    integrations: Optional[List[dict]]
    source_flow: Optional[DataSourceFlow]
    synthesizer: Optional[str]
    default_voice: Optional[str]
    voice_id: Optional[str]
    transcriber: Optional[str]
    response_mode: Optional[List[str]]
    input_mode: Optional[InputModeType]
    runners: Optional[List[Dict]]
    sentiment_analyzer: Optional[Dict]


class AgentConfigInput(BaseModel):
    agent: AgentInput
    configs: ConfigInput


class CreateVoiceAgentInput(BaseModel):
    template_id: UUID4
    name: Optional[str] = ""
    description: Optional[str] = ""


class ConfigsOutput(BaseModel):
    goals: List[str]
    constraints: List[str]
    tools: List[str]
    datasources: List[str]
    model: Optional[str]
    temperature: float
    instructions: List[str]
    suggestions: Optional[List[str]]
    greeting: Optional[str]
    text: Optional[str]
    integrations: Optional[List[dict]]
    source_flow: Optional[str]
    synthesizer: Optional[str]
    default_voice: Optional[str]
    voice_id: Optional[str]
    transcriber: Optional[str]
    response_mode: Optional[List[str]]
    input_mode: Optional[List[str]]
    runners: Optional[List[Dict]]
    sentiment_analyzer: Optional[Dict]


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
    system_message: Optional[str]
