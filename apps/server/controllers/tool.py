from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from models.tool import ToolModel
from typings.tool import ToolResponse, ToolInput
from utils.auth import authenticate
from typings.auth import UserAccount
from utils.tool_utils import convert_tools_to_tool_list, convert_model_to_response
from exceptions import ToolNotFoundException
from tools.get_tools import get_all_tools

router = APIRouter()

@router.post("/", status_code=201, response_model=ToolResponse)
def create_tool(tool: ToolInput, auth: UserAccount = Depends(authenticate)) -> ToolResponse:
    """
    Create a new tool with configurations.

    Args:
        tool (ToolInput): Data for creating a new tool with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        ToolResponse: Created tool object.
    """
    # Consider adding try-except for error handling during creation if needed
    db_tool = ToolModel.create_tool(db, tool=tool, user=auth.user, account=auth.account)
    return convert_model_to_response(ToolModel.get_tool_by_id(db, db_tool.id, auth.account))

@router.put("/{id}", status_code=200, response_model=ToolResponse)  # Changed status code to 200
def update_tool(id: str, tool: ToolInput, auth: UserAccount = Depends(authenticate)) -> ToolResponse:
    """
    Update an existing tool with configurations.

    Args:
        id (str): ID of the tool to update.
        tool (ToolInput): Data for updating the tool with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        ToolResponse: Updated tool object.
    """
    try:
        db_tool = ToolModel.update_tool(db, 
                                           id=id, 
                                           tool=tool, 
                                           user=auth.user, 
                                           account=auth.account)
        return convert_model_to_response(ToolModel.get_tool_by_id(db, db_tool.id, auth.account))
    
    except ToolNotFoundException:
        raise HTTPException(status_code=404, detail="Tool not found")

@router.get("/", response_model=List[ToolResponse])
def get_tools(auth: UserAccount = Depends(authenticate)) -> List[ToolResponse]:
    """
    Get all tools by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[ToolResponse]: List of tools associated with the account.
    """


    # db_tools = ToolModel.get_tools(db=db, account=auth.account)

    return get_all_tools()
    # return convert_tools_to_tool_list(db_tools)

@router.get("/{id}", response_model=ToolResponse)
def get_tool_by_id(id: str, auth: UserAccount = Depends(authenticate)) -> ToolResponse:
    """
    Get a tool by its ID.

    Args:
        id (str): ID of the tool.
        auth (UserAccount): Authenticated user account.

    Returns:
        ToolResponse: Tool associated with the given ID.
    """
    db_tool = ToolModel.get_tool_by_id(db, tool_id=id, account=auth.account)
    
    if not db_tool or db_tool.is_deleted:
        raise HTTPException(status_code=404, detail="Tool not found")  # Ensure consistent case in error messages

    return convert_model_to_response(db_tool)

@router.delete("/{tool_id}", status_code=200)  # Changed status code to 204
def delete_tool(tool_id: str, auth: UserAccount = Depends(authenticate)):
    """
    Delete a tool by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        tool_id (str): ID of the tool to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        ToolModel.delete_by_id(db, tool_id=tool_id, account=auth.account)
        return { "message": "Agent deleted successfully" }

    except ToolNotFoundException:
        raise HTTPException(status_code=404, detail="Tool not found")


