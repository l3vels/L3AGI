from sqlalchemy import Column, UUID, String, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship
from models.base_model import BaseModel
import uuid


class ChatMessage(BaseModel):
    """
    Model representing a chat message.

    Attributes:
        parent_id: The ID of the human message which AI message answers to.
    """

    __tablename__ = 'chat_message'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    parent_id = Column(UUID, ForeignKey('chat_message.id'))
    game_id = Column(UUID)
    session_id = Column(String, nullable=False, index=True)
    user_id = Column(UUID, nullable=False)
    account_id = Column(UUID, nullable=False)
    message = Column(JSONB, nullable=False)
    thoughts = Column(JSONB)
    version = Column(String, nullable=False)

    parent = relationship("ChatMessage", remote_side=[id], cascade="all, delete")
