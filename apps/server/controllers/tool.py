from typing import List
from fastapi import APIRouter

from typings.tool import ToolOutput
from tools.get_tools import get_all_tools

router = APIRouter()


@router.get("", response_model=List[ToolOutput])
def get_tools() -> List[ToolOutput]:
    """
    Get all tools by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[ToolOutput]: List of tools associated with the account.
    """

    # db_tools = ToolModel.get_tools(db=db, account=auth.account)

    return get_all_tools()
    # return convert_tools_to_tool_list(db_tools)
