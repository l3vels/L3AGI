from models.base_model import BaseModel
from sqlalchemy import UUID, Boolean, Column, ForeignKey, or_
from sqlalchemy.orm import Session, aliased
import uuid
from typings.user_account_access import UserAccountAccessDbInput
from models.user import UserModel
from models.account import AccountModel
from exceptions import UserAccessNotFoundException


class UserAccountAccessModel(BaseModel):
    """
    Represents an user_account_access entity.

    Attributes:
        id (UUID): Unique identifier of the user_account_access.
        is_deleted (bool): Flag indicating if the api_key has been soft-deleted.
        assigned_user_id (UUID): ID of the user associated with the user_account_access.
    """

    __tablename__ = "user_account_access"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    assigned_user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("user.id", name="fk_assigned_user_id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    assigned_account_id = Column(
        UUID(as_uuid=True),
        ForeignKey("account.id", name="fk_assigned_account_id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True
    )
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

    def __repr__(self) -> str:
        return (
            f"UserAccountAccess(id={self.id}, "
            f"is_deleted={self.is_deleted}, account_id={self.account_id})"
        )

    @classmethod
    def create_user_account_access(
        cls,
        db: Session,
        user_account_access: UserAccountAccessDbInput,
        user,
        account_id
    ):
        """
        Creates a new user account access.

        Args:
            db (Session): SQLAlchemy Session object.
            user_account_access (UserAccountAccessModel): _description_

        Returns:
            _type_: _description_
        """

        db_user_account_access = UserAccountAccessModel(
            created_by=user.id,
            account_id=account_id
        )

        cls.update_model_from_input(
            db_user_account_access,
            user_account_access
        )

        db.session.add(db_user_account_access)
        db.session.flush()
        db.session.commit()

        return db_user_account_access

    @classmethod
    def update_model_from_input(
        cls,
        user_account_access_model: "UserAccountAccessModel",
        user_account_access_input: UserAccountAccessDbInput
    ):
        for field in user_account_access_input.__annotations__.keys():
            if hasattr(user_account_access_model, field):
                setattr(user_account_access_model, field, getattr(
                    user_account_access_input,
                    field
                ))

    @classmethod
    def delete_user_account_access_by_id(
        cls,
        db,
        user_account_access_id,
        account_id
    ):
        user_access = (
            db.session.query(UserAccountAccessModel)
            .filter(
                UserAccountAccessModel.id == user_account_access_id,
                UserAccountAccessModel.account_id == account_id
            )
            .first()
        )

        if not user_access or user_access.is_deleted:
            raise UserAccessNotFoundException("User access not found")

        user_access.is_deleted = True
        db.session.commit()

    @classmethod
    def get_user_account_access(cls, db, account, user):
        assigned_user = aliased(UserModel)
        created_by_user = aliased(UserModel)
        user_account_access = (
            db.session.query(
                UserAccountAccessModel.id,
                UserAccountAccessModel.account_id,
                UserAccountAccessModel.assigned_user_id,
                UserAccountAccessModel.assigned_account_id,
                UserAccountAccessModel.created_by,
                UserAccountAccessModel.created_on,
                assigned_user.email.label('assigned_user_email'),
                assigned_user.name.label('assigned_user_name'),
                created_by_user.email.label('created_by_email'),
                created_by_user.name.label('created_by_name'),
            )
            .join(
                assigned_user,
                UserAccountAccessModel.assigned_user_id == assigned_user.id
            )
            .join(
                created_by_user,
                UserAccountAccessModel.created_by == created_by_user.id
            )
            .filter(
                UserAccountAccessModel.created_by == user.id,
                or_(
                    or_(
                        UserAccountAccessModel.is_deleted.is_(False),
                        UserAccountAccessModel.is_deleted is None,
                    ),
                    UserAccountAccessModel.is_deleted is None,
                ),
            )
            .all()
        )

        return user_account_access

    @classmethod
    def get_shared_user_account_access(cls, db, account, user):
        assigned_account = aliased(AccountModel)
        created_by_user = aliased(UserModel)
        user_account_access = (
            db.session.query(
                UserAccountAccessModel.id,
                UserAccountAccessModel.account_id,
                UserAccountAccessModel.created_by,
                UserAccountAccessModel.created_on,
                assigned_account.name.label('assigned_account_name'),
                created_by_user.email.label('created_by_email'),
                created_by_user.name.label('created_by_name'),
            )
            .join(
                created_by_user,
                UserAccountAccessModel.created_by == created_by_user.id
            )
            .join(
                assigned_account,
                UserAccountAccessModel.account_id == assigned_account.id
            )
            .filter(
                UserAccountAccessModel.assigned_user_id == user.id,
                or_(
                    or_(
                        UserAccountAccessModel.is_deleted.is_(False),
                        UserAccountAccessModel.is_deleted is None,
                    ),
                    UserAccountAccessModel.is_deleted is None,
                ),
            )
            .all()
        )

        return user_account_access

    @classmethod
    def get_user_account_access_assigned(
        cls,
        db,
        assigner_user_id,
        assigned_account_id,
        account_id
    ):
        user_account_access = (
            db.session.query(UserAccountAccessModel)
            .filter(
                UserAccountAccessModel.assigned_user_id == assigner_user_id,
                UserAccountAccessModel.assigned_account_id == assigned_account_id,
                UserAccountAccessModel.account_id == account_id,
                or_(
                    or_(
                        UserAccountAccessModel.is_deleted.is_(False),
                        UserAccountAccessModel.is_deleted is None,
                    ),
                    UserAccountAccessModel.is_deleted is None,
                )
            )
            .first()
        )
        
        return user_account_access

    @classmethod
    def check_exist_user_account_access_by_account_id(
        cls,
        db,
        account_id,
        user_id
    ):
        user_account_access = (
            db.session.query(UserAccountAccessModel)
            .filter(
                UserAccountAccessModel.account_id == account_id,
                UserAccountAccessModel.assigned_user_id == user_id,
                or_(
                    or_(
                        UserAccountAccessModel.is_deleted.is_(False),
                        UserAccountAccessModel.is_deleted is None,
                    ),
                    UserAccountAccessModel.is_deleted is None,
                ),
            )
            .first()
        )
        
        return user_account_access
