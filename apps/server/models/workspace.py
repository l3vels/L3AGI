from __future__ import annotations
from typing import List, Optional
import uuid

from sqlalchemy import Column, String, Boolean, UUID, func, or_, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel
from typings.workspace import WorkspaceInput
from exceptions import ProjectNotFoundException

class WorkspaceModel(BaseModel):
    """
    Represents an project entity.

    Attributes:
        id (UUID): Unique identifier of the project.
        name (str): Name of the project.
        role (str): Role of the project.
        description (str): Description of the project.
        is_deleted (bool): Flag indicating if the project has been soft-deleted.
        account_id (UUID): ID of the account associated with the workspace.
        is_public (bool): Flag indicating if the project is a system workspace.
    """
    __tablename__ = 'workspace'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    description = Column(String, nullable=True)
    is_deleted = Column(Boolean, default=False, index=True)
    is_public = Column(Boolean, default=False, index=True)
    account_id = Column(UUID, nullable=True, index=True)    
        
    created_by = Column(UUID, ForeignKey('user.id', name='fk_created_by'), nullable=True, index=True)
    modified_by = Column(UUID, ForeignKey('user.id', name='fk_modified_by'), nullable=True, index=True)
    creator = relationship("UserModel", foreign_keys=[created_by], cascade="all, delete", lazy='noload')
    
    