import json
import re
from enums import ChatMessageVersion

def get_chat_session_id(user_id: str, account_id: str, is_private_chat: bool):
    if is_private_chat:
        # private chat
        return f"{account_id}-{user_id}"
    else:
        # Team chat
        return account_id


AGENT_MENTIONS = [
    "@[L3-GPT](agent__L3-GPT)__mention__",
    "@[L3-Planner](agent__L3-Planner)__mention__",
    "@[L3-Authoritarian-Speaker](agent__L3-Authoritarian-Speaker)__mention__",
    "@[L3-Agent-Debates](agent__L3-Agent-Debates)__mention__"
]

AGENT_MENTION_TO_VERSION = {
    AGENT_MENTIONS[0]: ChatMessageVersion.CHAT_CONVERSATIONAL,
    AGENT_MENTIONS[1]: ChatMessageVersion.PLAN_AND_EXECUTE_WITH_TOOLS,
    AGENT_MENTIONS[2]: ChatMessageVersion.AUTHORITARIAN_SPEAKER,
    AGENT_MENTIONS[3]: ChatMessageVersion.AGENT_DEBATES
}

def has_team_member_mention(text: str) -> bool:
    pattern = r'@\[[^\]]*\]\((user)__[^)]*\)__mention__'

    if re.search(pattern, text):
        return True

    return False


def has_agent_mention(text: str) -> bool:
    return any(mention in text for mention in AGENT_MENTIONS)


def get_version_from_prompt(prompt: str) -> ChatMessageVersion:
    version = ChatMessageVersion.CHAT_CONVERSATIONAL

    for mention, ver in AGENT_MENTION_TO_VERSION.items():
        if mention in prompt:
            version = ver
            break

    return version



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

