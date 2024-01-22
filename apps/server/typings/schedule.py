from enum import Enum
from typing import List, Optional

from pydantic import UUID4, BaseModel

from typings.account import AccountOutput
from typings.user import UserOutput


class ScheduleStatus(Enum):
    PENDING = "Pending"
    PROCESSING = "Processing"

    def __str__(self):
        return self.value


class ScheduleInput(BaseModel):
    name: str
    description: Optional[str]
    schedule_type: Optional[str]
    cron_expression: str
    max_daily_budget: Optional[float]
    workspace_id: Optional[UUID4]
    is_active: Optional[bool]
    start_date: str
    end_date: Optional[str]
    interval: Optional[str]


class ConfigInput(BaseModel):
    tasks: Optional[List[str]]

    is_recurring: Optional[bool]
    create_session_on_run: Optional[bool]

    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]
    chat_id: Optional[UUID4]
    group_id: Optional[UUID4]


class ScheduleConfigInput(BaseModel):
    schedule: ScheduleInput
    configs: ConfigInput


class ConfigsOutput(BaseModel):
    tasks: Optional[List[str]]

    is_recurring: Optional[bool]
    create_session_on_run: Optional[bool]

    agent_id: Optional[UUID4]
    team_id: Optional[UUID4]
    chat_id: Optional[UUID4]
    group_id: Optional[UUID4]


class ScheduleOutput(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    schedule_type: Optional[str]
    max_daily_budget: Optional[float]
    cron_expression: str
    workspace_id: Optional[UUID4]
    is_active: Optional[bool]
    is_deleted: bool
    account_id: UUID4
    created_by: Optional[UUID4]
    creator: Optional[UserOutput]
    account: Optional[AccountOutput]
    modified_by: Optional[UUID4]
    interval: Optional[str]
    start_date: str
    end_date: Optional[str]


class ScheduleWithConfigsOutput(BaseModel):
    schedule: ScheduleOutput
    configs: Optional[ConfigsOutput]
