# from __future__ import annotations

# import uuid
# from typing import List

# from fastapi_sqlalchemy.middleware import DBSessionMeta
# from sqlalchemy import UUID, Boolean, Column, ForeignKey, Index, String
# from sqlalchemy.orm import relationship
# from sqlalchemy.sql import and_, or_

# from exceptions import ConfigNotFoundException
# from models.base_model import BaseModel
# from typings.account import AccountOutput
# from typings.config import AccountSettings, ConfigInput, ConfigQueryParams
# from utils.encyption import decrypt_data, encrypt_data, is_encrypted


# class RunLogModel(BaseModel):
#     """
#     Model representing a log for run.

#     Attributes:
#         id (UUID): The primary key of the log.
#         key (String): The key of the tool configuration.
#         agent_id (UUID): The ID of the agent associated with the configuration.
#         toolkit_id (UUID): The ID of the toolkit associated with the configuration.
#         account_id (UUID): The ID of the account associated with the configuration.
#         workspace_id (UUID): The ID of the project associated with the configuration.
#         datasource_id (UUID): The ID of the datasource associated with the configuration.
#         value (String): The value of the tool configuration.
#         key_type (String): The type of key used.
#         is_secret (Boolean): Whether the tool configuration is a secret.
#         is_required (Boolean): Whether the tool configuration is a required field.
#         is_deleted (Boolean): Whether the tool configuration is deleted.
#     """

#     __tablename__ = "run_log"

#     id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)

#     input = Column(String)
#     output = Column(String)
#     type = Column(String)  # Tool,

#     run_id = Column(
#         UUID, ForeignKey("run.id", ondelete="CASCADE"), nullable=True, index=True
#     )

#     agent_id = Column(
#         UUID, ForeignKey("agent.id", ondelete="CASCADE"), nullable=True, index=True
#     )
#     account_id = Column(
#         UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True
#     )
#     workspace_id = Column(
#         UUID, ForeignKey("workspace.id", ondelete="CASCADE"), nullable=True, index=True
#     )
#     chat_id = Column(
#         UUID, ForeignKey("chat.id", ondelete="CASCADE"), nullable=True, index=True
#     )
#     session_id = Column(String, nullable=True, index=True)
#     value = Column(String)
#     key_type = Column(String)
#     is_secret = Column(Boolean)
#     is_required = Column(Boolean)
#     is_deleted = Column(Boolean, default=False, index=True)

#     created_by = Column(
#         UUID,
#         ForeignKey("user.id", name="fk_created_by", ondelete="CASCADE"),
#         nullable=True,
#         index=True,
#     )
#     modified_by = Column(
#         UUID,
#         ForeignKey("user.id", name="fk_modified_by", ondelete="CASCADE"),
#         nullable=True,
#         index=True,
#     )
#     creator = relationship("UserModel", foreign_keys=[created_by], lazy="select")

#     # Define indexes
#     # Index("ix_config_model_created_by_is_deleted", "created_by", "is_deleted")
#     # Index("ix_config_model_id_is_deleted", "id", "is_deleted")

#     def __repr__(self) -> str:
#         return (
#             f"Config(id={self.id}, "
#             f"key='{self.key}', value='{self.value}', "
#             f"key_type='{self.key_type}', is_secret={self.is_secret}, is_required={self.is_required}, "
#             f"is_deleted={self.is_deleted}, account_id={self.account_id})"
#         )
