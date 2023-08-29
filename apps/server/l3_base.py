from api.user import User
from api.account import Account

class L3Base:
    def __init__(self,  user: User, account: Account, game, collection, session_id):
        self.user = user
        self.account = account
        self.session_id = session_id
        self.game = game
        self.collection = collection
