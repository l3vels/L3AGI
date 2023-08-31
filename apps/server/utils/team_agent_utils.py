from models.team_agent import TeamAgentModel
from typing import List, Optional
from l3_types.team_agent_types import TeamAgentResponse, TeamAgentInput
from utils.type_utils import convert_value_to_type

def convert_model_to_response(team_agent_model: TeamAgentModel) -> TeamAgentResponse:
    team_agent_data = {}
    
    # Extract attributes from TeamAgentModel using annotations of TeamAgent
    for key in TeamAgentResponse.__annotations__.keys():
        if hasattr(team_agent_model, key):
            target_type = TeamAgentResponse.__annotations__.get(key)
            team_agent_data[key] = convert_value_to_type(value=getattr(team_agent_model, key), target_type=target_type)

    return TeamAgentResponse(**team_agent_data)


def convert_team_agents_to_team_agent_list(team_agents: List[TeamAgentModel]) -> List[TeamAgentResponse]:
    return [convert_model_to_response(team_agent_model) for team_agent_model in team_agents]