from __future__ import annotations

import uuid

from sqlalchemy import UUID, Boolean, Column, ForeignKey, Index, String, or_
from sqlalchemy.orm import Session, relationship

from datasources.base import DatasourceType
from exceptions import DatasourceNotFoundException
from models.base_model import BaseModel
from typings.datasource import DatasourceInput, DatasourceStatus


class DatasourceModel(BaseModel):
    """
    Represents an datasource entity.

    Attributes:
        id (UUID): Unique identifier of the datasource.
        name (str): Name of the datasource.
        role (str): Role of the datasource.
        description (str): Description of the datasource.
        is_deleted (bool): Flag indicating if the datasource has been soft-deleted.
        is_template (bool): Flag indicating if the datasource is a template.
        user_id (UUID): ID of the user associated with the datasource.
        account_id (UUID): ID of the account associated with the datasource.
        is_public (bool): Flag indicating if the datasource is a system datasource.
    """

    __tablename__ = "datasource"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    source_type = Column(String)
    status = Column(String, default=DatasourceStatus.INDEXING.value)
    description = Column(String, nullable=True)
    error = Column(String)
    is_deleted = Column(Boolean, default=False, index=True)
    is_public = Column(Boolean, default=False, index=True)
    workspace_id = Column(
        UUID, ForeignKey("workspace.id", ondelete="CASCADE"), nullable=True, index=True
    )
    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True, index=True
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

    # Define indexes
    Index("ix_datasource_model_workspace_id_is_deleted", "workspace_id", "is_deleted")
    Index("ix_datasource_model_account_id_is_deleted", "account_id", "is_deleted")

    def __repr__(self) -> str:
        return (
            f"Datasource(id={self.id}, "
            f"name='{self.name}', source_type='{self.source_type}', description='{self.description}', "
            f"is_deleted={self.is_deleted}, is_public={self.is_public}, account_id={self.account_id})"
        )

    @classmethod
    def create_datasource(cls, db, datasource, user, account):
        """
        Creates a new datasource with the provided configuration.

        Args:
            db: The database object.
            datasource_with_config: The object containing the datasource and configuration details.

        Returns:
            Datasource: The created datasource.

        """
        status: str = DatasourceStatus.READY.value

        if datasource.source_type == DatasourceType.FILE.value:
            status = DatasourceStatus.INDEXING.value

        db_datasource = DatasourceModel(
            status=status,
            created_by=user.id,
            account_id=account.id,
        )

        cls.update_model_from_input(db_datasource, datasource)
        db.session.add(db_datasource)
        db.session.flush()  # Flush pending changes to generate the datasource's ID
        db.session.commit()

        return db_datasource

    @classmethod
    def update_datasource(cls, db, id, datasource, user, account):
        """
        Creates a new datasource with the provided configuration.

        Args:
            db: The database object.
            datasource_with_config: The object containing the datasource and configuration details.

        Returns:
            Datasource: The created datasource.

        """
        old_datasource = cls.get_datasource_by_id(
            session=db.session, datasource_id=id, account=account
        )
        if not old_datasource:
            raise DatasourceNotFoundException("Datasource not found")

        status: str = DatasourceStatus.READY.value

        if datasource.source_type == DatasourceType.FILE.value:
            status = DatasourceStatus.INDEXING.value

        old_datasource.status = status

        db_datasource = cls.update_model_from_input(
            datasource_model=old_datasource, datasource_input=datasource
        )
        db_datasource.modified_by = user.id

        db.session.add(db_datasource)
        db.session.commit()

        return db_datasource

    @classmethod
    def update_model_from_input(
        cls, datasource_model: DatasourceModel, datasource_input: DatasourceInput
    ):
        for field in DatasourceInput.__annotations__.keys():
            setattr(datasource_model, field, getattr(datasource_input, field))
        return datasource_model

    @classmethod
    def get_datasources(cls, db, account):
        datasources = (
            db.session.query(DatasourceModel)
            .filter(
                DatasourceModel.account_id == account.id,
                or_(
                    or_(
                        DatasourceModel.is_deleted.is_(False),
                        DatasourceModel.is_deleted is None,
                    ),
                    DatasourceModel.is_deleted is None,
                ),
            )
            .all()
        )
        return datasources

    @classmethod
    def get_datasource_by_id(cls, session: Session, datasource_id, account):
        """
        Get Datasource from datasource_id

        Args:
            session: The database session.
            datasource_id(int) : Unique identifier of an Datasource.

        Returns:
            Datasource: Datasource object is returned.
        """
        # return db.session.query(DatasourceModel).filter(DatasourceModel.account_id == account.id, or_(or_(DatasourceModel.is_deleted.is_(False), DatasourceModel.is_deleted is None), DatasourceModel.is_deleted is None)).all()
        datasources = (
            session.query(DatasourceModel)
            .filter(
                DatasourceModel.id == datasource_id,
                or_(
                    or_(
                        DatasourceModel.is_deleted.is_(False),
                        DatasourceModel.is_deleted is None,
                    ),
                    DatasourceModel.is_deleted is None,
                ),
            )
            .first()
        )
        return datasources

    @classmethod
    def delete_by_id(cls, db, datasource_id, account):
        db_datasource = (
            db.session.query(DatasourceModel)
            .filter(
                DatasourceModel.id == datasource_id,
                DatasourceModel.account_id == account.id,
            )
            .first()
        )

        if not db_datasource or db_datasource.is_deleted:
            raise DatasourceNotFoundException("Datasource not found")

        db_datasource.is_deleted = True
        db.session.commit()
