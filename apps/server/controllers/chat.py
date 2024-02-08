from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response
from fastapi.responses import StreamingResponse
from fastapi_sqlalchemy import db
from sqlalchemy.orm import joinedload

from exceptions import ChatException, ChatNotFoundException
from models.agent import AgentModel
from models.chat import ChatModel
from models.chat_message import ChatMessage as ChatMessageModel
from models.config import ConfigModel
from models.team import TeamModel
from postgres import PostgresChatMessageHistory
from services.chat import create_client_message, create_user_message
from services.pubsub import AzurePubSubService
from typings.auth import UserAccount
from typings.chat import (ChatInput, ChatListOutput, ChatMessageInput,
                          ChatMessageOutput, ChatOutput, ChatStatus,
                          ChatStopInput, ChatUserMessageInput,
                          InsertChatMessagesInput, NegotiateOutput,
                          UpdateChatInput)
from typings.config import ConfigOutput
from utils.auth import (authenticate, authenticate_by_any,
                        authenticate_by_token_or_api_key, try_auth_user,
                        try_auth_user_with_any)
from utils.chat import (convert_chats_to_chat_list, convert_model_to_response,
                        get_chat_session_id)
from utils.configuration import \
    convert_model_to_response as convert_config_model_to_response

router = APIRouter()


@router.post("", status_code=201, include_in_schema=False)
def create_chat(
    chat: ChatInput, auth: UserAccount = Depends(authenticate_by_any)
) -> ChatOutput:
    if not chat.agent_id and not chat.team_id:
        ChatException("Agent or Team should be defined")

    db_chat = ChatModel.create_chat(db, chat=chat, user=auth.user, account=auth.account)
    return convert_model_to_response(db_chat)


@router.post("/widget", status_code=201, include_in_schema=False)
def create_chat_from_widget(chat: ChatInput) -> ChatOutput:
    if not chat.agent_id and not chat.team_id:
        raise ChatException("Agent or Team should be defined")

    agent = AgentModel.get_agent_by_id_with_account(db, chat.agent_id)
    print("agent", agent)
    if agent:
        user = agent.creator
        account = agent.account

    db_chat = ChatModel.create_chat(db, chat=chat, user=user, account=account)
    return convert_model_to_response(db_chat)


@router.patch("/{id}", status_code=200, include_in_schema=False)
def update_chat(
    id: UUID,
    chat: UpdateChatInput,
    auth: UserAccount = Depends(authenticate_by_any),
) -> ChatOutput:
    db_chat = ChatModel.update_chat(db, id, chat, auth.user)
    return convert_model_to_response(db_chat)


@router.get("", response_model=ChatListOutput)
def get_chats(
    filter: Optional[List[str]] = Query([""]),
    page: Optional[int] = 1,
    per_page: Optional[int] = 1,
    auth: UserAccount = Depends(authenticate_by_token_or_api_key),
) -> ChatListOutput:
    """
    Get all chats by account ID.

    Args:
        filter (Optional[List[str]]): List of strings to filter chats.
        auth (UserAccount): Authenticated user account.

    Returns:
        List[ChatOutput]: List of chats associated with the account.
    """
    db_chats, count = ChatModel.get_chats(
        db=db,
        account=auth.account,
        filter_list=filter,
        page=page,
        per_page=per_page,
    )

    chats = convert_chats_to_chat_list(db_chats)

    return ChatListOutput(chats=chats, count=count)


@router.post("/messages", status_code=201, include_in_schema=False)
async def create_user_chat_message(
    body: ChatUserMessageInput, auth: UserAccount = Depends(authenticate)
):
    """
    Create new user chat message
    """

    gen = create_user_message(body, auth)
    return StreamingResponse(gen, media_type="text/event-stream")


@router.post(
    "/stop", status_code=201, response_model=ConfigOutput, include_in_schema=False
)
def stop_run(body: ChatStopInput, auth: UserAccount = Depends(authenticate)):
    session_id = get_chat_session_id(
        auth.user.id, auth.account.id, body.agent_id, body.team_id
    )
    team_status_config = ConfigModel.get_config_by_session_id(
        db, session_id, auth.account
    )
    team_status_config.value = ChatStatus.STOPPED.value
    db.session.add(team_status_config)
    db.session.commit()
    return convert_config_model_to_response(team_status_config)


