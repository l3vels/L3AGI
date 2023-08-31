from models.team import TeamModel
from typing import List, Optional
from l3_types.team_types import TeamResponse, TeamInput
from utils.type_utils import convert_value_to_type

def convert_model_to_response(team_model: TeamModel) -> TeamResponse:
    team_data = {}
    
    # Extract attributes from TeamModel using annotations of Team
    for key in TeamResponse.__annotations__.keys():
        if hasattr(team_model, key):
            target_type = TeamResponse.__annotations__.get(key)
            team_data[key] = convert_value_to_type(value=getattr(team_model, key), target_type=target_type)

    return TeamResponse(**team_data)


def convert_teams_to_team_list(teams: List[TeamModel]) -> List[TeamResponse]:
    return [convert_model_to_response(team_model) for team_model in teams]