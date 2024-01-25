from typing import Dict, List, Optional

# Third-party imports
from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db

from exceptions import AgentNotFoundException
# Local application imports
from models.agent import AgentModel
from services.twilio import (check_if_phone_number_sid_exists_in_agent,
                             update_phone_number_webhook)
from typings.agent import (AgentConfigInput, AgentWithConfigsOutput,
                           CheckTwilioPhoneNumberSIDInput)
from typings.auth import UserAccount
from utils.agent import convert_agents_to_agent_list, convert_model_to_response
from utils.auth import (authenticate, authenticate_by_any,
                        authenticate_by_token_or_api_key)
from utils.system_message import SystemMessageBuilder

router = APIRouter()


@router.post("", status_code=201, response_model=AgentWithConfigsOutput)
def create_agent(
    agent_with_configs: AgentConfigInput,
    auth: UserAccount = Depends(authenticate_by_token_or_api_key),
) -> AgentWithConfigsOutput:
    """
    Create a new agent with configurations.

    Args:
        agent_with_configs (AgentConfigInput): Data for creating a new agent with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        AgentWithConfigsOutput: Created agent object.
    """
    # Consider adding try-except for error handling during creation if needed
    db_agent = AgentModel.create_agent(
        db,
        agent=agent_with_configs.agent,
        configs=agent_with_configs.configs,
        user=auth.user,
        account=auth.account,
    )

    agent_with_configs = convert_model_to_response(
        AgentModel.get_agent_by_id(db, db_agent.id)
    )

    update_phone_number_webhook(auth, agent_with_configs)

    return agent_with_configs


@router.put(
    "/{id}", status_code=200, response_model=AgentWithConfigsOutput
)  # Changed status code to 200
def update_agent(
    id: str,
    agent_with_configs: AgentConfigInput,
    auth: UserAccount = Depends(authenticate_by_token_or_api_key),
) -> AgentWithConfigsOutput:
    """
    Update an existing agent with configurations.

    Args:
        id (str): ID of the agent to update.
        agent_with_configs (AgentConfigInput): Data for updating the agent with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        AgentWithConfigsOutput: Updated agent object.
    """

    db_agent: AgentModel = None

    try:
        db_agent = AgentModel.update_agent(
            db,
            id=id,
            agent=agent_with_configs.agent,
            configs=agent_with_configs.configs,
            user=auth.user,
            account=auth.account,
        )
        db.session.commit()
    except AgentNotFoundException:
        raise HTTPException(status_code=404, detail="Agent not found")

    agent_with_configs = convert_model_to_response(
        AgentModel.get_agent_by_id(db, db_agent.id)
    )

    update_phone_number_webhook(auth, agent_with_configs)

    return agent_with_configs


@router.post(
    "/from-template/{template_id}",
    status_code=201,
    response_model=AgentWithConfigsOutput,
)  # Changed status code to 200
def create_agent_from_template(
    template_id: str, auth: UserAccount = Depends(authenticate_by_token_or_api_key)
) -> AgentWithConfigsOutput:
    """
    Update an existing agent with configurations.

    Args:
        id (str): ID of the agent to update.
        agent_with_configs (AgentConfigInput): Data for updating the agent with configurations.
        auth (UserAccount): Authenticated user account.

    Returns:
        AgentWithConfigsOutput: Updated agent object.
    """
    try:
        new_agent = AgentModel.create_agent_from_template(
            db,
            template_id=template_id,
            user=auth.user,
            account=auth.account,
            check_is_template=True,
        )
        db.session.commit()
        db_agent = AgentModel.get_agent_by_id(db=db, agent_id=new_agent.id)
        return convert_model_to_response(db_agent)

    except AgentNotFoundException:
        raise HTTPException(status_code=404, detail="Agent not found")


@router.get("", response_model=List[AgentWithConfigsOutput])
def get_agents(
    auth: UserAccount = Depends(authenticate_by_token_or_api_key),
) -> List[AgentWithConfigsOutput]:
    """
    Get all agents by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[AgentWithConfigsOutput]: List of agents associated with the account.
    """
    db_agents = AgentModel.get_agents(db=db, account=auth.account)
    return convert_agents_to_agent_list(db_agents)


