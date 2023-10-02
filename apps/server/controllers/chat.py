from typing import Optional, List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from fastapi_sqlalchemy import db
from sqlalchemy.orm import joinedload
from utils.auth import authenticate, try_auth_user
from models.chat_message import ChatMessage as ChatMessageModel
from typings.auth import UserAccount
from typings.chat import ChatMessageInput, ChatUserMessageInput, NegotiateOutput, ChatMessageOutput, ChatStopInput, ChatInput, ChatOutput
from utils.chat import get_chat_session_id, MentionModule, convert_chats_to_chat_list
from models.agent import AgentModel
from typings.config import  ConfigOutput
from models.team import TeamModel
from models.config import ConfigModel
from models.chat import ChatModel
from utils.chat import convert_model_to_response
from services.pubsub import AzurePubSubService
from typings.chat import ChatStatus
from utils.configuration import convert_model_to_response as convert_config_model_to_response
from exceptions import ChatNotFoundException, ChatException
from services.chat import create_user_message, create_client_message

router = APIRouter()

@router.post("", status_code=201)
def create_chat(chat: ChatInput, auth: UserAccount = Depends(authenticate)) -> ChatOutput:
    if not chat.agent_id and not chat.team_id:
         ChatException('Agent or Team should be defined')
    db_chat = ChatModel.create_chat(db, chat=chat, user=auth.user, account=auth.account)
    return convert_model_to_response(db_chat)


@router.get("", response_model=List[ChatOutput])
def get_chats(auth: UserAccount = Depends(authenticate)) -> List[ChatOutput]:
    """
    Get all get_chats by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[ChatOutput]: List of agents associated with the account.
    """
    db_chats = ChatModel.get_chats(db=db, account=auth.account)
    return convert_chats_to_chat_list(db_chats)


@router.post("/messages", status_code=201)
def create_user_chat_message(body: ChatUserMessageInput, auth: UserAccount = Depends(authenticate)):
    """
    Create new user chat message
    """
    
    create_user_message(body, auth)
    return ""

@router.post("/stop", status_code=201, response_model=ConfigOutput)
def stop_run(body: ChatStopInput, auth: UserAccount = Depends(authenticate)):
    session_id = get_chat_session_id(auth.user.id, auth.account.id, body.is_private_chat, body.agent_id, body.team_id)
    team_status_config = ConfigModel.get_config_by_session_id(db, session_id, auth.account)
    team_status_config.value = ChatStatus.STOPPED.value
    db.session.add(team_status_config)
    db.session.commit()
    return convert_config_model_to_response(team_status_config)


@router.get("/messages", status_code=200, response_model=List[ChatMessageOutput])
def get_chat_messages(is_private_chat: bool, agent_id: Optional[UUID] = None, team_id: Optional[UUID] = None, chat_id: Optional[UUID] = None, auth: UserAccount = Depends(authenticate)):
    """
    Get chat messages

    Args:
        is_private_chat (bool): Is private or team chat
        agent_id (Optional[UUID]): Agent id
        team_id (Optional[UUID]): Team of agents id
    """
    session_id = get_chat_session_id(auth.user.id, auth.account.id, is_private_chat, agent_id, team_id, chat_id)

    chat_messages = (db.session.query(ChatMessageModel)
                 .filter(ChatMessageModel.session_id == session_id)
                 .order_by(ChatMessageModel.created_on.desc())
                 .limit(50)
                 .options(joinedload(ChatMessageModel.agent), joinedload(ChatMessageModel.team), joinedload(ChatMessageModel.parent), joinedload(ChatMessageModel.sender_user))
                 .all())
    
    chat_messages = [chat_message.to_dict() for chat_message in chat_messages]
    chat_messages.reverse()

    return chat_messages

@router.get("/history", status_code=200, response_model=List[ChatMessageOutput])
def get_chat_messages(agent_id: Optional[UUID] = None, team_id: Optional[UUID] = None):
    """
    Get chat messages

    Args:
        is_private_chat (bool): Is private or team chat
        agent_id (Optional[UUID]): Agent id
        team_id (Optional[UUID]): Team of agents id
    """
    team: Optional[TeamModel] = None
    agent: Optional[TeamModel] = None
    session_id: Optional[str] = None
    if team_id:
        team = TeamModel.get_team_by_id_with_account(db, team_id)
    if agent_id:
        agent = AgentModel.get_agent_by_id_with_account(db, agent_id)
    if team and (team.is_public or team.is_template):
        session_id = get_chat_session_id(team.creator.id, team.account.id, False, agent_id, team_id)
    if agent and (agent.is_public or agent.is_template):
        session_id = get_chat_session_id(agent.creator.id, agent.account.id, False, agent_id, team_id)
        
    if not session_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    chat_messages = (db.session.query(ChatMessageModel)
                 .filter(ChatMessageModel.session_id == session_id)
                 .order_by(ChatMessageModel.created_on.desc())
                 .limit(50)
                 .options(joinedload(ChatMessageModel.agent), joinedload(ChatMessageModel.team), joinedload(ChatMessageModel.parent), joinedload(ChatMessageModel.sender_user))
                 .all())
    
    chat_messages = [chat_message.to_dict() for chat_message in chat_messages]
    chat_messages.reverse()

    return chat_messages

@router.get('/negotiate', response_model=NegotiateOutput)
def negotiate(id: str):
    """
    Get Azure PubSub url with access token

    Args:
        id (str): user id
    
    Returns:
        NegotiateOutput: url with access token
    """

    token = AzurePubSubService().get_client_access_token(user_id=id)
    return NegotiateOutput(url=token['url'])

@router.post("/client/messages", status_code=201)
def create_chat_message(request: Request, response: Response, body: ChatMessageInput):
    """
    Create new chat message
    """
    # authenticate
    auth = try_auth_user(request, response)
    create_client_message(body, auth)
    return ""
    

@router.get("/{chat_id}/messages", status_code=200, response_model=List[ChatMessageOutput])
def get_chat_messages(chat_id: UUID):
    """
    Get chat messages

    Args:
        is_private_chat (bool): Is private or team chat
        agent_id (Optional[UUID]): Agent id

    """
    #todo need Authentication check

    chat_messages = (db.session.query(ChatMessageModel)
                 .filter(ChatMessageModel.chat_id == chat_id)
                 .order_by(ChatMessageModel.created_on.desc())
                 .limit(50)
                 .options(joinedload(ChatMessageModel.agent), joinedload(ChatMessageModel.team), joinedload(ChatMessageModel.parent), joinedload(ChatMessageModel.sender_user))
                 .all())
    
    chat_messages = [chat_message.to_dict() for chat_message in chat_messages]
    chat_messages.reverse()

    return chat_messages

@router.delete("/{chat_id}", status_code=200)
def delete_chat(chat_id: str, auth: UserAccount = Depends(authenticate)) -> dict:
    """
    Delete an chat by its ID. Performs a soft delete by updating the is_deleted flag.

    Args:
        agent_id (str): ID of the chat to delete.
        auth (UserAccount): Authenticated user account.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:
        ChatModel.delete_by_id(db, chat_id=chat_id, account=auth.account)
        return { "message": "Chat deleted successfully" }

    except ChatNotFoundException:
        raise HTTPException(status_code=404, detail="Chat not found")