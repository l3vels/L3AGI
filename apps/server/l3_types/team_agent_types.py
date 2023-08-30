from pydantic import BaseModel, UUID4
from typing import List, Optional

class TeamAgentInput(BaseModel):
    team_id: Optional[UUID4]
    agent_id: UUID4

class TeamAgentResponse(BaseModel):
    id: UUID4
    team_id: Optional[UUID4]
    agent_id: UUID4
