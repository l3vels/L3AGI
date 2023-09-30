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
from typings.chat import ChatMessageInput, NegotiateOutput, ChatMessageOutput, ChatStopInput, ChatInput, ChatOutput
from utils.chat import get_chat_session_id, has_team_member_mention, parse_agent_mention, MentionModule, convert_chats_to_chat_list
from tools.get_tools import get_agent_tools
from models.agent import AgentModel
from models.datasource import DatasourceModel
from utils.agent import convert_model_to_response
from tools.datasources.get_datasource_tools import get_datasource_tools
from typings.config import ConfigInput, ConfigOutput
from models.team import TeamModel
from models.config import ConfigModel
from models.chat import ChatModel
from agents.team_base import TeamOfAgentsType
from services.pubsub import ChatPubSubService, AzurePubSubService
from memory.zep.zep_memory import ZepMemory
from typings.chat import ChatStatus
from config import Config
from utils.configuration import convert_model_to_response as convert_config_model_to_response
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from exceptions import ChatNotFoundException
from typing import Dict, Union
from models.team import TeamModel
from models.chat_message import ChatMessage as ChatMessageModel
from typings.config import AccountSettings
from services.pubsub import ChatPubSubService
from memory.zep.zep_memory import ZepMemory
from models.user import UserModel
from models.account import AccountModel



def create_user_chat_message(body: ChatMessageInput, auth: UserAccount):
    """
    Create new user chat message
    """
    account = auth.account
    user = auth.user
    session_id = get_chat_session_id(auth.user.id, auth.account.id, body.is_private_chat, body.agent_id, body.team_id)
    
    prompt = body.prompt
    agents: List[AgentWithConfigsOutput] = []    
    prompt = body.prompt    
    agents, prompt = handle_agent_mentions(prompt, auth, agents)
    agents = retrieve_agent_configs(body.agent_id, account, agents)
    agents, prompt = retrieve_parent_configs(body.parent_id, account, agents, prompt)
    
    team_configs = {}  
    team_configs, team = retrieve_team_configs(body.team_id, account, team_configs)


    current_agent_id = agents[0].agent.id if len(agents) == 1 else None

    history, human_message_id, memory, chat_pubsub_service = create_and_send_chat_message(
        session_id=session_id, 
        account=account, 
        user=user, 
        body=body, 
        current_agent_id=current_agent_id
    )

    # If team member is tagged and no agent or team of agents is tagged, this means user sends a message to team member
    # if has_team_member_mention(body.prompt) and not mentioned_agent_id and not mentioned_team_id:
    #     return ""
    
    settings = ConfigModel.get_account_settings(db, auth.account)

    if not settings.openai_api_key:
        message_text = f"Please add OpenAI API key in [Settings](/settings)"
        ai_message = history.create_ai_message(message_text, human_message_id)
        memory.save_human_message(body.prompt)
        memory.save_ai_message(message_text)
        chat_pubsub_service.send_chat_message(chat_message=ai_message)

        return message_text
    

    if len(agents) > 0:
        for agent_with_configs in agents:
            run_conversational_agent(
                agent_with_configs=agent_with_configs, 
                user=auth.user, 
                account=auth.account, 
                session_id=session_id, 
                prompt=prompt, 
                human_message_id=human_message_id, 
                chat_pubsub_service=chat_pubsub_service, 
                settings=settings, 
                team_id=body.team_id, 
                parent_id=body.parent_id
            )
    elif team:
        handle_team_types(
            user=user, 
            account=account, 
            session_id=session_id, 
            settings=settings, 
            chat_pubsub_service=chat_pubsub_service, 
            team=team, 
            prompt=prompt, 
            history=history, 
            human_message_id=human_message_id, 
            team_configs=team_configs, 
            body=body
        )

    return ""


def create_chat_message(body: ChatMessageInput, auth: UserAccount):
    chat_id = body.chat_id
    session_id = get_chat_session_id(auth.user.id, auth.account.id, body.is_private_chat, body.agent_id, body.team_id)
    

def retrieve_agent_configs(agent_id, account):
    agents: List[AgentWithConfigsOutput] = []
    if agent_id:
        agent = AgentModel.get_agent_by_id(db, agent_id, account)

        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")

        # If there are no mentions or user is not replying, use default agent from chat
        if len(agents) == 0:
            agents.append(convert_model_to_response(agent))
            
def retrieve_parent_configs(parent_id, account, agents, prompt):
    if parent_id:
        parent = ChatMessageModel.get_chat_message_by_id(db, parent_id, account)

        if not parent:
            raise HTTPException(status_code=404, detail="Parent message not found")
        
        # If there are no mentions, use agent, which user replies to
        if len(agents) == 0:
            agents.append(convert_model_to_response(parent.agent))

        reply_content = parent.message['data']['content']
        prompt = (
            f"Replying to {parent.agent.name}: \"{reply_content}\"\n"
            f"{prompt}"
        )

    return agents, prompt

def retrieve_team_configs(team_id, account, team_configs):
    if team_id:
        team = TeamModel.get_team_with_agents(db, account, team_id)
        
        if not team:
            return {}, None  # Return empty dictionary and None if no team is found
        
        for config in team.configs:
            team_configs[config.key] = config.value
    return team_configs, team
    
def handle_agent_mentions(prompt: str, account, agents: List[AgentWithConfigsOutput]):
    mentions = parse_agent_mention(prompt)
    new_agents = agents.copy()
    for agent_id, cleaned_prompt in mentions:
        agent = AgentModel.get_agent_by_id(db, agent_id, account)
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        new_agents.append(convert_model_to_response(agent))
        prompt = cleaned_prompt
    return new_agents, prompt

