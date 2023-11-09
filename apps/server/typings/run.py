from enum import Enum
from typing import Dict, List, Optional

from pydantic import UUID4, BaseModel


class RunLogType(str, Enum):
    LLM = "LLM"
    TOOL = "Tool"

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
    name: Optional[str]
    messages: Optional[List[Dict]]
    toolkit_id: Optional[UUID4]


class RunLogMessageOutput(BaseModel):
    name: str
    content: str
    is_chat_history: Optional[bool]


class RunLogOutput(BaseModel):
    id: UUID4
    name: str
    type: str
    messages: Optional[List[RunLogMessageOutput]]
    start_date: Optional[str]
    end_date: Optional[str]
    toolkit_id: Optional[UUID4]
