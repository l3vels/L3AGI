from pydantic import BaseModel, UUID4
from typing import List, Optional

class TeamAgentInput(BaseModel):
    team_id: Optional[UUID4]
    agent_id: UUID4

class TeamAgentOutput(BaseModel):
    id: UUID4
    team_id: Optional[UUID4]
    agent_id: UUID4

class QueryParams(BaseModel):
    id: Optional[str]
    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]