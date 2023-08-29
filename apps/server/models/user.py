from sqlalchemy import Column, String, Boolean, UUID, func, or_
from sqlalchemy.orm import relationship, joinedload
from models.base_model import BaseModel
from sqlalchemy.dialects.postgresql import JSONB
import uuid
from exceptions import UserException, UserNotFoundException

class UserModel(BaseModel):
    """
    Represents an user entity.

    Attributes:
        id (UUID): Unique identifier of the user.
    """
    __tablename__ = 'user'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String(100), default=None)
    email = Column(String(100), default=None)
    first_name = Column(String(100), default=None)
    last_name = Column(String(100), default=None)
    deleted = Column(Boolean, default=False)
   