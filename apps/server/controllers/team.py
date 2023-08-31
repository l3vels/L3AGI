
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db

from models.team import TeamModel
from utils.auth import authenticate
from utils.team_utils import convert_teams_to_team_list, convert_model_to_response
from l3_types.team_types import TeamResponse, TeamInput
from utils.auth import authenticate
from l3_types.auth_types import UserAccount
from exceptions import TeamNotFoundException

router = APIRouter()

@router.post("/", status_code=201, response_model=TeamResponse)
def create_team(team: TeamInput, auth: UserAccount = Depends(authenticate)) -> TeamResponse:
    """
    Create a new team with configurations.

    Args:
        team (TeamInput): Data for creating a new team with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamResponse: Created team object.
    """
    # Consider adding try-except for error handling during creation if needed
    db_team = TeamModel.create_team(db, team=team, user=auth.user, account=auth.account)
    return convert_model_to_response(TeamModel.get_team_by_id(db, db_team.id, auth.account))

@router.put("/{id}", status_code=200, response_model=TeamResponse)  # Changed status code to 200
def update_team(id: str, team: TeamInput, auth: UserAccount = Depends(authenticate)) -> TeamResponse:
    """
    Update an existing team with configurations.

    Args:
        id (str): ID of the team to update.
        team (TeamInput): Data for updating the team with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamResponse: Updated team object.
    """
    try:
        db_team = TeamModel.update_team(db, 
                                           id=id, 
                                           team=team, 
                                           user=auth.user, 
                                           account=auth.account)
        return convert_model_to_response(TeamModel.get_team_by_id(db, db_team.id, auth.account))
    
    except TeamNotFoundException:
        raise HTTPException(status_code=404, detail="Team not found")

@router.get("/", response_model=List[TeamResponse])
def get_teams(auth: UserAccount = Depends(authenticate)) -> List[TeamResponse]:
    """
    Get all teams by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[TeamResponse]: List of teams associated with the account.
    """
    db_teams = TeamModel.get_teams(db=db, account=auth.account)
    return convert_teams_to_team_list(db_teams)

@router.get("/{id}", response_model=TeamResponse)
def get_team_by_id(id: str, auth: UserAccount = Depends(authenticate)) -> TeamResponse:
    """
    Get a team by its ID.

    Args:
        id (str): ID of the team.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamResponse: Team associated with the given ID.
    """
    db_team = TeamModel.get_team_by_id(db, team_id=id, account=auth.account)
    
    if not db_team or db_team.is_deleted:
        raise HTTPException(status_code=404, detail="Team not found")  # Ensure consistent case in error messages

    return convert_model_to_response(db_team)

@router.delete("/{team_id}", status_code=200)  # Changed status code to 204
def delete_team(team_id: str, auth: UserAccount = Depends(authenticate)):
    """
    Delete a team by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        team_id (str): ID of the team to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        TeamModel.delete_by_id(db, team_id=team_id, account=auth.account)
        return { "message": "Team deleted successfully" }

    except TeamNotFoundException:
        raise HTTPException(status_code=404, detail="Team not found")

