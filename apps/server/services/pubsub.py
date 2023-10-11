import json
from typing import Dict, Optional, Any
import sentry_sdk
from azure.messaging.webpubsubservice import WebPubSubServiceClient
from azure.core.exceptions import AzureError
from azure.identity import DefaultAzureCredential
from config import Config
from datetime import datetime
from uuid import UUID


class AzurePubSubService:
    def __init__(self):
        self.credential = DefaultAzureCredential()
        self.service = WebPubSubServiceClient.from_connection_string(
            Config.AZURE_PUBSUB_CONNECTION_STRING, hub=Config.AZURE_PUBSUB_HUB_NAME
        )

    def send_to_group(self, group: str, message: Any):
        """Sends pubsub message to group"""

        try:
            self.service.send_to_group(
                group=group, content_type="application/json", message=message
            )
        except AzureError as err:
            sentry_sdk.capture_exception(err)

    def get_client_access_token(self, user_id):
        """Gets a client access token for the given user_id"""

        try:
            response = self.service.get_client_access_token(
                user_id=user_id,
                roles=["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
            )
            return response
        except AzureError as err:
            sentry_sdk.capture_exception(err)


class ChatPubSubService:
    def __init__(
        self,
        session_id: str,
        user_id: str,
        team_id: Optional[str] = None,
        agent_id: Optional[str] = None,
        chat_id: Optional[str] = None,
    ):
        self.session_id = session_id
        self.user_id = user_id
        self.team_id = team_id
        self.agent_id = agent_id
        self.chat_id = chat_id

        self.azure_pubsub_service = AzurePubSubService()

    def send_chat_message(
        self, chat_message: Dict, local_chat_message_ref_id: Optional[str] = None
    ):
        """Sends chat message object"""

        self.azure_pubsub_service.send_to_group(
            self.session_id,
            message={
                "type": "CHAT_MESSAGE_ADDED",
                "from": str(self.user_id),
                "chat_message": chat_message,
                "local_chat_message_ref_id": local_chat_message_ref_id,
                "agent_id": self.agent_id,
                "team_id": self.team_id,
                "chat_id": self.chat_id,
            },
        )

    def send_chat_status(self, config: Dict):
        """Sends chat status object"""
        data = json.loads(json.dumps(config, cls=PubSubJSONEncoder))

        self.azure_pubsub_service.send_to_group(
            self.session_id,
            message={
                "type": "CHAT_STATUS",
                "from": str(self.user_id),
                "config": data,
                "agent_id": self.agent_id,
                "team_id": self.team_id,
            },
        )


class PubSubJSONEncoder(json.JSONEncoder):
    def default(self, obj: object):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return str(obj)
        if isinstance(obj, datetime):
            # for datetime objects, convert to string in your preferred format
            return obj.isoformat()
        return super().default(obj)
