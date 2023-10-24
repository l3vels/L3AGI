from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends
from fastapi_sqlalchemy import db

from exceptions import RunNotFoundException
from models.run import RunModel
from models.run_log import RunLogModel
from typings.auth import UserAccount
from typings.run import RunLogOutput
from utils.auth import authenticate
from utils.run_log import convert_run_logs_to_run_logs_list

router = APIRouter()


@router.get("/{run_id}/log", response_model=List[RunLogOutput])
def get_run_logs(
    run_id: UUID, auth: UserAccount = Depends(authenticate)
) -> List[RunLogOutput]:
    """
    Get all run logs by run ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[RunLogOutput]: List of teams associated with the account.
    """
    run = RunModel.get_run_by_id(db.session, run_id)

    if not run:
        raise RunNotFoundException("Run not found")

    run_logs = RunLogModel.get_run_logs(db.session, run_id, auth.account)
    return convert_run_logs_to_run_logs_list(run_logs)