@router.get("/messages", status_code=200, response_model=List[ChatMessageOutput])
def get_chat_messages(
    request: Request,
    response: Response,
    agent_id: Optional[UUID] = None,
    team_id: Optional[UUID] = None,
    chat_id: Optional[UUID] = None,
):
    """
    Get chat messages

    Args:
        agent_id (Optional[UUID]): Agent id
        team_id (Optional[UUID]): Team of agents id
    """
    auth: UserAccount = try_auth_user_with_any(request, response)
    # todo need validate is_public or not chat
    if not chat_id and not auth:
        raise HTTPException(status_code=401, detail="Unauthorized")

    session_id = None

    if auth:
        session_id = get_chat_session_id(
            auth.user.id, auth.account.id, agent_id, team_id, chat_id
        )
    else:
        session_id = get_chat_session_id(None, None, None, None, chat_id)

    session_ids = [session_id]

    # Get child chat session ids to fetch messages from
    if chat_id:
        child_chats = (
            db.session.query(ChatModel).filter(ChatModel.parent_id == chat_id).all()
        )

        session_ids.extend(
            [get_chat_session_id(chat_id=child_chat.id) for child_chat in child_chats]
        )

    chat_messages = (
        db.session.query(ChatMessageModel)
        .filter(ChatMessageModel.session_id.in_(session_ids))
        .order_by(ChatMessageModel.created_on.desc())
        .limit(50)
        .options(
            joinedload(ChatMessageModel.agent),
            joinedload(ChatMessageModel.team),
            joinedload(ChatMessageModel.parent),
            joinedload(ChatMessageModel.sender_user),
        )
        .all()
    )

    chat_messages = [chat_message.to_dict() for chat_message in chat_messages]
    chat_messages.reverse()

    return chat_messages


@router.get(
    "/history",
    status_code=200,
    response_model=List[ChatMessageOutput],
    include_in_schema=False,
)
def get_history(agent_id: Optional[UUID] = None, team_id: Optional[UUID] = None):
    """
    Get chat messages

    Args:
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
        session_id = get_chat_session_id(
            team.creator.id, team.account.id, agent_id, team_id
        )
    if agent and (agent.is_public or agent.is_template):
        session_id = get_chat_session_id(
            agent.creator.id, agent.account.id, agent_id, team_id
        )

    if not session_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    chat_messages = (
        db.session.query(ChatMessageModel)
        .filter(ChatMessageModel.session_id == session_id)
        .order_by(ChatMessageModel.created_on.desc())
        .limit(50)
        .options(
            joinedload(ChatMessageModel.agent),
            joinedload(ChatMessageModel.team),
            joinedload(ChatMessageModel.parent),
            joinedload(ChatMessageModel.sender_user),
        )
        .all()
    )

    chat_messages = [chat_message.to_dict() for chat_message in chat_messages]
    chat_messages.reverse()

    return chat_messages


@router.get("/negotiate", response_model=NegotiateOutput, include_in_schema=False)
def negotiate(id: str):
    """
    Get Azure PubSub url with access token

    Args:
        id (str): user id

    Returns:
        NegotiateOutput: url with access token
    """
    # todo need validation

    token = AzurePubSubService().get_client_access_token(user_id=id)
    return NegotiateOutput(url=token["url"])


@router.post("/session/messages/insert", status_code=201, include_in_schema=False)
def insert_chat_messages(
    body: InsertChatMessagesInput,
    auth: UserAccount = Depends(authenticate_by_any),
):
    """
    Inserts chat messages
    """
    chat = ChatModel.get_chat_by_id(db, body.chat_id)

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    account = chat.creator_account
    user = chat.creator_user

    if auth:
        account = auth.account
        user = auth.user

    sender_name = body.contact_name if auth else "Guest"
    sender_user_id = user.id
    sender_account_id = account.id

    session_id = get_chat_session_id(
        auth.user.id, auth.account.id, chat.agent_id, chat.team_id, chat.id
    )

    history = PostgresChatMessageHistory(
        session_id=session_id,
        sender_account_id=sender_account_id,
        sender_user_id=sender_user_id,
        sender_name=sender_name,
        parent_id=None,
        team_id=chat.team_id,
        agent_id=chat.agent_id,
        chat_id=body.chat_id,
        run_id=None,
    )

    for message in body.messages:
        content = message.content.strip()

        if content == "":
            continue

        if message.type == "human":
            history.create_human_message(message=content)
        elif message.type == "ai":
            history.create_ai_message(message=content)

    return ""


@router.post("/session/messages", status_code=201, include_in_schema=False)
def create_chat_message(request: Request, response: Response, body: ChatMessageInput):
    """
    Create new chat message
    """
    # authenticate
    auth: UserAccount = try_auth_user_with_any(request, response)
    gen = create_client_message(body, auth)
    return StreamingResponse(gen, media_type="text/event-stream")


@router.post("/session/messages/draft", status_code=201, include_in_schema=False)
def create_chat_message_draft(
    request: Request, response: Response, body: ChatMessageInput
):
    """
    Create new chat message
    """
    # authenticate
    auth: UserAccount = try_auth_user(request, response)
    create_client_message(body, auth)
    return ""


@router.get("/{chat_id}", response_model=ChatOutput)
def get_chat(chat_id: UUID) -> ChatOutput:
    """
    Get all get_chats by account ID.

    Args:
        auth (UserAccount): Authenticated user account.

    Returns:
        List[ChatOutput]: List of agents associated with the account.
    """
    db_chat = ChatModel.get_chat_by_id(db=db, chat_id=chat_id)
    return convert_model_to_response(db_chat)


@router.delete("/{chat_id}", status_code=200)
def delete_chat(
    chat_id: str, auth: UserAccount = Depends(authenticate_by_token_or_api_key)
) -> dict:
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
        return {"message": "Chat deleted successfully"}

    except ChatNotFoundException:
        raise HTTPException(status_code=404, detail="Chat not found")
