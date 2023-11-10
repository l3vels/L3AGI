import uuid

from sqlalchemy import UUID, Column, ForeignKey, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship

from models.base_model import BaseModel
from typings.account import AccountOutput


class ChatMessage(BaseModel):
    """
    Model representing a chat message.

    Attributes:
        parent_id: The ID of the human message which AI message answers to.
    """

    __tablename__ = "chat_message"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    parent_id = Column(
        UUID, ForeignKey("chat_message.id", ondelete="CASCADE"), index=True
    )
    session_id = Column(String, nullable=False, index=True)
    agent_id = Column(UUID, ForeignKey("agent.id", ondelete="CASCADE"), index=True)
    team_id = Column(UUID, ForeignKey("team.id", ondelete="CASCADE"), index=True)
    sender_user_id = Column(
        UUID, ForeignKey("user.id", ondelete="CASCADE"), nullable=True, index=True
    )
    sender_account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=False, index=True
    )
    chat_id = Column(
        UUID, ForeignKey("chat.id", ondelete="CASCADE"), nullable=True, index=True
    )

    # schedule_id = Column(UUID, ForeignKey("schedule.id"), nullable=True, index=True)

    run_id = Column(
        UUID, ForeignKey("run.id", ondelete="CASCADE"), nullable=True, index=True
    )

    voice_url = Column(String(500), default=None, nullable=True)

    message = Column(JSONB, nullable=False)
    thoughts = Column(JSONB)
    sender_name = Column(
        String,
        nullable=True,
    )

    parent = relationship("ChatMessage", remote_side=[id], cascade="all, delete")
    agent = relationship("AgentModel", back_populates="chat_messages")
    team = relationship("TeamModel", back_populates="chat_messages")
    chat = relationship("ChatModel", back_populates="chat_messages")

    # created_by = Column(UUID, ForeignKey('user.id', name='fk_created_by', ondelete='CASCADE'), nullable=True, index=True)
    # modified_by = Column(UUID, ForeignKey('user.id', name='fk_modified_by', ondelete='CASCADE'), nullable=True, index=True)
    sender_user = relationship(
        "UserModel", foreign_keys=[sender_user_id], lazy="select"
    )
    sender_account = relationship(
        "AccountModel", foreign_keys=[sender_account_id], lazy="select"
    )

    @classmethod
    def get_chat_message_by_id(cls, db, chat_message_id: UUID, account: AccountOutput):
        """
        Get Chat message from chat_message_id

        Args:
            session: The database session.
            chat_message_id(UUID) : Unique identifier of an Chat message.

        Returns:
            Chat message: Chat message object is returned.
        """
        chat_message = (
            db.session.query(ChatMessage)
            .filter(
                ChatMessage.id == chat_message_id,
                ChatMessage.sender_account_id == account.id,
            )
            .first()
        )

        return chat_message

    @staticmethod
    def update_voice_url_by_id(db, chat_message_id: UUID, new_voice_url: str):
        """
        Retrieve a ChatMessage by its ID and update the voice_url.

        Args:
            db: The database session.
            chat_message_id(UUID): The ID of the ChatMessage to be updated.
            new_voice_url(str): The new voice_url to be updated.

        Returns:
            None
        """
        chat_message = (
            db.session.query(ChatMessage)
            .filter(ChatMessage.id == chat_message_id)
            .first()
        )
        if chat_message:
            chat_message.voice_url = new_voice_url
            db.session.commit()

    def to_dict(self):
        """
        Converts the current SQLAlchemy ORM object to a dictionary representation.

        Returns:
            A dictionary mapping column names to their corresponding values.
        """
        data = {
            column.name: getattr(self, column.name) for column in self.__table__.columns
        }

        if self.agent:
            data["agent"] = self.agent.to_dict()

        if self.team:
            data["team"] = self.team.to_dict()

        if self.parent:
            data["parent"] = self.parent.to_dict()

        if self.sender_user:
            data["sender_user"] = self.sender_user.to_dict()

        if self.sender_account:
            data["sender_account"] = self.sender_account.to_dict()

        return data
