from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

from typings.tool import ToolResponse, ToolInput
from utils.auth import authenticate
from typings.auth import UserAccount
from exceptions import ToolNotFoundException
from tools.get_tools import get_all_tools

router = APIRouter()  

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

