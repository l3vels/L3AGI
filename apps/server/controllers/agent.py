from typing import List

# Standard library imports

# Third-party imports
from fastapi import APIRouter, HTTPException, Depends
from fastapi_sqlalchemy import db
from pydantic import BaseModel

# Local application imports
from models.agent import AgentModel
from l3_types.agent_types import AgentConfigInput, AgentWithConfigsResponse, AgentResponse
from utils.auth import authenticate
from l3_types.user_account_types import UserAccount
from utils.agent_utils import convert_agents_to_agent_list, convert_model_to_response
from exceptions import AgentNotFoundException

router = APIRouter()

@router.post("/", status_code=201, response_model=AgentWithConfigsResponse)
def create_agent(agent_with_configs: AgentConfigInput, auth: UserAccount = Depends(authenticate)) -> AgentWithConfigsResponse:
    """
    Create a new agent with configurations.

    Args:
        agent_with_configs (AgentConfigInput): Data for creating a new agent with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        AgentWithConfigsResponse: Created agent object.
    """
    # Consider adding try-except for error handling during creation if needed
    db_agent = AgentModel.create_agent(db, agent=agent_with_configs.agent, configs=agent_with_configs.configs, user=auth.user, account=auth.account)
    return convert_model_to_response(AgentModel.get_agent_by_id(db, db_agent.id, auth.account))

@router.put("/{id}", status_code=200, response_model=AgentWithConfigsResponse)  # Changed status code to 200
def update_agent(id: str, agent_with_configs: AgentConfigInput, auth: UserAccount = Depends(authenticate)) -> AgentWithConfigsResponse:
    """
    Update an existing agent with configurations.

    Args:
        id (str): ID of the agent to update.
        agent_with_configs (AgentConfigInput): Data for updating the agent with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        AgentWithConfigsResponse: Updated agent object.
    """
    try:
        db_agent = AgentModel.update_agent(db, 
                                           id=id, 
                                           agent=agent_with_configs.agent, 
                                           configs=agent_with_configs.configs,
                                           user=auth.user, 
                                           account=auth.account)
        return convert_model_to_response(AgentModel.get_agent_by_id(db, db_agent.id, auth.account))
    
    except AgentNotFoundException:
        raise HTTPException(status_code=404, detail="Agent not found")

@router.get("/", response_model=List[AgentWithConfigsResponse])
def get_agents(auth: UserAccount = Depends(authenticate)) -> List[AgentWithConfigsResponse]:
    """
    Get all agents by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[AgentWithConfigsResponse]: List of agents associated with the account.
    """
    db_agents = AgentModel.get_agents(db=db, account=auth.account)
    return convert_agents_to_agent_list(db_agents)

@router.get("/{id}", response_model=AgentWithConfigsResponse)
def get_agent_by_id(id: str, auth: UserAccount = Depends(authenticate)) -> AgentWithConfigsResponse:
    """
    Get an agent by its ID.

    Args:
        id (str): ID of the agent.
        auth (UserAccount): Authenticated user account.

    Returns:
        AgentWithConfigsResponse: Agent associated with the given ID.
    """
    db_agent = AgentModel.get_agent_by_id(db, agent_id=id, account=auth.account)
    
    if not db_agent or db_agent.is_deleted:
        raise HTTPException(status_code=404, detail="Agent not found")  # Ensure consistent case in error messages

    return convert_model_to_response(db_agent)

@router.delete("/{agent_id}", status_code=200)
def delete_agent(agent_id: str, auth: UserAccount = Depends(authenticate)) -> dict:
    """
    Delete an agent by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        agent_id (str): ID of the agent to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        AgentModel.delete_by_id(db, agent_id=agent_id, account=auth.account)
        return { "message": "Agent deleted successfully" }

    except AgentNotFoundException:
        raise HTTPException(status_code=404, detail="Agent not found")
