from pydantic import BaseModel, UUID4
from typing import List, Optional
from typings.user import UserOutput

class ScheduleInput(BaseModel):
    name: str
    description: Optional[str]
    schedule_type:Optional[str]
    cron_expression:str
    max_daily_budget: Optional[float]
    workspace_id: Optional[UUID4]
    is_active: Optional[bool]

class ConfigInput(BaseModel):
    agent_id: Optional[UUID4]
    group_id: Optional[UUID4]

    
class ScheduleConfigInput(BaseModel):
    schedule: ScheduleInput
    configs: ConfigInput


class ConfigsOutput(BaseModel):
    agent_id: UUID4
    group_id: UUID4


class ScheduleOutput(BaseModel):
    id: UUID4
    name: str
    description: Optional[str]
    schedule_type:Optional[str]
    max_daily_budget: Optional[float]
    cron_expression:str
    workspace_id: Optional[UUID4]
    is_active: Optional[bool]
    is_deleted: bool
    account_id: UUID4
    created_by: Optional[UUID4]
    creator: Optional[UserOutput]
    modified_by: Optional[UUID4]
    
class ScheduleWithConfigsOutput(BaseModel):
    schedule: ScheduleOutput
    configs: Optional[ConfigsOutput]
 
    
    

