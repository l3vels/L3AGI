from enum import Enum


class ChatMessageVersion(Enum):
    CHAT_CONVERSATIONAL = 'chat_conversational'
    PLAN_AND_EXECUTE = 'plan_and_execute'
    PLAN_AND_EXECUTE_WITH_TOOLS = 'plan_and_execute_with_tools'
    AUTHORITARIAN_SPEAKER = 'authoritarian_speaker'
    AGENT_DEBATES = 'agent_debates'
