from __future__ import annotations

import uuid
from typing import List

from sqlalchemy import UUID, Boolean, Column, ForeignKey, Index, String
from sqlalchemy.orm import Session, relationship
from sqlalchemy.sql import and_, or_

from models.base_model import BaseModel
from typings.account import AccountOutput
from typings.config import AccountSettings, ConfigInput, ConfigQueryParams
from typings.run import RunInput
from utils.encyption import decrypt_data, encrypt_data, is_encrypted


class RunModel(BaseModel):
    """
    Model representing a run.

    Attributes:
        id (UUID): The primary key of the log.
        key (String): The key of the tool configuration.
        agent_id (UUID): The ID of the agent associated with the configuration.
        toolkit_id (UUID): The ID of the toolkit associated with the configuration.
        account_id (UUID): The ID of the account associated with the configuration.
        workspace_id (UUID): The ID of the project associated with the configuration.
        datasource_id (UUID): The ID of the datasource associated with the configuration.
        value (String): The value of the tool configuration.
        key_type (String): The type of key used.
        is_secret (Boolean): Whether the tool configuration is a secret.
        is_required (Boolean): Whether the tool configuration is a required field.
        is_deleted (Boolean): Whether the tool configuration is deleted.
    """

    __tablename__ = "run"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)

    agent_id = Column(
        UUID, ForeignKey("agent.id", ondelete="CASCADE"), nullable=True, index=True
    )

    team_id = Column(
        UUID, ForeignKey("team.id", ondelete="CASCADE"), nullable=True, index=True
    )

    chat_id = Column(
        UUID, ForeignKey("chat.id", ondelete="CASCADE"), nullable=True, index=True
    )

    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True
    )

    workspace_id = Column(
        UUID, ForeignKey("workspace.id", ondelete="CASCADE"), nullable=True, index=True
    )

    session_id = Column(String, nullable=True, index=True)

    is_deleted = Column(Boolean, default=False, index=True)

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
    # Index("ix_config_model_created_by_is_deleted", "created_by", "is_deleted")
    # Index("ix_config_model_id_is_deleted", "id", "is_deleted")

    def __repr__(self) -> str:
        return (
            f"Run(id={self.id}, "
            f"is_deleted={self.is_deleted}, account_id={self.account_id})"
        )

    @classmethod
    def create_run(cls, session: Session, run: RunInput, user, account):
        """
        Creates a new run with the provided configuration.

        Args:
            db: The database object.
            config_with_config: The object containing the run and configuration details.

        Returns:
            Run: The created run.

        """
        db_run = RunModel(
            created_by=user.id,
            account_id=account.id,
        )

        cls.update_model_from_input(db_run, run)

        session.add(db_run)
        session.flush()  # Flush pending changes to generate the config's ID
        session.commit()

        return db_run

    @classmethod
    def update_model_from_input(cls, run_model: RunModel, run_input: RunInput):
        for field in RunInput.__annotations__.keys():
            setattr(run_model, field, getattr(run_input, field))

        return run_model
