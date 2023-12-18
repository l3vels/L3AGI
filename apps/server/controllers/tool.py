from typing import List

from fastapi import APIRouter, Depends
from fastapi_sqlalchemy import db

from tools.get_tools import get_all_tools, get_tool_by_slug
from typings.auth import UserAccount
from typings.tool import ToolOutput, ToolRunInput, ToolRunOutput
from utils.auth import authenticate_by_token_or_api_key

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


@router.post("/run", response_model=ToolRunOutput, include_in_schema=False)
def run_tool(
    input: ToolRunInput, auth: UserAccount = Depends(authenticate_by_token_or_api_key)
) -> ToolRunOutput:
    """
    Run a tool.

    Args:
        auth (UserAccount): Authenticated user account.
        tool_id (int): ID of the tool to run.

    Returns:
        ToolRunOutput: Tool output.
    """

    agent_with_configs = None

    tool = get_tool_by_slug(
        input.toolkit_slug, input.tool_slug, db, auth.account, agent_with_configs
    )

    try:
        response = tool._run(input.query)
        return ToolRunOutput(response=response, is_success=True)
    except Exception as e:
        return ToolRunOutput(response=str(e), is_success=True)
