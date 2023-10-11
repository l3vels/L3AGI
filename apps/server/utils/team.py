from models.team import TeamModel
from typing import List
from typings.team import TeamOutput
from utils.type import convert_value_to_type
from utils.team_agent import convert_team_agents_to_team_agent_list
from utils.user import convert_model_to_response as user_convert_model_to_response


def convert_model_to_response(team_model: TeamModel) -> TeamOutput:
    team_data = {}

    # Extract attributes from TeamModel using annotations of Team
    for key in TeamOutput.__annotations__.keys():
        if hasattr(team_model, key):
            if key == "team_agents":
                team_data[key] = convert_team_agents_to_team_agent_list(
                    getattr(team_model, key)
                )
                continue

            target_type = TeamOutput.__annotations__.get(key)
            team_data[key] = convert_value_to_type(
                value=getattr(team_model, key), target_type=target_type
            )

    if team_model.creator:
        team_data["creator"] = user_convert_model_to_response(team_model.creator)

    return TeamOutput(**team_data)


def convert_teams_to_team_list(teams: List[TeamModel]) -> List[TeamOutput]:
    return [convert_model_to_response(team_model) for team_model in teams]
