from typing import List, Optional

from pydantic import UUID4, BaseModel

from typings.team_agent import TeamAgentOutput
from typings.user import UserOutput


class TeamAgentInput(BaseModel):
    agent_id: UUID4
    role: str


class QueryParams(BaseModel):
    id: Optional[str]
    workspace_id: Optional[UUID4]


class ConfigInput(BaseModel):
    goals: Optional[List[str]]
    constraints: Optional[List[str]]
    tools: Optional[List[str]]
    datasources: Optional[List[str]]
    model: Optional[str]
    temperature: Optional[float]
    instructions: Optional[List[str]]
    suggestions: Optional[List[str]]
    greeting: Optional[str]
    text: Optional[str]


# class TeamOfAgentsInput(TeamInput):


# class TeamInput(TeamOfAgentsInput):


class TeamInput(BaseModel):
    name: str
    description: Optional[str]
    team_type: str
    workspace_id: Optional[UUID4]
    is_memory: Optional[bool]
    team_agents: Optional[List[TeamAgentInput]]
    configs: Optional[ConfigInput]


class ConfigsOutput(BaseModel):
    goals: Optional[List[str]]
    constraints: Optional[List[str]]
    tools: Optional[List[str]]
    datasources: Optional[List[str]]
    model: Optional[str]
    temperature: Optional[float]
    instructions: Optional[List[str]]
    suggestions: Optional[List[str]]
    greeting: Optional[str]
    text: Optional[str]


class TeamOutput(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    team_type: str
    workspace_id: Optional[UUID4]
    is_deleted: bool
    is_public: bool
    is_template: bool
    parent_id: Optional[UUID4]
    account_id: UUID4
    created_by: Optional[UUID4]
    creator: Optional[UserOutput]
    modified_by: Optional[UUID4]
    team_agents: Optional[List[TeamAgentOutput]]
    avatar: Optional[str]
    is_memory: Optional[bool]
    configs: Optional[ConfigsOutput]
