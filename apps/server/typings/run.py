from typing import Optional

from pydantic import UUID4, BaseModel


class RunInput(BaseModel):
    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]
    chat_id: Optional[UUID4]
    session_id: Optional[str]


class RunLogInput(BaseModel):
    run_id: Optional[UUID4]
    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]
    chat_id: Optional[UUID4]
    session_id: Optional[str]
    type: str
    input: str
    name: str
    output: Optional[str]
    error: Optional[str]


class UpdateRunLogInput(BaseModel):
    output: Optional[str]
    error: Optional[str]


class RunLogOutput(BaseModel):
    id: UUID4
    name: str
    type: str
    input: str
    output: Optional[str]
    error: Optional[str]
