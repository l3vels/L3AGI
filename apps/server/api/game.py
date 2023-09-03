from api.gql import load_gql
from api.client import L3Api

FETCH_GAME_BY_ID_GQL = load_gql("gql/game/gameById.gql")


class L3GameApi:
    def __init__(self, api: L3Api):
        self.api = api

    def fetch_game_by_id(self, game_id: str):
        data = self.api.request_core(FETCH_GAME_BY_ID_GQL, variable_values={
            "id": game_id,
        })

        return data['gameById']
