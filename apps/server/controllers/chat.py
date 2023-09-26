from typing import Optional, List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db
from sqlalchemy.orm import joinedload
from utils.auth import authenticate
from models.chat_message import ChatMessage as ChatMessageModel
from typings.auth import UserAccount
from agents.conversational.conversational import ConversationalAgent
from agents.plan_and_execute.plan_and_execute import PlanAndExecute
from agents.agent_simulations.authoritarian.authoritarian_speaker import AuthoritarianSpeaker
from agents.agent_simulations.debates.agent_debates import AgentDebates
from postgres import PostgresChatMessageHistory
from typings.chat import ChatMessageInput, NegotiateOutput
from utils.chat import get_chat_session_id, has_team_member_mention, parse_agent_mention
from tools.get_tools import get_agent_tools
from models.agent import AgentModel
from models.datasource import DatasourceModel
from utils.agent import convert_model_to_response
from tools.datasources.get_datasource_tools import get_datasource_tools
from typings.chat import ChatMessageOutput
from models.team import TeamModel
from models.config import ConfigModel
from agents.team_base import TeamOfAgentsType
from services.pubsub import ChatPubSubService, AzurePubSubService
from memory.zep.zep_memory import ZepMemory
from config import Config

router = APIRouter()

@router.post("", status_code=201)
def create_chat_message(body: ChatMessageInput, auth: UserAccount = Depends(authenticate)):
    """
    Create new chat message
    """

    session_id = get_chat_session_id(auth.user.id, auth.account.id, body.is_private_chat, body.agent_id, body.team_id)
    mentioned_agent_id, mentioned_team_id, prompt = parse_agent_mention(body.prompt)

    agent_id = body.agent_id or mentioned_agent_id
    team_id = body.team_id or mentioned_team_id

    agent = None
    agent_with_configs = None
    team: TeamModel = None
    team_configs = None
    parent: ChatMessageModel = None

    if body.parent_id:
        parent = ChatMessageModel.get_chat_message_by_id(db, body.parent_id, auth.account)

        if not parent:
            raise HTTPException(status_code=404, detail="Parent message not found")


    if agent_id:
        agent = AgentModel.get_agent_by_id(db, agent_id, auth.account)

        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")

        agent_with_configs = convert_model_to_response(agent)


    if team_id:
        team = TeamModel.get_team_with_agents(db, auth.account, team_id)
        
        if not team:
            raise HTTPException(status_code=404, detail="Team of agents not found")
        
        team_configs = {}

        for config in team.configs:
            team_configs[config.key] = config.value

    history = PostgresChatMessageHistory(
        session_id=session_id,
        account_id=auth.account.id,
        user_id=auth.user.id,
        user=auth.user,
        parent_id=body.parent_id,
        team_id=team_id,
        agent_id=agent_id
    )

    human_message = history.create_human_message(body.prompt)

    human_message_id = UUID(human_message['id'])

    memory = ZepMemory(
        session_id=session_id,
        url=Config.ZEP_API_URL,
        api_key=Config.ZEP_API_KEY,
        memory_key="chat_history",
        return_messages=True,
    )

    memory.human_name = auth.user.name

    chat_pubsub_service = ChatPubSubService(
        session_id=session_id,
        user=auth.user,
        is_private_chat=body.is_private_chat,
        agent_id=str(body.agent_id) if body.agent_id else body.agent_id,
        team_id=str(body.team_id) if body.team_id else body.team_id,
    )

    chat_pubsub_service.send_chat_message(chat_message=human_message, local_chat_message_ref_id=body.local_chat_message_ref_id)

    # If team member is tagged and no agent or team of agents is tagged, this means user sends a message to team member
    if has_team_member_mention(body.prompt) and not mentioned_agent_id and not mentioned_team_id:
        return ""
    
    settings = ConfigModel.get_account_settings(db, auth.account)

    if not settings.openai_api_key:
        message_text = f"Please add OpenAI API key in [Settings](/settings)"
        ai_message = history.create_ai_message(message_text, human_message_id)
        memory.save_human_message(body.prompt)
        memory.save_ai_message(message_text)
        chat_pubsub_service.send_chat_message(chat_message=ai_message)

        return message_text
    
    if parent:
        reply_content = parent.message['data']['content']

        prompt = (
            f"Replying to {parent.agent.name}: \"{reply_content}\"\n"
            f"{prompt}"
        )

    if agent:
        datasources = db.session.query(DatasourceModel).filter(DatasourceModel.id.in_(agent_with_configs.configs.datasources)).all()

        datasource_tools = get_datasource_tools(datasources, settings, auth.account)
        agent_tools = get_agent_tools(agent_with_configs.configs.tools, db, auth.account, settings)
        tools = datasource_tools + agent_tools

        conversational = ConversationalAgent(auth.user, auth.account, session_id)
        return conversational.run(settings, chat_pubsub_service, agent_with_configs, tools, prompt, history, human_message_id)

    if team:
        if team.team_type == TeamOfAgentsType.PLAN_AND_EXECUTE.value:
            plan_and_execute = PlanAndExecute(
                user=auth.user,
                account=auth.account,
                session_id=session_id,
            )

            return plan_and_execute.run(settings, chat_pubsub_service, team, prompt, history, human_message_id)

        if team.team_type == TeamOfAgentsType.AUTHORITARIAN_SPEAKER.value:
            topic = prompt
            agents = [convert_model_to_response(item.agent) for item in team.team_agents if item.agent is not None]
            stopping_probability = team_configs.get("stopping_probability", 0.2)
            word_limit = team_configs.get("word_limit", 30)

            authoritarian_speaker = AuthoritarianSpeaker(
                settings=settings,
                chat_pubsub_service=chat_pubsub_service,
                user=auth.user,
                account=auth.account,
                session_id=session_id,
                stopping_probability=float(stopping_probability),
                word_limit=int(word_limit)
            )

            result = authoritarian_speaker.run(
                topic=topic,
                team=team,
                agents_with_configs=agents,
                history=history,
            )

            return result

        if team.team_type == TeamOfAgentsType.DEBATES.value:
            topic = prompt
            agents = [convert_model_to_response(item.agent) for item in team.team_agents if item.agent is not None]
            word_limit = team_configs.get("word_limit", 30)

            agent_debates = AgentDebates(
                settings=settings,
                chat_pubsub_service=chat_pubsub_service,
                user=auth.user,
                account=auth.account,
                session_id=session_id,
                word_limit=int(word_limit)
            )

            result = agent_debates.run(
                topic=topic,
                team=team,
                agents_with_configs=agents,
                history=history,
                is_private_chat=body.is_private_chat
            )

            return result            

        if team.team_type == TeamOfAgentsType.DECENTRALIZED_SPEAKERS.value:
            pass



@router.get("", status_code=200, response_model=List[ChatMessageOutput])
def get_chat_messages(is_private_chat: bool, agent_id: Optional[UUID] = None, team_id: Optional[UUID] = None, auth: UserAccount = Depends(authenticate)):
    """
    Get chat messages

    Args:
        is_private_chat (bool): Is private or team chat
        agent_id (Optional[UUID]): Agent id
        team_id (Optional[UUID]): Team of agents id
    """
    session_id = get_chat_session_id(auth.user.id, auth.account.id, is_private_chat, agent_id, team_id)

    chat_messages = (db.session.query(ChatMessageModel)
                 .filter(ChatMessageModel.session_id == session_id)
                 .order_by(ChatMessageModel.created_on.desc())
                 .limit(50)
                 .options(joinedload(ChatMessageModel.agent), joinedload(ChatMessageModel.team), joinedload(ChatMessageModel.parent))
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
                 .options(joinedload(ChatMessageModel.agent), joinedload(ChatMessageModel.team), joinedload(ChatMessageModel.parent))
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
