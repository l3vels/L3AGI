from typing import List
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db

from models.team_agent import TeamAgentModel
from utils.auth import authenticate
from utils.team_agent import (
    convert_team_agents_to_team_agent_list,
    convert_model_to_response,
)
from typings.team_agent import TeamAgentOutput, TeamAgentInput, QueryParams
from typings.auth import UserAccount
from exceptions import TeamAgentNotFoundException

router = APIRouter()


@router.post("", status_code=201, response_model=TeamAgentOutput)
def create_team_agent(
    team_agent: TeamAgentInput, auth: UserAccount = Depends(authenticate)
) -> TeamAgentOutput:
    """
    Create a new team_agent with configurations.

    Args:
        team_agent (TeamAgentInput): Data for creating a new team_agent with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamAgentOutput: Created team_agent object.
    """
    # Consider adding try-except for error handling during creation if needed
    db_team_agent = TeamAgentModel.create_team_agent(
        db, team_agent=team_agent, user=auth.user, account=auth.account
    )
    return convert_model_to_response(
        TeamAgentModel.get_team_agent_by_id(db, db_team_agent.id, auth.account)
    )


@router.put(
    "/{id}", status_code=200, response_model=TeamAgentOutput
)  # Changed status code to 200
def update_team_agent(
    id: str, team_agent: TeamAgentInput, auth: UserAccount = Depends(authenticate)
) -> TeamAgentOutput:
    """
    Update an existing team_agent with configurations.

    Args:
        id (str): ID of the team_agent to update.
        team_agent (TeamAgentInput): Data for updating the team_agent with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamAgentOutput: Updated team_agent object.
    """
    try:
        db_team_agent = TeamAgentModel.update_team_agent(
            db, id=id, team_agent=team_agent, user=auth.user, account=auth.account
        )
        return convert_model_to_response(
            TeamAgentModel.get_team_agent_by_id(db, db_team_agent.id, auth.account)
        )

    except TeamAgentNotFoundException:
        raise HTTPException(status_code=404, detail="TeamAgent not found")


@router.get("", response_model=List[TeamAgentOutput])
def get_team_agents(
    auth: UserAccount = Depends(authenticate), params: QueryParams = Depends()
) -> List[TeamAgentOutput]:
    """
    Get all team_agents by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[TeamAgentOutput]: List of team_agents associated with the account.
    """
    db_team_agents = TeamAgentModel.get_team_agents(
        db=db, query=params, account=auth.account
    )
    return convert_team_agents_to_team_agent_list(db_team_agents)


@router.get("/{id}", response_model=TeamAgentOutput)
def get_team_agent_by_id(
    id: str, auth: UserAccount = Depends(authenticate)
) -> TeamAgentOutput:
    """
    Get a team_agent by its ID.

    Args:
        id (str): ID of the team_agent.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamAgentOutput: TeamAgent associated with the given ID.
    """
    db_team_agent = TeamAgentModel.get_team_agent_by_id(
        db, team_agent_id=id, account=auth.account
    )

    if not db_team_agent or db_team_agent.is_deleted:
        raise HTTPException(
            status_code=404, detail="TeamAgent not found"
        )  # Ensure consistent case in error messages

    return convert_model_to_response(db_team_agent)


@router.delete("/{team_agent_id}", status_code=200)  # Changed status code to 204
def delete_team_agent(team_agent_id: str, auth: UserAccount = Depends(authenticate)):
    """
    Delete a team_agent by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        team_agent_id (str): ID of the team_agent to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        TeamAgentModel.delete_by_id(
            db, team_agent_id=team_agent_id, account=auth.account
        )
        return {"message": "TeamAgent deleted successfully"}

    except TeamAgentNotFoundException:
        raise HTTPException(status_code=404, detail="TeamAgent not found")
