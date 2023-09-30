from sqlalchemy import Column, UUID, String, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from models.base_model import BaseModel
import uuid
from typings.account import AccountOutput

class Chat(BaseModel):
    """
    Model representing a chat message.

    Attributes:
        parent_id: The ID of the human message which AI message answers to.
    """

    __tablename__ = 'chat'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)    
    session_id = Column(String, nullable=False, index=True)
    name = Column(String)
    agent_id = Column(UUID, ForeignKey('agent.id', ondelete='CASCADE'), index=True)
    team_id = Column(UUID, ForeignKey('team.id', ondelete='CASCADE'), index=True)
    user_id = Column(UUID,  ForeignKey('user.id', ondelete='CASCADE'), nullable=True, index=True)
    account_id = Column(UUID, ForeignKey('account.id', ondelete='CASCADE'), nullable=True, index=True)
    max_chat_messages = Column(Integer, nullable=True)
    
    
    agent = relationship("AgentModel", back_populates="chat")
    team = relationship("TeamModel", back_populates="chat")
    configs = relationship("ConfigModel", lazy='select')
        
    created_by = Column(UUID, ForeignKey('user.id', name='fk_created_by', ondelete='CASCADE'), nullable=True, index=True)
    modified_by = Column(UUID, ForeignKey('user.id', name='fk_modified_by', ondelete='CASCADE'), nullable=True, index=True)
    creator = relationship("UserModel", foreign_keys=[user_id], lazy='select')

    @classmethod
    def get_chat_by_id(cls, db, chat_id: UUID, account: AccountOutput):
        """
            Get Chat message from chat_id

            Args:
                session: The database session.
                chat_id(UUID) : Unique identifier of an Chat message.

            Returns:
                Chat message: Chat message object is returned.
        """
        chat = (
            db.session.query(Chat)
            .filter(Chat.id == chat_id, Chat.account_id == account.id)
            .first()
        )

        return chat

    def to_dict(self):
        """
        Converts the current SQLAlchemy ORM object to a dictionary representation.

        Returns:
            A dictionary mapping column names to their corresponding values.
        """
        data = {column.name: getattr(self, column.name) for column in self.__table__.columns}

        if self.agent:
            data['agent'] = self.agent.to_dict()

        if self.team:
            data['team'] = self.team.to_dict()

        if self.parent:
            data['parent'] = self.parent.to_dict()

        if self.creator:
            data['creator'] = self.creator.to_dict()

        return data