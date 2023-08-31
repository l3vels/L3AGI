from models.agent import AgentModel
from typing import List, Optional
from typings.agent_types import AgentResponse, ConfigsOutput, AgentInput, AgentWithConfigsOutput
from utils.type_utils import convert_value_to_type

def convert_model_to_response(agent_model: AgentModel) -> AgentWithConfigsOutput:
    agent_data = {}
    
    # Extract attributes from AgentModel using annotations of Agent
    for key in AgentResponse.__annotations__.keys():
        if hasattr(agent_model, key):
            target_type = AgentResponse.__annotations__.get(key)
            agent_data[key] = convert_value_to_type(value=getattr(agent_model, key), target_type=target_type)
    
    # Convert AgentConfigModel instances to Config
    configs = {}
    for config_model in agent_model.configs:
        key = getattr(config_model, "key")
        value = getattr(config_model, "value")
        
        # Convert value to the type specified in ConfigsOutput
        target_type = ConfigsOutput.__annotations__.get(key)

        if target_type:
            value = convert_value_to_type(value, target_type)
        
        configs[key] = value
    
    return AgentWithConfigsOutput(agent=AgentResponse(**agent_data), 
                                    configs= ConfigsOutput(**configs, is_deleted=False) )


def convert_agents_to_agent_list(agents: List[AgentModel]) -> List[AgentWithConfigsOutput]:
    return [convert_model_to_response(agent_model) for agent_model in agents]