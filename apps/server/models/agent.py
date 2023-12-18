from __future__ import annotations

import uuid
from typing import List

from sqlalchemy import UUID, Boolean, Column, ForeignKey, Index, String, or_
from sqlalchemy.orm import Session, joinedload, relationship
from sqlalchemy.sql import and_

from exceptions import AgentNotFoundException
from models.agent_config import AgentConfigModel
from models.base_model import BaseModel
from models.user import UserModel
from models.workspace import WorkspaceModel  # noqa
from typings.agent import AgentInput, ConfigInput


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
        is_public (bool): Flag indicating if the agent is a system agent.
        configs: Relationship with agent configurations.
    """

    # __abstract__ = True
    __tablename__ = "agent"
    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, index=True)
    avatar = Column(String(300), default=None)
    role = Column(String)
    parent_id = Column(
        UUID, ForeignKey("agent.id", ondelete="CASCADE"), nullable=True, index=True
    )
    workspace_id = Column(
        UUID, ForeignKey("workspace.id", ondelete="CASCADE"), nullable=True, index=True
    )
    agent_type = Column(String)  # Later add as Enum
    description = Column(String)
    is_deleted = Column(Boolean, default=False, index=True)
    is_template = Column(Boolean, default=False, index=True)
    is_memory = Column(Boolean, default=True)
    # avatar = Column(String)
    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True, index=True
    )
    is_public = Column(Boolean, default=False, index=True)

    configs = relationship("AgentConfigModel", back_populates="agent", lazy="select")
    chat_messages = relationship("ChatMessage", back_populates="agent", lazy="select")
    team_agents = relationship("TeamAgentModel", back_populates="agent", lazy="select")
    chat = relationship("ChatModel", back_populates="agent", lazy="select")
    account = relationship("AccountModel", lazy="select")

    created_by = Column(
        UUID,
        ForeignKey("user.id", name="fk_created_by", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    modified_by = Column(
        UUID,
        ForeignKey("user.id", name="fk_modified_by", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    creator = relationship("UserModel", foreign_keys=[created_by], lazy="select")

    # Define indexes
    __table_args__ = (
        Index("ix_agent_model_account_id_is_deleted", "account_id", "is_deleted"),
        Index("ix_agent_model_created_by_is_deleted", "created_by", "is_deleted"),
        Index("ix_agent_model_id_is_deleted", "id", "is_deleted"),
    )

    def __repr__(self) -> str:
        return (
            f"Agent(id={self.id}, "
            f"name='{self.name}', role='{self.role}', description='{self.description}', "
            f"is_deleted={self.is_deleted}, is_template={self.is_template}, user_id={self.created_by}, "
            f"account_id={self.account_id}, is_public={self.is_public})"
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
        old_agent = cls.get_agent_by_id(db=db, agent_id=id)
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
    def create_agent_from_template(
        cls, db, template_id, user, account, check_is_template: True
    ):
        """
        Creates a new agent with the provided configuration.

        Args:
            db: The database object.
            agent_with_config: The object containing the agent and configuration details.

        Returns:
            Agent: The crated agent.

        """
        template_agent = cls.get_agent_by_id(db=db, agent_id=template_id)
        if check_is_template:
            if template_agent is None or not (
                template_agent.is_public or template_agent.is_template
            ):
                raise AgentNotFoundException("Agent not found")

        new_agent = AgentModel(
            name=template_agent.name,
            role=template_agent.role,
            agent_type=template_agent.agent_type,
            description=template_agent.description,
            is_memory=template_agent.is_memory,
            is_public=False,
            is_template=False,
            created_by=user.id,
            account_id=account.id,
            modified_by=None,
            parent_id=template_agent.id,
            avatar=template_agent.avatar,
        )

        db.session.add(new_agent)
        db.session.commit()

        AgentConfigModel.create_configs_from_template(
            db=db,
            configs=template_agent.configs,
            user=user,
            account=account,
            agent_id=new_agent.id,
            check_is_template=check_is_template,
        )

        return new_agent

    @classmethod
    def get_agents(cls, db, account):
        agents = (
            db.session.query(AgentModel)
            # .join(AgentConfigModel, AgentModel.id == AgentConfigModel.agent_id)
            .outerjoin(UserModel, AgentModel.created_by == UserModel.id)
            .filter(
                AgentModel.account_id == account.id,
                or_(
                    or_(
                        AgentModel.is_deleted.is_(False), AgentModel.is_deleted is None
                    ),
                    AgentModel.is_deleted is None,
                ),
            )
            # .options(joinedload(AgentModel.configs))  # if you have a relationship set up named "configs"
            .options(joinedload(AgentModel.creator))
            .order_by(AgentModel.created_on.desc())
            # .options(joinedload(AgentModel.configs))  # if you have a relationship set up named "configs"
            # .options(joinedload(UserModel.agents))
            .all()
        )
        return agents

    @classmethod
    def get_template_agents(cls, session: Session, account_id: UUID):
        query = session.query(AgentModel)

        if account_id is not None:
            query = query.filter(
                or_(
                    and_(
                        AgentModel.account_id == account_id,
                        AgentModel.is_template.is_(True),
                    ),
                    AgentModel.is_public.is_(True),
                )
            )
        else:
            query = query.filter(AgentModel.is_public.is_(True))

        agents = (
            query.filter(
                AgentModel.is_deleted.is_(False),
            )
            .options(joinedload(AgentModel.creator))
            .options(joinedload(AgentModel.configs))
            .all()
        )
        return agents

    @classmethod
    def get_public_agents(cls, db):
        agents = (
            db.session.query(AgentModel)
            # .join(AgentConfigModel, AgentModel.id == AgentConfigModel.agent_id)
            .outerjoin(UserModel, AgentModel.created_by == UserModel.id)
            .filter(
                or_(AgentModel.is_deleted.is_(False), AgentModel.is_deleted.is_(None)),
                AgentModel.is_public.is_(True),
            )
            .options(joinedload(AgentModel.creator))
            .options(
                joinedload(AgentModel.configs)
            )  # if you have a relationship set up named "configs"
            # .options(joinedload(UserModel.agents))
            .all()
        )
        return agents

    @classmethod
    def get_agent_by_name(cls, session, account_id: UUID, agent_name: str):
        agent = (
            session.query(AgentModel)
            .outerjoin(UserModel, AgentModel.created_by == UserModel.id)
            .filter(
                AgentModel.account_id == account_id,
                AgentModel.is_deleted.is_(False),
                AgentModel.name.ilike(f"%{agent_name}%"),
            )
            .options(joinedload(AgentModel.configs))
            .options(joinedload(AgentModel.creator))
            .first()
        )
        return agent

    @classmethod
    def get_agent_by_id(cls, db, agent_id):
        """
        Get Agent from agent_id

        Args:
            session: The database session.
            agent_id(int) : Unique identifier of an Agent.

        Returns:
            Agent: Agent object is returned.
        """
        agent = (
            db.session.query(AgentModel)
            .outerjoin(AgentConfigModel, AgentModel.id == AgentConfigModel.agent_id)
            .outerjoin(UserModel, AgentModel.created_by == UserModel.id)
            .filter(
                AgentModel.id == agent_id,
                or_(
                    or_(
                        AgentModel.is_deleted.is_(False), AgentModel.is_deleted is None
                    ),
                    AgentModel.is_deleted is None,
                ),
            )
            .options(
                joinedload(AgentModel.configs)
            )  # if you have a relationship set up named "configs"
            .options(joinedload(AgentModel.creator))
            # .options(joinedload(AgentModel.configs))  # if you have a relationship set up named "configs"
            # .options(joinedload(UserModel.agents))
            .first()
        )
        return agent

    @classmethod
    def get_by_parent_id(cls, db, parent_id, account):
        """
        Get Agent from agent_id

        Args:
            session: The database session.
            agent_id(int) : Unique identifier of an Agent.

        Returns:
            Agent: Agent object is returned.
        """
        agent = (
            db.session.query(AgentModel)
            .outerjoin(
                AgentConfigModel, AgentModel.id == AgentConfigModel.agent_id
            )  # Corrected line
            .outerjoin(UserModel, AgentModel.created_by == UserModel.id)
            .filter(
                AgentModel.parent_id == parent_id,
                AgentModel.account_id == account.id,
                or_(
                    or_(
                        AgentModel.is_deleted.is_(False), AgentModel.is_deleted is None
                    ),
                    AgentModel.is_deleted is None,
                ),
            )
            .options(
                joinedload(AgentModel.configs)
            )  # if you have a relationship set up named "configs"
            .options(joinedload(AgentModel.creator))
            # .options(joinedload(AgentModel.configs))  # if you have a relationship set up named "configs"
            # .options(joinedload(UserModel.agents))
            .first()
        )
        return agent

    @classmethod
    def get_agent_by_id_with_account(cls, db, agent_id):
        """
        Get Agent from agent_id

        Args:
            session: The database session.
            agent_id(int) : Unique identifier of an Agent.

        Returns:
            Agent: Agent object is returned.
        """
        # return db.session.query(AgentModel).filter(AgentModel.account_id == account.id, or_(or_(AgentModel.is_deleted.is_(False), AgentModel.is_deleted is None), AgentModel.is_deleted is None)).all()
        agents = (
            db.session.query(AgentModel)
            .outerjoin(AgentConfigModel, AgentModel.id == AgentConfigModel.agent_id)
            .outerjoin(UserModel, AgentModel.created_by == UserModel.id)
            .filter(
                AgentModel.id == agent_id,
                or_(
                    or_(
                        AgentModel.is_deleted.is_(False), AgentModel.is_deleted is None
                    ),
                    AgentModel.is_deleted is None,
                ),
            )
            .options(
                joinedload(AgentModel.configs)
            )  # if you have a relationship set up named "configs"
            .options(joinedload(AgentModel.creator))
            .options(joinedload(AgentModel.account))
            .first()
        )
        return agents

    @classmethod
    def delete_by_id(cls, db, agent_id, account):
        db_agent = (
            db.session.query(AgentModel)
            .filter(AgentModel.id == agent_id, AgentModel.account_id == account.id)
            .first()
        )

        if not db_agent or db_agent.is_deleted:
            raise AgentNotFoundException("Agent not found")

        db_agent.is_deleted = True
        db.session.commit()
