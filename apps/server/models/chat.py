import uuid

from sqlalchemy import (UUID, Boolean, Column, ForeignKey, Integer, String,
                        and_, or_)
from sqlalchemy.orm import joinedload, relationship

from exceptions import ChatNotFoundException
from models.account import AccountModel
from models.agent import AgentModel
from models.base_model import BaseModel
from models.team import TeamModel
from models.user import UserModel
from typings.account import AccountOutput
from typings.chat import ChatInput, UpdateChatInput


def is_valid_uuid(string):
    try:
        uuid_obj = uuid.UUID(string)
        return str(uuid_obj) == string
    except ValueError:
        return False


class ChatModel(BaseModel):
    """
    Model representing a chat message.

    Attributes:
        parent_id: The ID of the human message which AI message answers to.
    """

    __tablename__ = "chat"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    session_id = Column(String, nullable=True, index=True)
    name = Column(String, nullable=True)
    agent_id = Column(UUID, ForeignKey("agent.id", ondelete="CASCADE"), index=True)
    team_id = Column(UUID, ForeignKey("team.id", ondelete="CASCADE"), index=True)

    campaign_id = Column(UUID, nullable=True, index=True)

    voice_url = Column(String, nullable=True)

    parent_id = Column(UUID, ForeignKey("chat.id", ondelete="CASCADE"), index=True)

    creator_user_id = Column(
        UUID,
        ForeignKey("user.id", name="fk_creator_user_id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    creator_account_id = Column(
        UUID,
        ForeignKey("account.id", name="fk_creator_account_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    provider_user_id = Column(
        UUID,
        ForeignKey("user.id", name="fk_provider_user_id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    provider_account_id = Column(
        UUID,
        ForeignKey("account.id", name="fk_provider_account_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    is_deleted = Column(Boolean, default=False, index=True)
    max_chat_messages = Column(Integer, nullable=True)
    is_public = Column(Boolean, default=False, index=True)

    agent = relationship("AgentModel", back_populates="chat")
    team = relationship("TeamModel", back_populates="chat")
    configs = relationship("ConfigModel", lazy="select")
    chat_messages = relationship("ChatMessage", back_populates="chat", lazy="select")

    # created_by = Column(UUID, ForeignKey('user.id', name='fk_created_by', ondelete='CASCADE'), nullable=True, index=True)
    # modified_by = Column(UUID, ForeignKey('user.id', name='fk_modified_by', ondelete='CASCADE'), nullable=True, index=True)
    # creator = relationship("UserModel", foreign_keys=[user_id], lazy='select')
    creator_user = relationship(
        "UserModel", foreign_keys=[creator_user_id], lazy="select"
    )
    creator_account = relationship(
        "AccountModel", foreign_keys=[creator_account_id], lazy="select"
    )
    provider_user = relationship(
        "UserModel", foreign_keys=[provider_user_id], lazy="select"
    )
    provider_account = relationship(
        "AccountModel", foreign_keys=[provider_account_id], lazy="select"
    )

    @classmethod
    def get_chat_by_id_and_account(cls, db, chat_id: UUID, account: AccountOutput):
        """
        Get Chat message from chat_id

        Args:
            session: The database session.
            chat_id(UUID) : Unique identifier of an Chat message.

        Returns:
            Chat message: Chat message object is returned.
        """
        # Create aliases for UserModel
        chat = (
            db.session.query(ChatModel)
            .outerjoin(UserModel, ChatModel.creator_user_id == UserModel.id)
            .outerjoin(AccountModel, ChatModel.creator_account_id == AccountModel.id)
            .outerjoin(TeamModel, ChatModel.team_id == TeamModel.id)
            .outerjoin(AgentModel, ChatModel.agent_id == AgentModel.id)
            .filter(
                ChatModel.id == chat_id, ChatModel.provider_account_id == account.id
            )
            .options(joinedload(ChatModel.team))
            .options(joinedload(ChatModel.agent))
            .options(joinedload(ChatModel.creator_user))
            .options(joinedload(ChatModel.creator_account))
            .first()
        )

        return chat

    @classmethod
    def get_chat_by_id(cls, db, chat_id: UUID):
        """
        Get Chat message from chat_id

        Args:
            session: The database session.
            chat_id(UUID) : Unique identifier of an Chat message.

        Returns:
            Chat message: Chat message object is returned.
        """
        chat = (
            db.session.query(ChatModel)
            .outerjoin(UserModel, ChatModel.creator_user_id == UserModel.id)
            .outerjoin(AccountModel, ChatModel.creator_account_id == AccountModel.id)
            .outerjoin(TeamModel, ChatModel.team_id == TeamModel.id)
            .outerjoin(AgentModel, ChatModel.agent_id == AgentModel.id)
            .filter(ChatModel.id == chat_id)
            .options(joinedload(ChatModel.team))
            .options(joinedload(ChatModel.agent))
            .options(joinedload(ChatModel.creator_user))
            .options(joinedload(ChatModel.creator_account))
            .first()
        )

        return chat

    @classmethod
    def create_chat(cls, db, chat: ChatInput, user, account):
        """
        Creates a new agent with the provided configuration.

        Args:
            db: The database object.
            agent_with_config: The object containing the agent and configuration details.

        Returns:
            Agent: The created agent.

        """
        db_chat = ChatModel()
        if chat.team_id:
            team = TeamModel.get_team_by_id(db, chat.team_id)
            if not team:
                ChatNotFoundException("Team not found!")
            db_chat.team_id = team.id
            db_chat.provider_user_id = team.created_by
            db_chat.provider_account_id = team.account_id

        if chat.agent_id:
            agent = AgentModel.get_agent_by_id(db, chat.agent_id)
            if not agent:
                ChatNotFoundException("Agent not found!")
            db_chat.agent_id = agent.id
            db_chat.provider_user_id = agent.created_by
            db_chat.provider_account_id = agent.account_id

        db_chat.creator_user_id = user.id
        db_chat.creator_account_id = account.id

        cls.update_model_from_input(db_chat, chat)
        db.session.add(db_chat)
        db.session.flush()  # Flush pending changes to generate the agent's ID
        db.session.commit()

        return db_chat

    @classmethod
    def update_chat(
        cls,
        db,
        id: UUID,
        chat_input: UpdateChatInput,
        user,
    ):
        db_chat = cls.get_chat_by_id(db=db, chat_id=id)
        if not db_chat:
            raise ChatNotFoundException("Chat not found!")

        for field in UpdateChatInput.__annotations__.keys():
            if hasattr(chat_input, field):
                setattr(db_chat, field, getattr(chat_input, field))

        db_chat.modified_by = user.id

        # db.session.add(db_chat)
        db.session.commit()

        return db_chat

    @classmethod
    def update_model_from_input(cls, chat_model: "ChatModel", chat_input: ChatInput):
        for field in ChatInput.__annotations__.keys():
            if hasattr(chat_input, field):
                setattr(chat_model, field, getattr(chat_input, field))

    @classmethod
    def get_chats(cls, db, account, filter_list, page=1, per_page=10):
        offset = (page - 1) * per_page

        filter_conditions = [
            or_(
                ChatModel.name.ilike(f"%{filter_string}%"),
                AgentModel.name.ilike(f"%{filter_string}%"),
                AgentModel.agent_type.ilike(f"%{filter_string}%"),
                ChatModel.campaign_id == filter_string
                if is_valid_uuid(filter_string)
                else None,
                AgentModel.id == filter_string
                if is_valid_uuid(filter_string)
                else None,
            )
            for filter_string in filter_list
        ]

        query = (
            db.session.query(ChatModel)
            .outerjoin(UserModel, ChatModel.creator_user_id == UserModel.id)
            .outerjoin(AccountModel, ChatModel.creator_account_id == AccountModel.id)
            .outerjoin(TeamModel, ChatModel.team_id == TeamModel.id)
            .outerjoin(AgentModel, ChatModel.agent_id == AgentModel.id)
            .order_by(ChatModel.created_on.desc())
            .filter(
                ChatModel.creator_account_id == account.id,
                or_(
                    or_(
                        ChatModel.is_deleted.is_(False), ChatModel.is_deleted.is_(None)
                    ),
                    ChatModel.is_deleted.is_(None),
                ),
                or_(*filter_conditions),
            )
            .options(
                joinedload(ChatModel.team),
                joinedload(ChatModel.agent),
                joinedload(ChatModel.creator_user),
                joinedload(ChatModel.creator_account),
            )
        )

        chats = query.offset(offset).limit(per_page).all()
        total_count = query.count()

        return chats, total_count

    @classmethod
    def delete_by_id(cls, db, chat_id, account):
        db_chat = (
            db.session.query(ChatModel)
            .filter(
                ChatModel.id == chat_id, ChatModel.provider_account_id == account.id
            )
            .first()
        )

        if not db_chat or db_chat.is_deleted:
            raise ChatNotFoundException("Agent not found")

        db_chat.is_deleted = True
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

        if self.creator_user:
            data["creator_user"] = self.creator_user.to_dict()

        if self.creator_account:
            data["creator_account"] = self.creator_account.to_dict()

        if self.provider_user:
            data["provider_user"] = self.provider_user.to_dict()

        if self.provider_account:
            data["provider_account"] = self.provider_account.to_dict()

        return data
