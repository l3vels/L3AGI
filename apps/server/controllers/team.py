from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db

from agents.team_base import TeamOfAgentsType
from exceptions import TeamNotFoundException
from models.team import TeamModel
from models.team_agent import TeamAgentModel
from typings.auth import UserAccount
from typings.team import TeamInput, TeamOutput
from typings.team_agent import TeamAgentInput
from utils.auth import authenticate
from utils.team import convert_model_to_response, convert_teams_to_team_list

router = APIRouter()


@router.post("", status_code=201, response_model=TeamOutput)
def create_team(
    team_with_configs: TeamInput, auth: UserAccount = Depends(authenticate)
) -> TeamOutput:
    """
    Create a new team with configurations.

    Args:
        team (TeamInput): Data for creating a new team with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamOutput: Created team object.
    """
    # Consider adding try-except for error handling during creation if needed
    db_team = TeamModel.create_team(
        db,
        team=team_with_configs,
        configs=team_with_configs.configs,
        user=auth.user,
        account=auth.account,
    )

    team_agents = [
        TeamAgentInput(agent_id=agent.agent_id, role=agent.role, team_id=db_team.id)
        for agent in team_with_configs.team_agents
    ]
    TeamAgentModel.create_team_agents(db, db_team, team_agents, auth.user, auth.account)

    return convert_model_to_response(TeamModel.get_team_by_id(db, db_team.id))


@router.put(
    "/{id}", status_code=200, response_model=TeamOutput
)  # Changed status code to 200
def update_team(
    id: str, team_with_configs: TeamInput, auth: UserAccount = Depends(authenticate)
) -> TeamOutput:
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
        db_team = TeamModel.update_team(
            db,
            id=id,
            team=team_with_configs,
            configs=team_with_configs.configs,
            user=auth.user,
            account=auth.account,
        )

        team_agents = [
            TeamAgentInput(agent_id=agent.agent_id, role=agent.role, team_id=db_team.id)
            for agent in team_with_configs.team_agents
        ]
        TeamAgentModel.delete_by_team_id(db, id, auth.account)
        TeamAgentModel.create_team_agents(
            db, db_team, team_agents, auth.user, auth.account
        )

        return convert_model_to_response(TeamModel.get_team_by_id(db, db_team.id))

    except TeamNotFoundException:
        raise HTTPException(status_code=404, detail="Team not found")


@router.post(
    "/from-template/{template_id}", status_code=201, response_model=TeamOutput
)  # Changed status code to 200
def create_team_from_template(
    template_id: str, auth: UserAccount = Depends(authenticate)
) -> TeamOutput:
    """
    Update an existing team with configurations.

    Args:
        id (str): ID of the team to update.
        team_with_configs (TeamInput): Data for updating the team with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamOutput: Updated team object.
    """
    try:
        new_team = TeamModel.create_team_from_template(
            db, template_id=template_id, user=auth.user, account=auth.account
        )
        db.session.commit()
        db_team = TeamModel.get_team_with_agents(
            db=db, id=new_team.id, account=auth.account
        )
        return convert_model_to_response(db_team)

    except TeamNotFoundException:
        raise HTTPException(status_code=404, detail="Team not found")


@router.get("", response_model=List[TeamOutput])
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


@router.get("/discover/public", response_model=List[TeamOutput])
def get_public_teams() -> List[TeamOutput]:
    public_agents = TeamModel.get_public_teams(db=db)

    return convert_teams_to_team_list(public_agents)


@router.get("/discover/templates", response_model=List[TeamOutput])
def get_template_teams() -> List[TeamOutput]:
    template_agents = TeamModel.get_template_teams(db=db)
    return convert_teams_to_team_list(template_agents)


