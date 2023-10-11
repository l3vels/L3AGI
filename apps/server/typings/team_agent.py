from pydantic import BaseModel, UUID4
from typing import Optional, Dict
from enum import Enum


class TeamAgentRole(str, Enum):
    PLANNER = "Planner"
    EXECUTOR = "Executor"
    DIRECTOR = "Director"
    SPEAKER = "Speaker"
    DEBATER = "Debater"


class TeamAgentInput(BaseModel):
    team_id: Optional[UUID4]
    agent_id: UUID4
    role: TeamAgentRole


class TeamAgentOutput(BaseModel):
    id: UUID4
    team_id: Optional[UUID4]
    agent_id: UUID4
    agent: Dict
    role: TeamAgentRole


class QueryParams(BaseModel):
    id: Optional[str]
    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]
