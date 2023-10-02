from typing import Tuple, List
from uuid import UUID
import json
import re
from enum import Enum
from typings.chat import ChatOutput
from utils.type import convert_value_to_type
from models.chat import ChatModel
from utils.user import convert_model_to_response as user_convert_model_to_response

class MentionModule(Enum):
    AGENT = 'agent'
    TEAM = 'team'
    USER = 'user'


def get_chat_session_id(user_id: UUID, account_id: UUID, is_private_chat: bool, agent_id: UUID = None, team_id: UUID = None, chat_id: UUID = None) -> str:
    if is_private_chat:
        # private chat
        if agent_id:
            return f"{agent_id}-{user_id}"
        
        if team_id:
            return f"{team_id}-{user_id}"
        
        if chat_id:
            return f"{chat_id}"
        
        return f"{account_id}-{user_id}"
    else:
        # Team chat
        if agent_id:
            return f"{agent_id}"

        if team_id:
            return f"{team_id}"
        
        if chat_id:
            return f"{chat_id}"

        return f"{account_id}"


def parse_agent_mention(text: str) -> List[Tuple[str, str, str]]:
    """Finds agent mentions and returns a list of all agents found"""

    pattern = r'@\[(?P<name>[^\]]+)\]\((?P<module>[^_]+)__' \
              r'(?P<id>[^\)]+)\)__mention__'
    
    mentions = re.finditer(pattern, text)
    
    results = []
    
    for match in mentions:
        module = match.group("module")
        cleaned_string = re.sub(pattern, '', text).strip()

        if module == MentionModule.AGENT.value:
            agent_id = match.group("id")
            results.append((agent_id, cleaned_string))
        # elif module == MentionModule.TEAM.value:
        #     team_id = match.group("id")
        #     results.append((team_id, MentionModule.TEAM, cleaned_string))

    return results

def has_team_member_mention(text: str) -> bool:
    pattern = r'@\[[^\]]*\]\((user)__[^)]*\)__mention__'

    if re.search(pattern, text):
        return True

    return False


def get_agents_from_json(data_string: str):
    # Check for the presence of JSON structure in the string
    if 'json```' in data_string and ']```' in data_string:
        # Extract the substring between json``` and ```
        start = data_string.find('json```') + 7  # 7 is length of 'json```'
        end = data_string.rfind(']') + 1     # Only capture up to the closing bracket
        json_array_data = data_string[start:end].strip()  # Remove any leading or trailing white spaces

        print("Extracted JSON:", json_array_data)  # Print out the extracted JSON for debugging

        try:
            # Load JSON data
            agents = json.loads(json_array_data)
            return agents
        except json.JSONDecodeError as e:
            # Print out the portion of the string causing the error
            print("Error at:", json_array_data[max(e.pos - 20, 0):e.pos + 20])
            print("Couldn't decode the JSON data. Error:", e)
            return []
    else:
        return []




def convert_model_to_response(chat_model: ChatModel) -> ChatOutput:
    chat_data = {}
    
    # Extract attributes from ChatModel using annotations of Chat
    for key in ChatOutput.__annotations__.keys():
        if hasattr(chat_model, key):
            target_type = ChatOutput.__annotations__.get(key)
            chat_data[key] = convert_value_to_type(value=getattr(chat_model, key), target_type=target_type)
    
    # Convert ChatConfigModel instances to Config
    configs = {}
    # if hasattr(chat_model, 'configs'):
    #     for config_model in chat_model.configs:
    #         key = getattr(config_model, "key")
    #         value = getattr(config_model, "value")
            
    #         # Convert value to the type specified in ConfigsOutput
    #         target_type = ConfigsOutput.__annotations__.get(key)

    #         if target_type:
    #             value = convert_value_to_type(value, target_type)
            
    #         configs[key] = value
    
    # if hasattr(chat_model, 'sender_user') and chat_model.sender_user:
    #    chat_data['sender_user'] = user_convert_model_to_response(chat_model.sender_user)

    
    return ChatOutput(**chat_data)


def convert_chats_to_chat_list(chats: List[ChatModel]) -> List[ChatOutput]:
    return [convert_model_to_response(chat_model) for chat_model in chats]