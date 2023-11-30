from typing import List

from models.team import TeamModel
from typings.team import ConfigsOutput, TeamOutput
from utils.team_agent import convert_team_agents_to_team_agent_list
from utils.type import convert_value_to_type
from utils.user import \
    convert_model_to_response as user_convert_model_to_response

# def convert_model_to_response(team_model: TeamModel) -> TeamOutput:
#     team_data = {}

#     # Extract attributes from TeamModel using annotations of Team
#     for key in TeamOutput.__annotations__.keys():
#         if hasattr(team_model, key):
#             if key == "team_agents":
#                 team_data[key] = convert_team_agents_to_team_agent_list(getattr(team_model, key))
#                 continue

#             target_type = TeamOutput.__annotations__.get(key)
#             team_data[key] = convert_value_to_type(value=getattr(team_model, key), target_type=target_type)


#     if team_model.creator:
#        team_data['creator'] = user_convert_model_to_response(team_model.creator)

#     return TeamOutput(**team_data)


# def convert_teams_to_team_list(teams: List[TeamModel]) -> List[TeamOutput]:
#     return [convert_model_to_response(team_model) for team_model in teams]


def convert_model_to_response(team_model: TeamModel) -> TeamOutput:
    team_data = {}

    # Extract attributes from AgentModel using annotations of Agent
    for key in TeamOutput.__annotations__.keys():
        if hasattr(team_model, key):
            target_type = TeamOutput.__annotations__.get(key)
            team_data[key] = convert_value_to_type(
                value=getattr(team_model, key), target_type=target_type
            )
        if key == "team_agents":
            team_data[key] = convert_team_agents_to_team_agent_list(
                getattr(team_model, key)
            )
            continue

    # Convert AgentConfigModel instances to Config
    configs = {}
    if hasattr(team_model, "configs"):
        for config_model in team_model.configs:
            key = getattr(config_model, "key")
            value = getattr(config_model, "value")

            # Convert value to the type specified in ConfigsOutput
            target_type = ConfigsOutput.__annotations__.get(key)

            if target_type and value is not None:
                if value == "None":
                    value = None
                else:
                    value = convert_value_to_type(value, target_type)

            configs[key] = value
        if configs:
            team_data["configs"] = configs

    if hasattr(team_model, "creator") and team_model.creator:
        team_data["creator"] = user_convert_model_to_response(team_model.creator)

    return TeamOutput(**team_data)


def convert_teams_to_team_list(teams: List[TeamModel]) -> List[TeamOutput]:
    return [convert_model_to_response(team_model) for team_model in teams]
