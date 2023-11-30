from typing import List

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from fastapi_sqlalchemy import db

from exceptions import ScheduleNotFoundException
from models.db import create_session
from models.schedule import ScheduleModel
from services.schedule import execute_scheduled_run
from typings.auth import UserAccount
from typings.schedule import (ScheduleConfigInput, ScheduleStatus,
                              ScheduleWithConfigsOutput)
from utils.auth import authenticate, authenticate_by_auth_token
from utils.schedule import (convert_model_to_response,
                            convert_schedules_to_schedule_list)

router = APIRouter()


@router.post(
    "/{schedule_id}/run",
    status_code=200,
    dependencies=[Depends(authenticate_by_auth_token)],
)
def run_schedule(schedule_id: str):
    schedule = ScheduleModel.get_schedule_by_id(db, schedule_id, None)

    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")

    if schedule.status == ScheduleStatus.PROCESSING.value:
        return {"message": "Schedule is already running"}

    try:
        execute_scheduled_run(db.session, schedule)
        return {"message": "Schedule run successfully"}
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))


@router.post("", status_code=201, response_model=ScheduleWithConfigsOutput)
def create_schedule(
    schedule_with_configs: ScheduleConfigInput,
    background_tasks: BackgroundTasks,
    auth: UserAccount = Depends(authenticate),
) -> ScheduleWithConfigsOutput:
    """
    Create a new schedule with configurations.

    Args:
        schedule_with_configs (ScheduleConfigInput): Data for creating a new schedule with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        ScheduleWithConfigsOutput: Created schedule object.
    """

    db_schedule = ScheduleModel.create_schedule(
        db,
        schedule=schedule_with_configs.schedule,
        configs=schedule_with_configs.configs,
        user=auth.user,
        account=auth.account,
    )

    db_schedule.next_run_date = schedule_with_configs.schedule.start_date
    db.session.commit()

    schedule_with_configs = convert_model_to_response(
        ScheduleModel.get_schedule_by_id(db, db_schedule.id, auth.account)
    )

    if not schedule_with_configs.configs.is_recurring:
        background_tasks.add_task(execute_scheduled_run, create_session(), db_schedule)

    return schedule_with_configs


@router.put(
    "/{id}", status_code=200, response_model=ScheduleWithConfigsOutput
)  # Changed status code to 200
def update_schedule(
    id: str,
    schedule_with_configs: ScheduleConfigInput,
    background_tasks: BackgroundTasks,
    auth: UserAccount = Depends(authenticate),
) -> ScheduleWithConfigsOutput:
    """
    Update an existing schedule with configurations.

    Args:
        id (str): ID of the schedule to update.
        schedule_with_configs (ScheduleConfigInput): Data for updating the schedule with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        ScheduleWithConfigsOutput: Updated schedule object.
    """
    try:
        db_schedule = ScheduleModel.update_schedule(
            db,
            id=id,
            schedule=schedule_with_configs.schedule,
            configs=schedule_with_configs.configs,
            user=auth.user,
            account=auth.account,
        )

        db_schedule.next_run_date = schedule_with_configs.schedule.start_date
        db.session.commit()

        if not schedule_with_configs.configs.is_recurring:
            background_tasks.add_task(
                execute_scheduled_run, create_session(), db_schedule
            )

        return convert_model_to_response(
            ScheduleModel.get_schedule_by_id(db, db_schedule.id, auth.account)
        )

    except ScheduleNotFoundException:
        raise HTTPException(status_code=404, detail="Schedule not found")


@router.get("", response_model=List[ScheduleWithConfigsOutput])
def get_schedules(
    auth: UserAccount = Depends(authenticate),
) -> List[ScheduleWithConfigsOutput]:
    """
    Get all schedules by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[ScheduleWithConfigsOutput]: List of schedules associated with the account.
    """
    db_schedules = ScheduleModel.get_schedules(db=db, account=auth.account)
    return convert_schedules_to_schedule_list(db_schedules)


@router.get("/due", dependencies=[Depends(authenticate_by_auth_token)])
def get_due_schedules():
    schedules = ScheduleModel.get_due_schedules(db.session)
    return convert_schedules_to_schedule_list(schedules)


@router.get("/{id}", response_model=ScheduleWithConfigsOutput)
def get_schedule_by_id(
    id: str, auth: UserAccount = Depends(authenticate)
) -> ScheduleWithConfigsOutput:
    """
    Get an schedule by its ID.

    Args:
        id (str): ID of the schedule.
        auth (UserAccount): Authenticated user account.

    Returns:
        ScheduleWithConfigsOutput: Schedule associated with the given ID.
    """
    db_schedule = ScheduleModel.get_schedule_by_id(
        db, schedule_id=id, account=auth.account
    )

    if not db_schedule or db_schedule.is_deleted:
        raise HTTPException(
            status_code=404, detail="Schedule not found"
        )  # Ensure consistent case in error messages

    return convert_model_to_response(db_schedule)


@router.delete("/{schedule_id}", status_code=200)
def delete_schedule(
    schedule_id: str, auth: UserAccount = Depends(authenticate)
) -> dict:
    """
    Delete an schedule by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        schedule_id (str): ID of the schedule to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        ScheduleModel.delete_by_id(db, schedule_id=schedule_id, account=auth.account)
        return {"message": "Schedule deleted successfully"}

    except ScheduleNotFoundException:
        raise HTTPException(status_code=404, detail="Schedule not found")
