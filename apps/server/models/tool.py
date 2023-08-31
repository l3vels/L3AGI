from __future__ import annotations
from typing import List, Optional
import uuid

from sqlalchemy import Column, String, Boolean, UUID, func, or_, ForeignKey
from sqlalchemy.orm import relationship
from models.base_model import BaseModel
from typings.tool import ToolInput
from exceptions import ToolNotFoundException

class ToolModel(BaseModel):
    """
    Represents an tool entity.

    Attributes:
        id (UUID): Unique identifier of the tool.
        name (str): Name of the tool.
        role (str): Role of the tool.
        description (str): Description of the tool.
        is_deleted (bool): Flag indicating if the tool has been soft-deleted.
        is_template (bool): Flag indicating if the tool is a template.
        user_id (UUID): ID of the user associated with the tool.
        account_id (UUID): ID of the account associated with the tool.
        is_system (bool): Flag indicating if the tool is a system tool.
    """
    __tablename__ = 'tool'

    id = Column(UUID, primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String)
    group_name = Column(String, nullable=True)
    class_name = Column(String, nullable=True)
    description = Column(String, nullable=True)
    is_deleted = Column(Boolean, default=False)
    is_system = Column(Boolean, default=False)
    #todo need to add tags array
    account_id = Column(UUID, ForeignKey('datasource.id'), nullable=True)
    
    # account = relationship("AccountModel", back_populates="account", cascade="all, delete")
    
    def __repr__(self) -> str:
        return (
            f"Tool(id={self.id}, "
            f"name='{self.name}', description='{self.description}', "
            f"is_deleted={self.is_deleted}, is_system={self.is_system}, account_id={self.account_id})"
        )

    @classmethod
    def create_tool(cls, db, tool, user, account):
        """
        Creates a new tool with the provided configuration.

        Args:
            db: The database object.
            tool_with_config: The object containing the tool and configuration details.

        Returns:
            Tool: The created tool.

        """
        db_tool = ToolModel(
                         created_by=user.id, 
                         account_id=account.id,
                         )
        cls.update_model_from_input(db_tool, tool)
        db.session.add(db_tool)
        db.session.flush()  # Flush pending changes to generate the tool's ID
        db.session.commit()
        
        return db_tool
       
    @classmethod
    def update_tool(cls, db, id, tool, user, account):
        """
        Creates a new tool with the provided configuration.

        Args:
            db: The database object.
            tool_with_config: The object containing the tool and configuration details.

        Returns:
            Tool: The created tool.

        """
        old_tool = cls.get_tool_by_id(db=db, tool_id=id, account=account)
        if not old_tool:
            raise ToolNotFoundException("Tool not found")
        db_tool = cls.update_model_from_input(tool_model=old_tool, tool_input=tool)
        db_tool.modified_by = user.id
        
        db.session.add(db_tool)
        db.session.commit()

        return db_tool
     
    @classmethod
    def update_model_from_input(cls, tool_model: ToolModel, tool_input: ToolInput):
        for field in ToolInput.__annotations__.keys():
            setattr(tool_model, field, getattr(tool_input, field))
        return tool_model  

    @classmethod
    def get_tools(cls, db, account):
        tools = (
            db.session.query(ToolModel)
            .filter(ToolModel.account_id == account.id, or_(or_(ToolModel.is_deleted == False, ToolModel.is_deleted is None), ToolModel.is_deleted is None))
            .all()
        )
        return tools
    

    @classmethod
    def get_tool_by_id(cls, db, tool_id, account):
        """
            Get Tool from tool_id

            Args:
                session: The database session.
                tool_id(int) : Unique identifier of an Tool.

            Returns:
                Tool: Tool object is returned.
        """
        # return db.session.query(ToolModel).filter(ToolModel.account_id == account.id, or_(or_(ToolModel.is_deleted == False, ToolModel.is_deleted is None), ToolModel.is_deleted is None)).all()
        tools = (
            db.session.query(ToolModel)
            .filter(ToolModel.id == tool_id, or_(or_(ToolModel.is_deleted == False, ToolModel.is_deleted is None), ToolModel.is_deleted is None))
            .first()
        )
        return tools

    @classmethod
    def delete_by_id(cls, db, tool_id, account):
        db_tool = db.session.query(ToolModel).filter(ToolModel.id == tool_id, ToolModel.account_id==account.id).first()

        if not db_tool or db_tool.is_deleted:
            raise ToolNotFoundException("Tool not found")

        db_tool.is_deleted = True
        db.session.commit()

    

    