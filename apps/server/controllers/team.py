
from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db

from models.team import TeamModel
from utils.auth import authenticate
from utils.team import convert_teams_to_team_list, convert_model_to_response
from typings.team import TeamOutput, TeamInput
from utils.auth import authenticate
from typings.auth import UserAccount
from exceptions import TeamNotFoundException
from agents.team_base import TeamOfAgentsType

router = APIRouter()

@router.post("/", status_code=201, response_model=TeamOutput)
def create_team(team: TeamInput, auth: UserAccount = Depends(authenticate)) -> TeamOutput:
    """
    Create a new team with configurations.

    Args:
        team (TeamInput): Data for creating a new team with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamOutput: Created team object.
    """
    # Consider adding try-except for error handling during creation if needed
    db_team = TeamModel.create_team(db, team=team, user=auth.user, account=auth.account)
    return convert_model_to_response(TeamModel.get_team_by_id(db, db_team.id, auth.account))

@router.put("/{id}", status_code=200, response_model=TeamOutput)  # Changed status code to 200
def update_team(id: str, team: TeamInput, auth: UserAccount = Depends(authenticate)) -> TeamOutput:
    """
    Update an existing team with configurations.

    Args:
        id (str): ID of the team to update.
        team (TeamInput): Data for updating the team with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamOutput: Updated team object.
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

@router.get("/", response_model=List[TeamOutput])
def get_teams(auth: UserAccount = Depends(authenticate)) -> List[TeamOutput]:
    """
    Get all teams by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[TeamOutput]: List of teams associated with the account.
    """
    db_teams = TeamModel.get_teams(db=db, account=auth.account)
    return convert_teams_to_team_list(db_teams)

@router.get("/types", response_model=List[object])
def get_team_type(auth: UserAccount = Depends(authenticate)) -> List[object]:
    """
    Get all tools by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[Object]: List of tools associated with the account.
    """

    return [{
        "is_system": True,
        "is_active": True,
        "name": "Plan and Execute",
        "description": "Plan and Execute",
        "team_type": TeamOfAgentsType.PLAN_EXECUTE
    },
    {
        "is_system": True,
        "is_active": True,
        "name": "Authoritarian_Speaker",
        "description": "Authoritarian Speaker description",
        "team_type": TeamOfAgentsType.AUTHORITARIAN_SPEAKER
    },
    {
        "is_system": True,
        "is_active": True,
        "name": "Debates",
        "description": "Debates",
        "team_type": TeamOfAgentsType.DEBATES
    },
    {
        "is_system": True,
        "is_active": False,
        "name": "Decentralized speaker",
        "description": "Decentralized speakers",
        "team_type": TeamType.DECENTRALIZED_SPEAKERS
    }]
    
@router.get("/{id}", response_model=TeamOutput)
def get_team_by_id(id: str, auth: UserAccount = Depends(authenticate)) -> TeamOutput:
    """
    Get a team by its ID.

    Args:
        id (str): ID of the team.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamOutput: Team associated with the given ID.
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


    """
    Get all tools by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[Object]: List of tools associated with the account.
    """

    return [{
        "is_system": True,
        "is_active": True,
        "name": "Plan and Execute",
        "description": "Plan and Execute",
        "team_type": TeamType.PLAN_EXECUTE
    },
    {
        "is_system": True,
        "is_active": True,
        "name": "Authoritarian Speaker",
        "description": "Authoritarian Speaker description",
        "team_type": TeamType.AUTHORITARIAN_SPEAKER
    },
    {
        "is_system": True,
        "is_active": False,
        "name": "Debates",
        "description": "Debates",
        "team_type": TeamType.DEBATES
    },
    {
        "is_system": True,
        "is_active": False,
        "name": "Decentralized speakers",
        "description": "Decentralized speakers",
        "team_type": TeamType.DECENTRALIZED_SPEAKERS
    }]