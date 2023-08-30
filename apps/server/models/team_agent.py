from __future__ import annotations
from typing import List, Optional
import uuid

from sqlalchemy import Column, String, Boolean, UUID, func, or_, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel
from l3_types.team_agent_types import TeamAgentInput
from exceptions import TeamAgentNotFoundException

class TeamAgentModel(BaseModel):
    """
    Represents an team entity.

    Attributes:
        id (UUID): Unique identifier of the team.
        name (str): Name of the team.

    """
    __tablename__ = 'team_agent'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    team_id = Column(UUID, ForeignKey('team.id'), nullable=True) #gonna use if need store teams based on game, project or any
    agent_id = Column(UUID, ForeignKey('agent.id'), nullable=False)
    
    # agent = relationship("AgentModel", back_populates="agent", cascade="all, delete")
    # team = relationship("TeamModel", back_populates="team", cascade="all, delete")