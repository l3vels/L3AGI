from enum import Enum
from typing import Optional

from pydantic import UUID4, BaseModel


class RunLogType(str, Enum):
    SYSTEM = "System"
    TOOL = "Tool"
    ANSWER = "Final Answer"

    def __str__(self):
        return self.value


class RunInput(BaseModel):
    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]
    chat_id: Optional[UUID4]
    session_id: Optional[str]


class RunLogInput(BaseModel):
    type: str
    run_id: Optional[UUID4]
    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]
    chat_id: Optional[UUID4]
    session_id: Optional[str]
    input: Optional[str]
    name: Optional[str]
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
