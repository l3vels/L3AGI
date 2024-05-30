from sqlalchemy import Column, UUID, or_, Index, ForeignKey
from models.base_model import BaseModel
import uuid
from exceptions import UserAccountNotFoundException
from typings.user_account import UserAccountInput, QueryParams


class UserAccountModel(BaseModel):
    """
    Represents an user entity.

    Attributes:
        id (UUID): Unique identifier of the user.
    """

    __tablename__ = "user_account"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(
        UUID, ForeignKey("user.id", ondelete="CASCADE"), nullable=False, index=True
    )
    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=False, index=True
    )

    # Define indexes
    __table_args__ = (
        Index("ix_user_account_model_user_id_account_id", "user_id", "account_id"),
    )

    def __repr__(self) -> str:
        return (
            f"User(id={self.id}, "
            f"user_id='{self.user_id}', account_id='{self.account_id}', ')" # TODO add role_id='{self.role_id}
        )

    @classmethod
    def create_user_account(cls, db, user_account):
        """
        Creates a new user_account with the provided configuration.

        Args:
            db: The database object.
            user_account_with_config: The object containing the user_account and configuration details.

        Returns:
            UserAccount: The created user_account.

        """
        db_user_account = UserAccountModel()
        cls.update_model_from_input(db_user_account, user_account)
        db.session.add(db_user_account)
        db.session.flush()  # Flush pending changes to generate the user_account's ID
        db.session.commit()

        return db_user_account

    @classmethod
    def update_user_account(cls, db, id, user_account, user):
        """
        Creates a new user_account with the provided configuration.

        Args:
            db: The database object.
            user_account_with_config: The object containing the user_account and configuration details.

        Returns:
            UserAccount: The created user_account.

        """
        old_user_account = cls.get_user_account_by_id(db=db, user_account_id=id)
        if not old_user_account:
            raise UserAccountNotFoundException("UserAccount not found")
        db_user_account = cls.update_model_from_input(
            user_account_model=old_user_account, user_account_input=user_account
        )
        db_user_account.modified_by = user.id

        db.session.add(db_user_account)
        db.session.commit()

        return db_user_account

    @classmethod
    def update_model_from_input(
        cls,
        user_account_model: "UserAccountModel",
        user_account_input: UserAccountInput,
    ):
        for field in UserAccountInput.__annotations__.keys():
            setattr(user_account_model, field, getattr(user_account_input, field))
        return user_account_model

    @classmethod
    @classmethod
    def get_user_accounts(cls, db, query: QueryParams, account):
        filter_conditions = [
            or_(
                or_(
                    UserAccountModel.is_deleted.is_(False),
                    UserAccountModel.is_deleted is None,
                ),
                UserAccountModel.is_deleted is None,
            )
        ]

        # Iterate over fields in QueryParams
        for field in QueryParams.__annotations__.keys():
            if getattr(query, field):
                filter_conditions.append(
                    getattr(UserAccountModel, field) == getattr(query, field)
                )

        user_accounts = (
            db.session.query(UserAccountModel).filter(*filter_conditions).all()
        )
        return user_accounts

    @classmethod
    def get_user_account_by_id(cls, db, user_account_id, account):
        """
        Get UserAccount from user_account_id

        Args:
            session: The database session.
            user_account_id(int) : Unique identifier of an UserAccount.

        Returns:
            UserAccount: UserAccount object is returned.
        """
        # return db.session.query(UserAccountModel).filter(UserAccountModel.account_id == account.id, or_(or_(UserAccountModel.is_deleted.is_(False), UserAccountModel.is_deleted is None), UserAccountModel.is_deleted is None)).all()
        user_accounts = (
            db.session.query(UserAccountModel)
            .filter(
                UserAccountModel.id == user_account_id,
                or_(
                    or_(
                        UserAccountModel.is_deleted.is_(False),
                        UserAccountModel.is_deleted is None,
                    ),
                    UserAccountModel.is_deleted is None,
                ),
            )
            .first()
        )
        return user_accounts
    
    @classmethod
    def get_user_account_by_user_id(cls, db, user_id):
        """_summary_

        Args:
            db (_type_): _description_
            user_id (_type_): _description_
            account (_type_): _description_

        Raises:
            UserAccountNotFoundException: _description_
        """
        
        user_account = (
            db.session.query(UserAccountModel)
            .filter(
                UserAccountModel.user_id == user_id,
            )
            .first()
        )
        return user_account
        
    @classmethod
    def delete_by_id(cls, db, user_account_id):
        db_user_account = (
            db.session.query(UserAccountModel)
            .filter(UserAccountModel.id == user_account_id)
            .first()
        )

        if not db_user_account or db_user_account.is_deleted:
            raise UserAccountNotFoundException("UserAccount not found")

        db_user_account.is_deleted = True
        db.session.commit()
