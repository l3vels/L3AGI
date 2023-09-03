from api.client import L3Api
from api.gql import load_gql

GENERATE_UPLOAD_URL_GQL = load_gql("gql/file/generateUploadUrl.gql")


class L3FileApi:
    def __init__(self, api: L3Api):
        self.api = api

    def generate_upload_url(self, file_name: str, file_type: str, game_id: str = "",
                            location_field: str = "chat"):
        data = self.api.request_core(GENERATE_UPLOAD_URL_GQL, variable_values={
            "input": {
                "fileName": file_name,
                "type": file_type,
                "game_id": game_id,
                "locationField": location_field
            },
        })

        return data['generateUploadUrl']
