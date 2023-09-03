from api.gql import load_gql
from api.client import L3Api

FETCH_SQL_REPORT_GQL = load_gql("gql/chat/sqlReport.gql")
IMPORT_CONTRACT_GQL = load_gql("gql/chat/importContract.gql")


class L3ChatApi:
    def __init__(self, api: L3Api):
        self.api = api

    def fetch_sql_report(self, sql: str):
        data = self.api.request_core(FETCH_SQL_REPORT_GQL, variable_values={
            "sql": sql
        })

        return data['sqlReport']

    def import_contract(self, address: str, chain_id: int, game_id: str):
        data = self.api.request_core(IMPORT_CONTRACT_GQL, variable_values={
            "input": {
                "chain_id": chain_id,
                "address": address,
                "game_id": game_id
            }
        })

        return data['importContract']
