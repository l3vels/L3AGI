from pydantic import BaseModel
from api.gql import load_gql
from api.client import L3Api

FETCH_USER_GQL = load_gql("gql/user/user.gql")


class User(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    role: str


class L3UserApi:
    def __init__(self, api: L3Api):
        self.api = api

    def fetch_user(self) -> User:
        data = self.api.request_auth(FETCH_USER_GQL)
        return User(**data['user'])
