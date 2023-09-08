from models.team import TeamModel
from typing import List, Optional
from typings.team import TeamOutput, TeamInput
from utils.type import convert_value_to_type
from utils.team_agent import convert_team_agents_to_team_agent_list

def convert_model_to_response(team_model: TeamModel) -> TeamOutput:
    team_data = {}
    
    # Extract attributes from TeamModel using annotations of Team
    for key in TeamOutput.__annotations__.keys():
        if hasattr(team_model, key):
            if key == "team_agents":
                team_data[key] = convert_team_agents_to_team_agent_list(getattr(team_model, key))
                continue

            target_type = TeamOutput.__annotations__.get(key)
            team_data[key] = convert_value_to_type(value=getattr(team_model, key), target_type=target_type)    
            
    return TeamOutput(**team_data)


def convert_teams_to_team_list(teams: List[TeamModel]) -> List[TeamOutput]:
    return [convert_model_to_response(team_model) for team_model in teams]