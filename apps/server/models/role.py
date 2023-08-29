from sqlalchemy import Column, String, Boolean, UUID, func, or_
from sqlalchemy.orm import relationship, joinedload
from models.base_model import BaseModel
from sqlalchemy.dialects.postgresql import JSONB
import uuid
from exceptions import RoleException, RoleNotFoundException

class RoleModel(BaseModel):
    """
    Represents an role entity.

    Attributes:
        id (UUID): Unique identifier of the role.
    """
    __tablename__ = 'role'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String(100), default=None)
