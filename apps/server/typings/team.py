from pydantic import BaseModel, UUID4
from typing import Optional, List
from typings.team_agent import TeamAgentOutput
from typings.user import UserOutput

class TeamInput(BaseModel):
    name: str
    description: Optional[str]
    team_type: str
    workspace_id: Optional[UUID4]
    is_memory: Optional[bool]

class TeamAgentInput(BaseModel):
    agent_id: UUID4
    role: str

class TeamOfAgentsInput(TeamInput):
    team_agents: List[TeamAgentInput]


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

class QueryParams(BaseModel):
    id: Optional[str]
    workspace_id: Optional[UUID4]

