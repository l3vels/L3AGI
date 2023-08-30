from sqlalchemy import Column, String, Boolean, UUID, func, or_
from sqlalchemy.orm import relationship, joinedload
from models.base_model import BaseModel
from sqlalchemy.dialects.postgresql import JSONB
import uuid
from exceptions import UserException, UserNotFoundException
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, Boolean, UUID, func, or_, ForeignKey

class UserAccountModel(BaseModel):
    """
    Represents an user entity.

    Attributes:
        id (UUID): Unique identifier of the user.
    """
    __tablename__ = 'user_account'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(UUID, ForeignKey('user.id'), nullable=False) 
    account_id = Column(UUID, ForeignKey('account.id'), nullable=False) 
    role_id = Column(UUID, ForeignKey('role.id'), nullable=False) 
    
    # account = relationship("AccountModel", back_populates="user_accounts", cascade="all, delete")
    # user = relationship("UserModel", back_populates="user", cascade="all, delete")
    # role = relationship("RoleModel", back_populates="role", cascade="all, delete")
    
    def __repr__(self) -> str:
        return (
            f"User(id={self.id}, "
            f"user_id='{self.user_id}', account_id='{self.account_id}', role_id='{self.role_id}')"
        )

   