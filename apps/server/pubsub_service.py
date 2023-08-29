from typing import Any
from azure.messaging.webpubsubservice import WebPubSubServiceClient
from azure.core.exceptions import AzureError
from azure.identity import DefaultAzureCredential
from config import Config


class PubSubService:
    def __init__(self):
        self.credential = DefaultAzureCredential()
        self.service = WebPubSubServiceClient.from_connection_string(Config.AZURE_PUBSUB_CONNECTION_STRING, hub=Config.AZURE_PUBSUB_HUB_NAME)

    def send_to_group(self, group: str, message: Any):
        try:
            self.service.send_to_group(group=group, content_type="application/json", message=message)
        except AzureError as e:
            print(f'Message send failed: {e.message}')

    def get_client_access_token(self, user_id):
        try:
            response = self.service.get_client_access_token(
                user_id=user_id,
                roles=["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"]
            )
            return response
        except AzureError as e:
            print(f'Message send failed: {e.message}')
