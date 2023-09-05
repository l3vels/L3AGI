from uuid import UUID
from typings.user import UserOutput
from typings.account import AccountOutput

class L3Base:
    def __init__(self,  user: UserOutput, account: AccountOutput, session_id: UUID):
        self.user = user
        self.account = account
        self.session_id = session_id
