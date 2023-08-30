from __future__ import annotations
from typing import List, Optional
import uuid

from sqlalchemy import Column, String, Boolean, UUID, func, or_, ForeignKey, Integer
from sqlalchemy.orm import relationship
from models.base_model import BaseModel
from l3_types.team_types import teamInput
from exceptions import teamNotFoundException

class TeamModel(BaseModel):
    """
    Represents an team entity.

    Attributes:
        id (UUID): Unique identifier of the team.
        name (str): Name of the team.

    """
    __tablename__ = 'team'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    type = Column(String) #todo replace as enum (Debates, Plan_Execute, Authoritarian_Speaker, Decentralized_speaker)
    description = Column(String, nullable=True) 
    is_deleted = Column(Boolean, default=False)
    is_system = Column(Boolean, default=False)
    is_template = Column(Boolean, default=False)
    project_id = Column(UUID, ForeignKey('project.id'), nullable=True) #gonna use if need store teams based on game, project or any
    account_id = Column(UUID, ForeignKey('account.id'), nullable=False)
    
    account = relationship("AccountModel", back_populates="account", cascade="all, delete")
    project = relationship("ProjectModel", back_populates="project", cascade="all, delete")