from api.client import L3Api
from api.gql import load_gql

FETCH_COLLECTION_BY_ID_GQL = load_gql("gql/collection/collectionById.gql")


class L3CollectionApi:
    def __init__(self, api: L3Api):
        self.api = api

    def fetch_collection_by_id(self, collection_id: str):
        data = self.api.request_core(FETCH_COLLECTION_BY_ID_GQL, variable_values={
            "id": collection_id,
        })

        return data['collectionById']
