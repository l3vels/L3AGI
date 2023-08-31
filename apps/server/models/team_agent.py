from __future__ import annotations
from typing import List, Optional
import uuid

from sqlalchemy import Column, String, Boolean, UUID, func, or_, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel
from typings.team_agent import TeamAgentInput, QueryParams
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
    team_id = Column(UUID, ForeignKey('team.id'), nullable=True) 
    agent_id = Column(UUID, ForeignKey('agent.id'), nullable=False)
    is_deleted = Column(Boolean, default=False)
    
    team = relationship("TeamModel", back_populates="team_agents")
    
    def __repr__(self) -> str:
        return (
            f"TeamAgent(id={self.id}, "
            f"team_id='{self.team_id}', agent_id='{self.agent_id}')"
        )

    @classmethod
    def create_team_agent(cls, db, team_agent, user, account):
        """
        Creates a new team_agent with the provided configuration.

        Args:
            db: The database object.
            team_agent_with_config: The object containing the team_agent and configuration details.

        Returns:
            TeamAgent: The created team_agent.

        """
        db_team_agent = TeamAgentModel(
                         created_by=user.id, 
                        #  account_id=account.id,
                         )
        cls.update_model_from_input(db_team_agent, team_agent)
        db.session.add(db_team_agent)
        db.session.flush()  # Flush pending changes to generate the team_agent's ID
        db.session.commit()
        
        return db_team_agent
       
    @classmethod
    def update_team_agent(cls, db, id, team_agent, user, account):
        """
        Creates a new team_agent with the provided configuration.

        Args:
            db: The database object.
            team_agent_with_config: The object containing the team_agent and configuration details.

        Returns:
            TeamAgent: The created team_agent.

        """
        old_team_agent = cls.get_team_agent_by_id(db=db, team_agent_id=id, account=account)
        if not old_team_agent:
            raise TeamAgentNotFoundException("TeamAgent not found")
        db_team_agent = cls.update_model_from_input(team_agent_model=old_team_agent, team_agent_input=team_agent)
        db_team_agent.modified_by = user.id
        
        db.session.add(db_team_agent)
        db.session.commit()

        return db_team_agent
     
    @classmethod
    def update_model_from_input(cls, team_agent_model: TeamAgentModel, team_agent_input: TeamAgentInput):
        for field in TeamAgentInput.__annotations__.keys():
            setattr(team_agent_model, field, getattr(team_agent_input, field))
        return team_agent_model  

    @classmethod
    @classmethod
    def get_team_agents(cls, db, query: QueryParams, account):
        filter_conditions = [or_(or_(TeamAgentModel.is_deleted == False, TeamAgentModel.is_deleted is None), TeamAgentModel.is_deleted is None)]

        # Iterate over fields in QueryParams
        for field in QueryParams.__annotations__.keys():
            if getattr(query, field):
                filter_conditions.append(getattr(TeamAgentModel, field) == getattr(query, field))

        team_agents = (
            db.session.query(TeamAgentModel)
            .filter(*filter_conditions)
            .all()
        )
        return team_agents

    @classmethod
    def get_team_agent_by_id(cls, db, team_agent_id, account):
        """
            Get TeamAgent from team_agent_id

            Args:
                session: The database session.
                team_agent_id(int) : Unique identifier of an TeamAgent.

            Returns:
                TeamAgent: TeamAgent object is returned.
        """
        # return db.session.query(TeamAgentModel).filter(TeamAgentModel.account_id == account.id, or_(or_(TeamAgentModel.is_deleted == False, TeamAgentModel.is_deleted is None), TeamAgentModel.is_deleted is None)).all()
        team_agents = (
            db.session.query(TeamAgentModel)
            .filter(TeamAgentModel.id == team_agent_id, or_(or_(TeamAgentModel.is_deleted == False, TeamAgentModel.is_deleted is None), TeamAgentModel.is_deleted is None))
            .first()
        )
        return team_agents

    @classmethod
    def delete_by_id(cls, db, team_agent_id, account):
        db_team_agent = db.session.query(TeamAgentModel).filter(TeamAgentModel.id == team_agent_id, TeamAgentModel.account_id==account.id).first()

        if not db_team_agent or db_team_agent.is_deleted:
            raise TeamAgentNotFoundException("TeamAgent not found")

        db_team_agent.is_deleted = True
        db.session.commit()

    
