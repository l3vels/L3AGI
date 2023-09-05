from __future__ import annotations
from typing import List, Optional
import uuid

from sqlalchemy import Column, String, Boolean, UUID, func, or_, ForeignKey
from sqlalchemy.orm import relationship, joinedload
from models.base_model import BaseModel
from typings.agent import ConfigInput, AgentInput
from models.agent_config import AgentConfigModel
from exceptions import AgentNotFoundException

class AgentModel(BaseModel):
    """
    Represents an agent entity.

    Attributes:
        id (UUID): Unique identifier of the agent.
        name (str): Name of the agent.
        role (str): Role of the agent.
        description (str): Description of the agent.
        is_deleted (bool): Flag indicating if the agent has been soft-deleted.
        is_template (bool): Flag indicating if the agent is a template.
        user_id (UUID): ID of the user associated with the agent.
        account_id (UUID): ID of the account associated with the agent.
        is_system (bool): Flag indicating if the agent is a system agent.
        configs: Relationship with agent configurations.
    """
    __tablename__ = 'agent'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    role = Column(String) 
    project_id = Column(UUID, ForeignKey('project.id'), nullable=True) #gonna use if need store agents based on game, project or any
    agent_type = Column(String) # Later add as Enum
    description = Column(String)
    is_deleted = Column(Boolean, default=False)
    is_template = Column(Boolean, default=False)
    is_memory = Column(Boolean, default=True)
    avatar = Column(String)
    account_id = Column(UUID, nullable=True)
    
    is_system = Column(Boolean, default=False)
    
    configs = relationship("AgentConfigModel", back_populates="agent", cascade="all, delete")
    # account = relationship("AccountModel", back_populates="account", cascade="all, delete")
    # project = relationship("ProjectModel", back_populates="project", cascade="all, delete")
    team_agents = relationship("TeamAgentModel", back_populates="agent")
    
    def __repr__(self) -> str:
        return (
            f"Agent(id={self.id}, "
            f"name='{self.name}', role='{self.role}', description='{self.description}', "
            f"is_deleted={self.is_deleted}, is_template={self.is_template}, user_id={self.created_by}, "
            f"account_id={self.account_id}, is_system={self.is_system})"
        )

    @classmethod
    def create_agent(cls, db, agent, configs: List[ConfigInput], user, account):
        """
        Creates a new agent with the provided configuration.

        Args:
            db: The database object.
            agent_with_config: The object containing the agent and configuration details.

        Returns:
            Agent: The created agent.

        """
        db_agent = AgentModel(
                         created_by=user.id, 
                         account_id=account.id,
                         )
        cls.update_model_from_input(db_agent, agent)
        db.session.add(db_agent)
        db.session.flush()  # Flush pending changes to generate the agent's ID
        db.session.commit()

        AgentConfigModel.create_or_update(db, db_agent, configs, user, account)
        
        return db_agent
       
    @classmethod
    def update_agent(cls, db, id, agent, configs: List[ConfigInput], user, account):
        """
        Creates a new agent with the provided configuration.

        Args:
            db: The database object.
            agent_with_config: The object containing the agent and configuration details.

        Returns:
            Agent: The created agent.

        """
        old_agent = cls.get_agent_by_id(db=db, agent_id=id, account=account)
        if not old_agent:
            raise AgentNotFoundException("Agent not found")
        db_agent = cls.update_model_from_input(agent_model=old_agent, agent_input=agent)
        db_agent.modified_by = user.id
        
        db.session.add(db_agent)
        db.session.commit()
        
        AgentConfigModel.create_or_update(db, db_agent, configs, user, account)

        return db_agent
     
    @classmethod
    def update_model_from_input(cls, agent_model: AgentModel, agent_input: AgentInput):
        for field in AgentInput.__annotations__.keys():
            setattr(agent_model, field, getattr(agent_input, field))
        return agent_model  

    @classmethod
    def get_agents(cls, db, account):
        agents = (
            db.session.query(AgentModel)
            .join(AgentConfigModel, AgentModel.id == AgentConfigModel.agent_id)
            .filter(AgentModel.account_id == account.id, or_(or_(AgentModel.is_deleted == False, AgentModel.is_deleted is None), AgentModel.is_deleted is None))
            .options(joinedload(AgentModel.configs))  # if you have a relationship set up named "configs"
            .all()
        )
        return agents

    @classmethod
    def get_template_agents(cls, db):
        agents = (
            db.session.query(AgentModel)
            .join(AgentConfigModel, AgentModel.id == AgentConfigModel.agent_id)
            .filter(or_(AgentModel.is_deleted == False, AgentModel.is_deleted.is_(None)),
                    AgentModel.is_template == True)
            .options(joinedload(AgentModel.configs))  # if you have a relationship set up named "configs"
            .all()
        )
        return agents  

    @classmethod
    def get_system_agents(cls, db):
        agents = (
            db.session.query(AgentModel)
            .join(AgentConfigModel, AgentModel.id == AgentConfigModel.agent_id)
            .filter(or_(AgentModel.is_deleted == False, AgentModel.is_deleted.is_(None)),
                    AgentModel.is_system == True)
            .options(joinedload(AgentModel.configs))  # if you have a relationship set up named "configs"
            .all()
        )
        return agents    
    

    @classmethod
    def get_agent_by_id(cls, db, agent_id, account):
        """
            Get Agent from agent_id

            Args:
                session: The database session.
                agent_id(int) : Unique identifier of an Agent.

            Returns:
                Agent: Agent object is returned.
        """
        # return db.session.query(AgentModel).filter(AgentModel.account_id == account.id, or_(or_(AgentModel.is_deleted == False, AgentModel.is_deleted is None), AgentModel.is_deleted is None)).all()
        agents = (
            db.session.query(AgentModel)
            .join(AgentConfigModel, AgentModel.id == AgentConfigModel.agent_id)
            .filter(AgentModel.id == agent_id, or_(or_(AgentModel.is_deleted == False, AgentModel.is_deleted is None), AgentModel.is_deleted is None))
            .options(joinedload(AgentModel.configs))  # if you have a relationship set up named "configs"
            .first()
        )
        return agents

    @classmethod
    def delete_by_id(cls, db, agent_id, account):
        db_agent = db.session.query(AgentModel).filter(AgentModel.id == agent_id, AgentModel.account_id==account.id).first()

        if not db_agent or db_agent.is_deleted:
            raise AgentNotFoundException("Agent not found")

        db_agent.is_deleted = True
        db.session.commit()

    

    