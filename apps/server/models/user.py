from sqlalchemy import Column, String, Boolean, UUID, func, or_
from sqlalchemy.orm import relationship, joinedload
from models.base_model import BaseModel, RootBaseModel
from sqlalchemy.dialects.postgresql import JSONB
import uuid
from exceptions import UserException, UserNotFoundException
from typings.user_types import UserInput

class UserModel(RootBaseModel):
    """
    Represents an user entity.

    Attributes:
        id (UUID): Unique identifier of the user.
    """
    __tablename__ = 'user'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String(100), default=None)
    email = Column(String(100), default=None)
    deleted = Column(Boolean, default=False)
   
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
        cls.update_model_from_input(db_user, user)
        db.session.add(db_user)
        db.session.flush()  # Flush pending changes to generate the user's ID
        db.session.commit()
        
        return db_user
       
    @classmethod
    def update_user(cls, db, id, user):
        """
        Creates a new user with the provided configuration.

        Args:
            db: The database object.
            user_with_config: The object containing the user and configuration details.

        Returns:
            User: The created user.

        """
        old_user = cls.get_user_by_id(db=db, user_id=id)
        if not old_user:
            raise UserNotFoundException("User not found")
        db_user = cls.update_model_from_input(user_model=old_user, user_input=user)
        
        db.session.add(db_user)
        db.session.commit()

        return db_user
     
    @classmethod
    def update_model_from_input(cls, user_model: 'UserModel', user_input: UserInput):
        for field in UserInput.__annotations__.keys():
            setattr(user_model, field, getattr(user_input, field))
        return user_model

    @classmethod
    def get_user_by_id(cls, db, user_id, account):
        """
            Get User from user_id

            Args:
                session: The database session.
                user_id(int) : Unique identifier of an User.

            Returns:
                User: User object is returned.
        """
        # return db.session.query(UserModel).filter(UserModel.account_id == account.id, or_(or_(UserModel.is_deleted == False, UserModel.is_deleted is None), UserModel.is_deleted is None)).all()
        users = (
            db.session.query(UserModel)
            .filter(UserModel.id == user_id, or_(or_(UserModel.is_deleted == False, UserModel.is_deleted is None), UserModel.is_deleted is None))
            .first()
        )
        return users

    @classmethod
    def delete_by_id(cls, db, user_id, account):
        db_user = db.session.query(UserModel).filter(UserModel.id == user_id, UserModel.account_id==account.id).first()

        if not db_user or db_user.is_deleted:
            raise UserNotFoundException("User not found")

        db_user.is_deleted = True
        db.session.commit()

    
