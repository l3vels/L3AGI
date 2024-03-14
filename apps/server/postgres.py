import json
import logging
from datetime import datetime
from typing import Dict, List, Optional
from uuid import UUID

from fastapi_sqlalchemy import db
from langchain.schema import (BaseChatMessageHistory, BaseMessage,
                              _message_to_dict)
from langchain_core.messages import AIMessage, HumanMessage

from models.chat_message import ChatMessage

logger = logging.getLogger(__name__)


class ChatMessageJSONEncoder(json.JSONEncoder):
    def default(self, obj: object):
        if isinstance(obj, UUID):
            # if the obj is uuid, we simply return the value of uuid
            return str(obj)
        if isinstance(obj, datetime):
            # for datetime objects, convert to string in your preferred format
            return obj.isoformat()
        return super().default(obj)


class PostgresChatMessageHistory(BaseChatMessageHistory):
    def __init__(
        self,
        sender_account_id: Optional[str],
        sender_user_id: Optional[str],
        # user: Optional[UserOutput],
        session_id: Optional[str],
        parent_id: Optional[str] = None,
        agent_id: Optional[str] = None,
        team_id: Optional[str] = None,
        sender_name: Optional[str] = None,
        chat_id: Optional[str] = None,
        run_id: Optional[UUID] = None,
    ):
        self.sender_account_id = sender_account_id
        self.sender_user_id = sender_user_id
        # self.user = user
        self.session_id = session_id
        self.parent_id = parent_id
        self.agent_id = agent_id
        self.team_id = team_id
        self.sender_name = sender_name
        self.chat_id = chat_id
        self.run_id = run_id

    @property
    def messages(self) -> List[BaseMessage]:  # type: ignore
        """Retrieve the messages from PostgreSQL"""
        return []

    def create_message(
        self,
        message,
        parent_id: Optional[str] = None,
        agent_id: Optional[UUID] = None,
        voice_url: Optional[str] = None,
    ):
        # Append the message to the record in PostgreSQL
        chat_message = ChatMessage(
            sender_user_id=self.sender_user_id,
            sender_account_id=self.sender_account_id,
            message=_message_to_dict(message),
            session_id=self.session_id,
            agent_id=self.agent_id or agent_id,
            team_id=self.team_id,
            parent_id=parent_id,
            sender_name=self.sender_name,
            chat_id=self.chat_id,
            run_id=self.run_id,
            voice_url=voice_url,
        )

        db.session.add(chat_message)
        db.session.commit()
        db.session.refresh(chat_message)

        # Serialize the model instance's data dictionary
        data_dict = chat_message.to_dict()
        if chat_message.parent:
            parent_dict = chat_message.parent.to_dict()
            data_dict["parent"] = parent_dict

        data_json = json.dumps(
            data_dict, cls=ChatMessageJSONEncoder
        )  # Use default=str to handle UUID and datetime
        # print("the result", json.loads(data_json))
        return json.loads(data_json)

    def create_ai_message(
        self,
        message: str,
        parent_id: Optional[str] = None,
        agent_id: Optional[str] = None,
        voice_url: Optional[str] = None,
    ):
        return self.create_message(
            AIMessage(content=message), parent_id, agent_id, voice_url
        )

    def create_human_message(self, message: str, voice_url: Optional[str] = None):
        return self.create_message(
            HumanMessage(
                content=message,
                additional_kwargs={
                    "name": self.sender_name,
                },
            ),
            parent_id=self.parent_id,
            voice_url=voice_url,
        )

    def add_message(self, message: BaseMessage) -> str:
        """Append the message to the record in PostgreSQL"""
        return ""

    def update_thoughts(self, message_id: str, thoughts: List[Dict]):
        chat_message: ChatMessage = db.session.query(ChatMessage).get(message_id)
        chat_message.thoughts = thoughts
        db.session.commit()

        updated_message_json = json.dumps(
            chat_message.to_dict(), cls=ChatMessageJSONEncoder
        )
        return json.loads(updated_message_json)

    def delete_message(self, message_id: str):
        chat_message: ChatMessage = db.session.query(ChatMessage).get(message_id)
        db.session.delete(chat_message)
        db.session.commit()

    def clear(self) -> None:
        """Clear session memory from PostgreSQL"""
        return None

    def __del__(self) -> None:
        return None