# todo need remove, is depricated
@router.get(
    "/discover",
    response_model=Dict[str, List[AgentWithConfigsOutput]],
    include_in_schema=False,
)
def get_template_and_system_agents() -> Dict[str, List[AgentWithConfigsOutput]]:
    template_agents = AgentModel.get_template_agents(
        session=db.session, account_id=None
    )
    system_agents = AgentModel.get_public_agents(db=db)

    template_agents_list = convert_agents_to_agent_list(template_agents)
    system_agents_list = convert_agents_to_agent_list(system_agents)

    result = {
        "templateAgents": template_agents_list,
        "systemAgents": system_agents_list,
    }

    return result


@router.get(
    "/discover/public",
    response_model=List[AgentWithConfigsOutput],
    include_in_schema=False,
)
def get_public_agents() -> Dict[str, List[AgentWithConfigsOutput]]:
    public_agents = AgentModel.get_public_agents(db=db)

    return convert_agents_to_agent_list(public_agents)


@router.get(
    "/discover/templates",
    response_model=List[AgentWithConfigsOutput],
    include_in_schema=False,
)
def get_template_agents(
    auth: UserAccount = Depends(authenticate),
) -> Dict[str, List[AgentWithConfigsOutput]]:
    template_agents = AgentModel.get_template_agents(
        session=db.session, account_id=auth.account.id
    )
    return convert_agents_to_agent_list(template_agents)


@router.get(
    "/from-template/is-created/{parent_id}",
    response_model=AgentWithConfigsOutput,
    include_in_schema=False,
)
def get_agent_by_parent_id(
    parent_id: str, auth: UserAccount = Depends(authenticate)
) -> AgentWithConfigsOutput:
    """
    Get an agent by its ID.

    Args:
        id (str): ID of the agent.
        auth (UserAccount): Authenticated user account.

    Returns:
        AgentWithConfigsOutput: Agent associated with the given ID.
    """
    db_agent = AgentModel.get_by_parent_id(
        db, parent_id=parent_id, account=auth.account
    )

    if not db_agent or db_agent.is_deleted:
        raise HTTPException(
            status_code=404, detail="Agent not found"
        )  # Ensure consistent case in error messages

    return convert_model_to_response(db_agent)


@router.get("/{id}", response_model=AgentWithConfigsOutput)
def get_agent_by_id(
    id: str,
    is_system_message: Optional[bool] = False,
    # auth: UserAccount = Depends(authenticate_by_any),
) -> AgentWithConfigsOutput:
    """
    Get an agent by its ID.

    Args:
        id (str): ID of the agent.
        auth (UserAccount): Authenticated user account.

    Returns:
        AgentWithConfigsOutput: Agent associated with the given ID.
    """
    db_agent = AgentModel.get_agent_by_id(db, agent_id=id)

    if not db_agent or db_agent.is_deleted:
        raise HTTPException(
            status_code=404, detail="Agent not found"
        )  # Ensure consistent case in error messages

    agent_with_configs = convert_model_to_response(db_agent)
    system_message = SystemMessageBuilder(agent_with_configs).build()
    agent_with_configs.system_message = system_message
    return agent_with_configs


@router.post("/check-twilio-phone-number-sid")
def check_twilio_phone_number_sid(
    body: CheckTwilioPhoneNumberSIDInput,
    auth: UserAccount = Depends(authenticate_by_any),
):
    return check_if_phone_number_sid_exists_in_agent(
        auth=auth,
        agent_id=body.agent_id,
        twilio_phone_number_sid=body.sid,
    )


@router.get(
    "/discover/{id}", response_model=AgentWithConfigsOutput, include_in_schema=False
)
def get_discover_agent_by_id(id: str) -> AgentWithConfigsOutput:
    """
    Get an agent by its ID.

    Args:
        id (str): ID of the agent.
        auth (UserAccount): Authenticated user account.

    Returns:
        AgentWithConfigsOutput: Agent associated with the given ID.
    """
    db_agent = AgentModel.get_agent_by_id(db, agent_id=id)

    if not db_agent or db_agent.is_deleted:
        raise HTTPException(
            status_code=404, detail="Agent not found"
        )  # Ensure consistent case in error messages

    return convert_model_to_response(db_agent)


@router.delete("/{agent_id}", status_code=200)
def delete_agent(
    agent_id: str, auth: UserAccount = Depends(authenticate_by_token_or_api_key)
) -> dict:
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
        return {"message": "Agent deleted successfully"}

    except AgentNotFoundException:
        raise HTTPException(status_code=404, detail="Agent not found")
