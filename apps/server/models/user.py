import binascii
import hashlib
import os
import uuid

from sqlalchemy import UUID, Boolean, Column, Index, String, func, or_

from exceptions import UserNotFoundException
from models.base_model import RootBaseModel
from typings.user import UserInput


class UserModel(RootBaseModel):
    """
    Represents an user entity.

    Attributes:
        id (UUID): Unique identifier of the user.
    """

    __tablename__ = "user"

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String(100), default=None)
    avatar = Column(String(300), default=None, nullable=True)
    email = Column(String(100), index=True, default=None)
    password = Column(String, default=None)
    is_active = Column(Boolean, default=True)
    is_deleted = Column(Boolean, default=False, index=True)

    __table_args__ = (
        Index("ix_user_model_email_is_deleted_index", "email", "is_deleted"),
    )

    @classmethod
    def hash_password(cls, password):
        """Hash a password for storing."""
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode("ascii")
        pwdhash = hashlib.pbkdf2_hmac("sha512", password.encode("utf-8"), salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        return (salt + pwdhash).decode("ascii")

    @classmethod
    def verify_password(cls, stored_password, provided_password):
        """Verify a stored password against one provided by user"""
        salt = stored_password[:64]
        stored_password = stored_password[64:]
        pwdhash = hashlib.pbkdf2_hmac(
            "sha512", provided_password.encode("utf-8"), salt.encode("ascii"), 100000
        )
        pwdhash = binascii.hexlify(pwdhash).decode("ascii")

        return pwdhash == stored_password

    @classmethod
    def create_user(cls, db, user):
        """
        Creates a new user with the provided configuration.

        Args:
            db: The database object.
            user_with_config: The object containing the user and configuration details.

        Returns:
            User: The created user.

        """
        db_user = UserModel()
        if user.password:
            user.password = cls.hash_password(user.password)  # Hash the password
        if user.email:
            user.email = user.email.lower()  # Convert email to lowercase
        cls.update_model_from_input(db_user, user)
        db.session.add(db_user)
        db.session.flush()  # Flush pending changes to generate the user's ID
        db.session.commit()

        return db_user

    @classmethod
    def update_user(cls, db, id, user):
        """
        Updates an existing user with the provided configuration.

        Args:
            db: The database object.
            id: The id of the user to be updated.
            user: The object containing the updated user details.

        Returns:
            User: The updated user.

        """
        old_user = cls.get_user_by_id(db=db, user_id=id)
        if not old_user:
            raise UserNotFoundException("User not found")
        if user.password:
            user.password = cls.hash_password(user.password)  # Hash the password
        if user.email:
            user.email = user.email.lower()  # Convert email to lowercase
        db_user = cls.update_model_from_input(user_model=old_user, user_input=user)

        db.session.add(db_user)
        db.session.commit()

        return db_user

    @classmethod
    def update_model_from_input(cls, user_model: "UserModel", user_input: UserInput):
        for field in UserInput.__annotations__.keys():
            setattr(user_model, field, getattr(user_input, field))
        return user_model

    @classmethod
    def get_user_by_id(cls, db, user_id):
        """
        Get User from user_id

        Args:
            session: The database session.
            user_id(int) : Unique identifier of an User.

        Returns:
            User: User object is returned.
        """
        # return db.session.query(UserModel).filter(UserModel.account_id == account.id, or_(or_(UserModel.is_deleted.is_(False), UserModel.is_deleted is None), UserModel.is_deleted is None)).all()
        users = (
            db.session.query(UserModel)
            .filter(
                UserModel.id == user_id,
                or_(
                    or_(UserModel.is_deleted.is_(False), UserModel.is_deleted is None),
                    UserModel.is_deleted is None,
                ),
            )
            .first()
        )
        return users

    @classmethod
    def get_user_by_email(cls, db, email):
        """
        Get User from email

        Args:
            db: The database session.
            email(str) : Email of the User.

        Returns:
            User: User object is returned.
        """
        user = (
            db.session.query(UserModel)
            .filter(
                func.lower(UserModel.email) == func.lower(email),
                or_(
                    or_(UserModel.is_deleted.is_(False), UserModel.is_deleted is None),
                    UserModel.is_deleted is None,
                ),
            )
            .first()
        )
        return user

    @classmethod
    def delete_by_id(cls, db, user_id, account):
        db_user = (
            db.session.query(UserModel)
            .filter(UserModel.id == user_id, UserModel.account_id == account.id)
            .first()
        )

        if not db_user or db_user.is_deleted:
            raise UserNotFoundException("User not found")

        db_user.is_deleted = True
        db.session.commit()
