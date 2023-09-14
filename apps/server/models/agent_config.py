from sqlalchemy import Column, Text, String, UUID, ForeignKey
from sqlalchemy.orm import relationship
from typing import Union

from config import get_config
from utils.encyption import decrypt_data
from models.base_model import BaseModel
import uuid
from typings.agent import ConfigInput

    
class AgentConfigModel(BaseModel):
    """
    Agent related configurations like goals, instructions, constraints and tools are stored here

    Attributes:
        id (int): The unique identifier of the agent configuration.
        agent_id (int): The identifier of the associated agent.
        key (str): The key of the configuration setting.
        value (str): The value of the configuration setting.
    """

    __tablename__ = 'agent_config'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    agent_id = Column(UUID(as_uuid=True), ForeignKey('agent.id'), index=True)
    key = Column(String, index=True)
    value = Column(Text)
    
    agent = relationship("AgentModel", back_populates="configs", cascade="all, delete")
    
    created_by = Column(UUID, ForeignKey('user.id', name='fk_created_by'), nullable=True, index=True)
    modified_by = Column(UUID, ForeignKey('user.id', name='fk_modified_by'), nullable=True, index=True)
    creator = relationship("UserModel", foreign_keys=[created_by], cascade="all, delete", lazy='noload')

    def __repr__(self):
        """
        Returns a string representation of the Agent Configuration object.

        Returns:
            str: String representation of the Agent Configuration.

        """
        return f"AgentConfig(id={self.id}, key={self.key}, value={self.value})" 
    
    @classmethod 
    def create_or_update(cls, db, agent, update_configs, user, account):  
        """
        Create or update agent configurations in the database.

        Args:
            db (Session): The database session.
            agent (AgentModel): The agent object.
            update_configs (ConfigInput): The updated configurations.

        Returns:
            List[AgentConfigModel]: The list of created or updated configurations.
        """
        db_configs= db.session.query(AgentConfigModel).filter(
            AgentConfigModel.agent_id == agent.id,
        ).all()
        changes= []
        for key in ConfigInput.__annotations__.keys():
            #search db_configs 
            matching_configs = [config for config in db_configs if getattr(config, "key", None) == key]
            if(matching_configs):
                db_config = matching_configs[0]
                db_config.value = str(getattr(update_configs, key))
                db_config.modified_by = user.id
                changes.append(db_config)
            else:
                new_config = AgentConfigModel(
                    agent_id=agent.id,
                    key=key,
                    value=str(getattr(update_configs, key))
                )
                new_config.created_by = user.id
                changes.append(new_config)
        
        db.session.add_all(changes)
        db.session.flush()
        db.session.commit()
                
        return changes