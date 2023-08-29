from pydantic import BaseModel
from api.gql import load_gql
from api.client import L3Api

FETCH_ACCOUNT_GQL = load_gql("gql/account/account.gql")


class Account(BaseModel):
    id: str
    company_name: str
    location: str


class L3AccountApi:
    def __init__(self, api: L3Api):
        self.api = api

    def fetch_account(self) -> Account:
        data = self.api.request_auth(FETCH_ACCOUNT_GQL)
        return Account(**data['account'])
