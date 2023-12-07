from __future__ import annotations

import secrets
import uuid

from sqlalchemy import UUID, Boolean, Column, ForeignKey, String, or_
from sqlalchemy.orm import Session, relationship

from exceptions import ApiKeyNotFoundException
from models.base_model import BaseModel
from typings.api_key import ApiKeyInput


class ApiKeyModel(BaseModel):
    """
    Represents an api_key entity.

    Attributes:
        id (UUID): Unique identifier of the api_key.
        name (str): Name of the api_key.
        role (str): Role of the api_key.
        description (str): Description of the api_key.
        is_deleted (bool): Flag indicating if the api_key has been soft-deleted.
        is_template (bool): Flag indicating if the api_key is a template.
        user_id (UUID): ID of the user associated with the api_key.
        account_id (UUID): ID of the account associated with the api_key.
        is_public (bool): Flag indicating if the api_key is a system api_key.
    """

    __tablename__ = "api_key"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    token = Column(String, index=True)  # Later add as Enum
    description = Column(String, nullable=True)
    is_deleted = Column(Boolean, default=False, index=True)
    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True
    )

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
    account = relationship("AccountModel", foreign_keys=[account_id], lazy="select")

    def __repr__(self) -> str:
        return (
            f"ApiKey(id={self.id}, "
            f"name='{self.name}', token='{self.token}', description='{self.description}', "
            f"is_deleted={self.is_deleted}, account_id={self.account_id})"
        )

    @classmethod
    def create_api_key(cls, db, api_key, user, account):
        """
        Creates a new api_key with the provided configuration.

        Args:
            db: The database object.
            api_key_with_config: The object containing the api_key and configuration details.

        Returns:
            ApiKey: The created api_key.

        """
        db_api_key = ApiKeyModel(
            created_by=user.id,
            account_id=account.id,
        )
        db_api_key.token = f"""l3_${secrets.token_urlsafe(32)}"""
        cls.update_model_from_input(db_api_key, api_key)
        db.session.add(db_api_key)
        db.session.flush()  # Flush pending changes to generate the api_key's ID
        db.session.commit()

        return db_api_key

    @classmethod
    def update_api_key(cls, db, id, api_key, user, account):
        """
        Creates a new api_key with the provided configuration.

        Args:
            db: The database object.
            api_key_with_config: The object containing the api_key and configuration details.

        Returns:
            ApiKey: The created api_key.

        """
        old_api_key = cls.get_api_key_by_id(db=db, api_key_id=id, account=account)
        if not old_api_key:
            raise ApiKeyNotFoundException("ApiKey not found")
        db_api_key = cls.update_model_from_input(
            api_key_model=old_api_key, api_key_input=api_key
        )
        db_api_key.modified_by = user.id

        db.session.add(db_api_key)
        db.session.commit()

        return db_api_key

    @classmethod
    def update_model_from_input(
        cls, api_key_model: ApiKeyModel, api_key_input: ApiKeyInput
    ):
        for field in ApiKeyInput.__annotations__.keys():
            setattr(api_key_model, field, getattr(api_key_input, field))
        return api_key_model

    @classmethod
    def get_api_keys(cls, db, account):
        api_keys = (
            db.session.query(ApiKeyModel)
            .filter(
                ApiKeyModel.account_id == account.id,
                or_(
                    or_(
                        ApiKeyModel.is_deleted.is_(False),
                        ApiKeyModel.is_deleted is None,
                    ),
                    ApiKeyModel.is_deleted is None,
                ),
            )
            .all()
        )
        return api_keys

    @classmethod
    def get_api_key_by_id(cls, db, api_key_id, account):
        """
        Get ApiKey from api_key_id

        Args:
            session: The database session.
            api_key_id(int) : Unique identifier of an ApiKey.

        Returns:
            ApiKey: ApiKey object is returned.
        """
        # return db.session.query(ApiKeyModel).filter(ApiKeyModel.account_id == account.id, or_(or_(ApiKeyModel.is_deleted.is_(False), ApiKeyModel.is_deleted is None), ApiKeyModel.is_deleted is None)).all()
        api_keys = (
            db.session.query(ApiKeyModel)
            .filter(
                ApiKeyModel.id == api_key_id,
                or_(
                    or_(
                        ApiKeyModel.is_deleted.is_(False),
                        ApiKeyModel.is_deleted is None,
                    ),
                    ApiKeyModel.is_deleted is None,
                ),
            )
            .first()
        )
        return api_keys

    @classmethod
    def get_api_key_by_token(cls, session: Session, token: str):
        """
        Get ApiKey by token
        """
        api_key = (
            session.query(ApiKeyModel)
            .filter(
                ApiKeyModel.token == token,
                ApiKeyModel.is_deleted.is_(False),
            )
            .first()
        )
        return api_key

    @classmethod
    def delete_by_id(cls, db, api_key_id, account):
        db_api_key = (
            db.session.query(ApiKeyModel)
            .filter(ApiKeyModel.id == api_key_id, ApiKeyModel.account_id == account.id)
            .first()
        )

        if not db_api_key or db_api_key.is_deleted:
            raise ApiKeyNotFoundException("ApiKey not found")

        db_api_key.is_deleted = True
        db.session.commit()
