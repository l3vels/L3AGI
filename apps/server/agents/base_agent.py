from uuid import UUID
from typings.user import UserOutput
from typings.account import AccountOutput

class BaseAgent:
    def __init__(self,  sender_name: str, provider_account, session_id: UUID):
        self.sender_name = sender_name
        self.session_id = session_id
        self.provider_account = provider_account
