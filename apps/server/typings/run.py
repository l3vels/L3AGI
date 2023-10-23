from typing import Optional

from pydantic import UUID4, BaseModel


class RunInput(BaseModel):
    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]
    chat_id: Optional[UUID4]
    session_id: Optional[str]