@router.get("/types", response_model=List[object])
def get_team_type(auth: UserAccount = Depends(authenticate)) -> List[object]:
    """
    Get all team types by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[Object]: List of tools associated with the account.
    """

    return [
        {
            "is_public": True,
            "is_active": True,
            "name": "Decentralized Speaker",
            "description": "This notebook showcases how to implement a multi-agent simulation where a privileged agent decides who to speak",
            "team_type": TeamOfAgentsType.DECENTRALIZED_SPEAKER,
            "fields": [],
            "agents": [
                {"id": 1, "role": "Speaker"},
                {"id": 2, "role": "Speaker"},
                {"id": 3, "role": "Speaker"},
                {"id": 4, "role": "Speaker"},
                {"id": 5, "role": "Speaker"},
            ],
        },
        {
            "is_public": True,
            "is_active": True,
            "name": "Debates",
            "description": "This example shows how to simulate multi-agent dialogues where agents have access to tools.",
            "team_type": TeamOfAgentsType.DEBATES,
            "fields": [
                {
                    "label": "Word limit",
                    "key": "word_limit",
                    "type": "int",
                    "is_required": True,
                    "is_secret": False,
                    "default": 30,
                }
            ],
            "agents": [
                {"id": 1, "role": "Debater"},
                {"id": 2, "role": "Debater"},
                {"id": 3, "role": "Debater"},
                {"id": 4, "role": "Debater"},
                {"id": 5, "role": "Debater"},
            ],
        },
        {
            "is_public": True,
            "is_active": True,
            "name": "Authoritarian Speaker",
            "description": "Authoritarian Speaker description",
            "team_type": TeamOfAgentsType.AUTHORITARIAN_SPEAKER,
            "fields": [
                {
                    "label": "Word limit",
                    "key": "word_limit",
                    "type": "int",
                    "is_required": True,
                    "is_secret": False,
                    "default": 30,
                },
                {
                    "label": "Stopping Probability",
                    "key": "stopping_probability",
                    "type": "float",
                    "is_required": True,
                    "is_secret": False,
                    "default": 0.2,
                },
            ],
            "agents": [
                {"id": 1, "role": "Director"},
                {"id": 2, "role": "Speaker"},
                {"id": 3, "role": "Speaker"},
                {"id": 4, "role": "Speaker"},
                {"id": 5, "role": "Speaker"},
                {"id": 6, "role": "Speaker"},
            ],
        },
        {
            "is_public": True,
            "is_active": True,
            "name": "Plan and Execute",
            "description": "Plan and Execute",
            "team_type": TeamOfAgentsType.PLAN_AND_EXECUTE,
            "fields": [],
            "agents": [{"id": 1, "role": "Planner"}, {"id": 2, "role": "Executor"}],
        },
    ]


@router.get("/from-template/is-created/{parent_id}", response_model=TeamOutput)
def get_team_by_parent_id(
    parent_id: str, auth: UserAccount = Depends(authenticate)
) -> TeamOutput:
    """
    Get a team by its ID.

    Args:
        parent_id (str): ID of the team.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamOutput: Team associated with the given ID.
    """
    db_team = TeamModel.get_team_with_agents_by_parent_id(
        db, parent_id=parent_id, account=auth.account
    )

    if not db_team or db_team.is_deleted:
        raise HTTPException(
            status_code=404, detail="Team not found"
        )  # Ensure consistent case in error messages

    return convert_model_to_response(db_team)


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
    db_team = TeamModel.get_team_by_id(db, team_id=id)

    if not db_team or db_team.is_deleted:
        raise HTTPException(
            status_code=404, detail="Team not found"
        )  # Ensure consistent case in error messages

    return convert_model_to_response(db_team)


@router.get("/discover/{id}", response_model=TeamOutput)
def get_discover_team_by_id(id: str) -> TeamOutput:
    """
    Get a team by its ID.

    Args:
        id (str): ID of the team.
        auth (UserAccount): Authenticated user account.

    Returns:
        TeamOutput: Team associated with the given ID.
    """
    db_team = TeamModel.get_team_by_id(db, team_id=id)

    if not db_team or db_team.is_deleted:
        raise HTTPException(
            status_code=404, detail="Team not found"
        )  # Ensure consistent case in error messages

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
        return {"message": "Team deleted successfully"}

    except TeamNotFoundException:
        raise HTTPException(status_code=404, detail="Team not found")