def handle_team_types(user, account, session_id, settings, chat_pubsub_service, team, prompt, history, human_message_id, team_configs, body):
    team_status_config: Optional[ConfigModel] = None
    if team.team_type == TeamOfAgentsType.PLAN_AND_EXECUTE.value:
        return handle_plan_and_execute(
            user=user, 
            account=account, 
            session_id=session_id, 
            settings=settings, 
            chat_pubsub_service=chat_pubsub_service, 
            team=team, 
            prompt=prompt, 
            history=history, 
            human_message_id=human_message_id
        )

    if team.team_type == TeamOfAgentsType.AUTHORITARIAN_SPEAKER.value:
        handle_authoritarian_speaker(
            user=user, 
            account=account, 
            session_id=session_id, 
            settings=settings, 
            chat_pubsub_service=chat_pubsub_service, 
            team=team, 
            prompt=prompt, 
            history=history, 
            team_configs=team_configs
        )

    if team.team_type == TeamOfAgentsType.DEBATES.value:
        handle_debates(
            user=user, 
            account=account, 
            session_id=session_id, 
            settings=settings, 
            chat_pubsub_service=chat_pubsub_service, 
            team=team, 
            prompt=prompt, 
            history=history, 
            team_configs=team_configs, 
            body=body
        )                    

    team_status_config.value = ChatStatus.IDLE.value
    db.session.add(team_status_config)
    db.session.commit()

    chat_pubsub_service.send_chat_status(config=convert_config_model_to_response(team_status_config).dict())

def handle_plan_and_execute(user: UserModel, account: AccountModel, session_id: str, settings: AccountSettings, chat_pubsub_service: ChatPubSubService, team: TeamModel, prompt: str, history: ZepMemory, human_message_id: str):
    plan_and_execute = PlanAndExecute(
        user=user,
        account=account,
        session_id=session_id,
    )
    return plan_and_execute.run(settings, chat_pubsub_service, team, prompt, history, human_message_id)

def handle_authoritarian_speaker(user: UserModel, account: AccountModel, session_id: str, settings: AccountSettings, chat_pubsub_service: ChatPubSubService, team: TeamModel, prompt: str, history: ZepMemory, team_configs: Dict[str, Union[str, int, float]]):
    topic = prompt
    agents = [convert_model_to_response(item.agent) for item in team.team_agents if item.agent is not None]
    stopping_probability = team_configs.get("stopping_probability", 0.2)
    word_limit = team_configs.get("word_limit", 30)

    authoritarian_speaker = AuthoritarianSpeaker(
        settings=settings,
        chat_pubsub_service=chat_pubsub_service,
        user=user,
        account=account,
        session_id=session_id,
        stopping_probability=float(stopping_probability),
        word_limit=int(word_limit)
    )

    authoritarian_speaker.run(
        topic=topic,
        team=team,
        agents_with_configs=agents,
        history=history,
    )

def handle_debates(user: UserModel, account: AccountModel, session_id: str, settings: AccountSettings, chat_pubsub_service: ChatPubSubService, team: TeamModel, prompt: str, history: ZepMemory, team_configs: Dict[str, Union[str, int, float]], body: ChatMessageInput):
    topic = prompt
    agents = [convert_model_to_response(item.agent) for item in team.team_agents if item.agent is not None]
    word_limit = team_configs.get("word_limit", 30)

    agent_debates = AgentDebates(
        settings=settings,
        chat_pubsub_service=chat_pubsub_service,
        user=user,
        account=account,
        session_id=session_id,
        word_limit=int(word_limit)
    )

    agent_debates.run(
        topic=topic,
        team=team,
        agents_with_configs=agents,
        history=history,
        is_private_chat=body.is_private_chat
    )

def run_conversational_agent(agent_with_configs: AgentWithConfigsOutput, user: UserAccount, account: UserAccount, session_id: str, prompt: str, human_message_id: UUID, chat_pubsub_service: ChatPubSubService, settings: AccountSettings, team_id: Optional[UUID] = None, parent_id: Optional[UUID] = None):
    history = PostgresChatMessageHistory(
        session_id=session_id,
        account_id=account.id,
        user_id=user.id,
        user=user,
        parent_id=parent_id,
        team_id=team_id,
        agent_id=agent_with_configs.agent.id
    )

    datasources = db.session.query(DatasourceModel).filter(DatasourceModel.id.in_(agent_with_configs.configs.datasources)).all()

    datasource_tools = get_datasource_tools(datasources, settings, account)
    agent_tools = get_agent_tools(agent_with_configs.configs.tools, db, account, settings)
    tools = datasource_tools + agent_tools

    conversational = ConversationalAgent(user, account, session_id)
    return conversational.run(settings, chat_pubsub_service, agent_with_configs, tools, prompt, history, human_message_id)

def create_and_send_chat_message(session_id: str, account: AccountModel, user: UserModel, body: ChatMessageInput, current_agent_id: Optional[str] = None):
    history = PostgresChatMessageHistory(
        session_id=session_id,
        account_id=account.id,
        user_id=user.id,
        user=user,
        parent_id=body.parent_id,
        team_id=body.team_id,
        agent_id=current_agent_id
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

    memory.human_name = user.name

    chat_pubsub_service = ChatPubSubService(
        session_id=session_id,
        user=user,
        is_private_chat=body.is_private_chat,
        agent_id=str(body.agent_id) if body.agent_id else None,
        team_id=str(body.team_id) if body.team_id else None,
    )

    chat_pubsub_service.send_chat_message(chat_message=human_message, local_chat_message_ref_id=body.local_chat_message_ref_id)

    return history, human_message_id, memory, chat_pubsub_service