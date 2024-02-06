from typing import Dict, List, Optional, Union
from uuid import UUID

from fastapi import HTTPException
from fastapi_sqlalchemy import db

from agents.agent_simulations.authoritarian.authoritarian_speaker import \
    AuthoritarianSpeaker
from agents.agent_simulations.debates.agent_debates import AgentDebates
from agents.agent_simulations.decentralized.decentralized_speaker import \
    DecentralizedSpeaker
from agents.conversational.conversational import ConversationalAgent
from agents.plan_and_execute.plan_and_execute import PlanAndExecute
from agents.team_base import TeamOfAgentsType
from config import Config
from exceptions import ChatNotFoundException
from memory.zep.zep_memory import ZepMemory
from models.account import AccountModel
from models.agent import AgentModel
from models.chat import ChatModel
from models.chat_message import ChatMessage as ChatMessageModel
from models.config import ConfigModel
from models.datasource import DatasourceModel
from models.run import RunModel
from models.team import TeamModel
from models.user import UserModel
from postgres import PostgresChatMessageHistory
from services.pubsub import ChatPubSubService
from services.run_log import RunLogsManager
from tools.datasources.get_datasource_tools import get_datasource_tools
from tools.get_tools import get_agent_tools
from typings.agent import AgentWithConfigsOutput, DataSourceFlow
from typings.auth import UserAccount
from typings.chat import ChatMessageInput, ChatStatus, ChatUserMessageInput
from typings.config import AccountSettings, AccountVoiceSettings, ConfigInput
from typings.run import RunInput
from utils.agent import convert_model_to_response
from utils.chat import get_chat_session_id, parse_agent_mention
from utils.configuration import \
    convert_model_to_response as convert_config_model_to_response


async def create_user_message(body: ChatUserMessageInput, auth: UserAccount):
    """
    Create new user chat message
    """
    account = auth.account
    provider_account = auth.account
    user = auth.user
    provider_user = auth.user

    sender_name = user.name
    sender_user_id = user.id
    sender_account_id = account.id

    agent_id = body.agent_id
    team_id = body.team_id
    parent_id = body.parent_id

    local_chat_message_ref_id = body.local_chat_message_ref_id

    prompt = body.prompt

    session_id = get_chat_session_id(user.id, account.id, agent_id, team_id)

    async for token in process_chat_message(
        session_id=session_id,
        sender_name=sender_name,
        sender_user_id=sender_user_id,
        sender_account_id=sender_account_id,
        prompt=prompt,
        agent_id=agent_id,
        team_id=team_id,
        parent_id=parent_id,
        local_chat_message_ref_id=local_chat_message_ref_id,
        provider_account=provider_account,
        provider_user=provider_user,
        chat_id=None,
        voice_url=body.voice_url,
    ):
        yield token


async def create_client_message(body: ChatMessageInput, auth: UserAccount):
    chat_id = body.chat_id
    chat = ChatModel.get_chat_by_id(db, chat_id)
    if not chat:
        ChatNotFoundException("Chat not found")

    account = chat.creator_account
    user = chat.creator_user
    if auth:
        account = auth.account
        user = auth.user

    provider_account = chat.provider_account
    provider_user = chat.provider_user

    sender_name = user.name if auth else "Guest"
    sender_user_id = user.id
    sender_account_id = account.id

    agent_id = chat.agent_id
    team_id = chat.team_id
    parent_id = body.parent_id

    # what is it?
    local_chat_message_ref_id = body.local_chat_message_ref_id

    prompt = body.prompt
    voice_url = body.voice_url

    session_id = get_chat_session_id(user.id, account.id, agent_id, team_id, chat_id)

    voice_url = body.voice_url

    async for token in process_chat_message(
        session_id=session_id,
        sender_name=sender_name,
        sender_user_id=sender_user_id,
        sender_account_id=sender_account_id,
        prompt=prompt,
        agent_id=agent_id,
        team_id=team_id,
        parent_id=parent_id,
        local_chat_message_ref_id=local_chat_message_ref_id,
        provider_account=provider_account,
        provider_user=provider_user,
        chat_id=chat_id,
        voice_url=voice_url,
    ):
        yield token


async def process_chat_message(
    session_id: str,
    sender_name: str,
    sender_user_id: str,
    sender_account_id: str,
    prompt: str,
    agent_id: str,
    team_id: str,
    parent_id: str,
    local_chat_message_ref_id: str,
    provider_account: UserAccount,
    provider_user: UserModel,
    chat_id: str,
    voice_url: str,
):
    run = RunModel.create_run(
        db.session,
        RunInput(
            agent_id=agent_id, team_id=team_id, chat_id=chat_id, session_id=session_id
        ),
        provider_user,
        provider_account,
    )

    run_logs_manager = RunLogsManager(
        session=db.session,
        run_id=run.id,
        user_id=sender_user_id,
        account_id=sender_account_id,
        agent_id=agent_id,
        team_id=team_id,
        chat_id=chat_id,
        session_id=session_id,
    )

    agents: List[AgentWithConfigsOutput] = []
    agents, prompt = handle_agent_mentions(prompt, provider_account, agents)
    agents = append_agent_to_list(agent_id, provider_account, agents)
    agents, prompt = retrieve_parent_message_and_agent(
        parent_id, provider_account, agents, prompt
    )

    team_configs = {}
    team_configs, team = retrieve_team_configs(team_id, provider_account, team_configs)

    current_agent_id = agents[0].agent.id if len(agents) == 1 else None

    (
        history,
        human_message_id,
        memory,
        chat_pubsub_service,
    ) = create_and_send_chat_message(
        session_id=session_id,
        sender_name=sender_name,
        sender_user_id=sender_user_id,
        sender_account_id=sender_account_id,
        prompt=prompt,
        agent_id=agent_id,
        team_id=team_id,
        parent_id=parent_id,
        local_chat_message_ref_id=local_chat_message_ref_id,
        current_agent_id=current_agent_id,
        chat_id=chat_id,
        run_id=run.id,
        voice_url=voice_url,
    )

    settings = ConfigModel.get_account_settings(db.session, provider_account.id)
    # todo run async both
    voice_settings = ConfigModel.get_account_voice_settings(
        db.session, provider_account.id
    )

    res: str = ""

    if len(agents) > 0:
        for agent_with_configs in agents:
            async for token in run_conversational_agent(
                agent_with_configs=agent_with_configs,
                sender_name=sender_name,
                sender_user_id=sender_user_id,
                sender_account_id=sender_account_id,
                provider_account=provider_account,
                session_id=session_id,
                prompt=prompt,
                voice_url=voice_url,
                human_message_id=human_message_id,
                chat_pubsub_service=chat_pubsub_service,
                settings=settings,
                voice_settings=voice_settings,
                team_id=team_id,
                parent_id=parent_id,
                history=history,
                run_id=run.id,
                run_logs_manager=run_logs_manager,
            ):
                yield token
    elif team:
        handle_team_types(
            sender_name=sender_name,
            session_id=session_id,
            settings=settings,
            chat_pubsub_service=chat_pubsub_service,
            team=team,
            prompt=prompt,
            history=history,
            human_message_id=human_message_id,
            team_configs=team_configs,
            provider_account=provider_account,
            provider_user=provider_user,
            run_logs_manager=run_logs_manager,
        )

    # return res


def append_agent_to_list(agent_id, account, agents):
    if agent_id:
        agent = AgentModel.get_agent_by_id(db, agent_id)

        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")

        # If there are no mentions or user is not replying, use default agent from chat
        if len(agents) == 0:
            agents.append(convert_model_to_response(agent))
    return agents


def retrieve_parent_message_and_agent(parent_id, account, agents, prompt):
    if parent_id:
        parent = ChatMessageModel.get_chat_message_by_id(db, parent_id, account)

        if not parent:
            raise HTTPException(status_code=404, detail="Parent message not found")

        # If there are no mentions, use agent, which user replies to
        if len(agents) == 0:
            agents.append(convert_model_to_response(parent.agent))

        reply_content = parent.message["data"]["content"]
        prompt = f'Replying to {parent.agent.name}: "{reply_content}"\n' f"{prompt}"

    return agents, prompt


def retrieve_team_configs(team_id, account, team_configs):
    team = None  # Initialize team to None
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
        agent = AgentModel.get_agent_by_id(db, agent_id)
        if not agent:
            raise HTTPException(status_code=404, detail="Agent not found")
        new_agents.append(convert_model_to_response(agent))
        prompt = cleaned_prompt
    return new_agents, prompt


def handle_team_types(
    sender_name,
    session_id,
    settings,
    chat_pubsub_service,
    team,
    prompt,
    history,
    human_message_id,
    team_configs,
    provider_account,
    provider_user,
    run_logs_manager: RunLogsManager,
):
    team_status_config: Optional[ConfigModel] = None
    if team.team_type == TeamOfAgentsType.PLAN_AND_EXECUTE.value:
        return handle_plan_and_execute(
            sender_name=sender_name,
            session_id=session_id,
            settings=settings,
            chat_pubsub_service=chat_pubsub_service,
            team=team,
            prompt=prompt,
            history=history,
            human_message_id=human_message_id,
        )

    team_status_config = ConfigModel.get_config_by_session_id(
        db, session_id, provider_account
    )

    if team_status_config:
        team_status_config.value = ChatStatus.RUNNING.value
        db.session.add(team_status_config)
        db.session.commit()

    if not team_status_config:
        team_status_config = ConfigModel.create_config(
            db,
            ConfigInput(
                key="status",
                value=ChatStatus.RUNNING.value,
                key_type="string",
                is_secret=False,
                is_required=False,
                session_id=session_id,
            ),
            provider_user,
            provider_account,
        )

    if team.team_type == TeamOfAgentsType.AUTHORITARIAN_SPEAKER.value:
        handle_authoritarian_speaker(
            sender_name=sender_name,
            session_id=session_id,
            settings=settings,
            chat_pubsub_service=chat_pubsub_service,
            team=team,
            prompt=prompt,
            history=history,
            team_configs=team_configs,
            provider_account=provider_account,
        )

    if team.team_type == TeamOfAgentsType.DEBATES.value:
        handle_debates(
            sender_name=sender_name,
            session_id=session_id,
            settings=settings,
            chat_pubsub_service=chat_pubsub_service,
            team=team,
            prompt=prompt,
            history=history,
            team_configs=team_configs,
            provider_account=provider_account,
        )

    if team.team_type == TeamOfAgentsType.DECENTRALIZED_SPEAKER.value:
        handle_decentralized_speaker(
            sender_name=sender_name,
            session_id=session_id,
            settings=settings,
            chat_pubsub_service=chat_pubsub_service,
            team=team,
            prompt=prompt,
            history=history,
            team_configs=team_configs,
            provider_account=provider_account,
            run_logs_manager=run_logs_manager,
        )

    team_status_config.value = ChatStatus.IDLE.value
    db.session.add(team_status_config)
    db.session.commit()

    chat_pubsub_service.send_chat_status(
        config=convert_config_model_to_response(team_status_config).dict()
    )


def handle_plan_and_execute(
    sender_name: str,
    session_id: str,
    settings: AccountSettings,
    chat_pubsub_service: ChatPubSubService,
    team: TeamModel,
    prompt: str,
    history: ZepMemory,
    human_message_id: str,
):
    plan_and_execute = PlanAndExecute(
        sender_name=sender_name,
        session_id=session_id,
    )
    return plan_and_execute.run(
        settings, chat_pubsub_service, team, prompt, history, human_message_id
    )


def handle_authoritarian_speaker(
    sender_name: str,
    session_id: str,
    settings: AccountSettings,
    chat_pubsub_service: ChatPubSubService,
    team: TeamModel,
    prompt: str,
    history: ZepMemory,
    team_configs: Dict[str, Union[str, int, float]],
    provider_account: AccountModel,
):
    topic = prompt
    agents = [
        convert_model_to_response(item.agent)
        for item in team.team_agents
        if item.agent is not None
    ]
    stopping_probability = team_configs.get("stopping_probability", 0.2)
    word_limit = team_configs.get("word_limit", 30)

    authoritarian_speaker = AuthoritarianSpeaker(
        settings=settings,
        chat_pubsub_service=chat_pubsub_service,
        sender_name=sender_name,
        session_id=session_id,
        stopping_probability=float(stopping_probability),
        word_limit=int(word_limit),
        provider_account=provider_account,
    )

    authoritarian_speaker.run(
        topic=topic,
        team=team,
        agents_with_configs=agents,
        history=history,
    )


def handle_decentralized_speaker(
    sender_name: str,
    session_id: str,
    settings: AccountSettings,
    chat_pubsub_service: ChatPubSubService,
    team: TeamModel,
    prompt: str,
    history: ZepMemory,
    team_configs: Dict[str, Union[str, int, float]],
    provider_account: AccountModel,
    run_logs_manager: RunLogsManager,
):
    topic = prompt
    agents = [
        convert_model_to_response(item.agent)
        for item in team.team_agents
        if item.agent is not None
    ]
    stopping_probability = team_configs.get("stopping_probability", 0.2)
    word_limit = team_configs.get("word_limit", 30)

    decentralized_speaker = DecentralizedSpeaker(
        settings=settings,
        chat_pubsub_service=chat_pubsub_service,
        sender_name=sender_name,
        session_id=session_id,
        stopping_probability=float(stopping_probability),
        word_limit=int(word_limit),
        provider_account=provider_account,
        run_logs_manager=run_logs_manager,
    )

    decentralized_speaker.run(
        topic=topic,
        team=team,
        agents_with_configs=agents,
        history=history,
    )


def handle_debates(
    sender_name: str,
    session_id: str,
    settings: AccountSettings,
    chat_pubsub_service: ChatPubSubService,
    team: TeamModel,
    prompt: str,
    history: ZepMemory,
    team_configs: Dict[str, Union[str, int, float]],
    provider_account: AccountModel,
):
    topic = prompt
    agents = [
        convert_model_to_response(item.agent)
        for item in team.team_agents
        if item.agent is not None
    ]
    word_limit = team_configs.get("word_limit", 30)

    agent_debates = AgentDebates(
        settings=settings,
        chat_pubsub_service=chat_pubsub_service,
        sender_name=sender_name,
        provider_account=provider_account,
        session_id=session_id,
        word_limit=int(word_limit),
    )

    agent_debates.run(
        topic=topic,
        team=team,
        agents_with_configs=agents,
        history=history,
    )


async def run_conversational_agent(
    agent_with_configs: AgentWithConfigsOutput,
    provider_account: UserAccount,
    sender_name: str,
    sender_user_id: str,
    sender_account_id: str,
    session_id: str,
    prompt: str,
    voice_url: str,
    human_message_id: UUID,
    chat_pubsub_service: ChatPubSubService,
    settings: AccountSettings,
    voice_settings: AccountVoiceSettings,
    run_id: UUID,
    run_logs_manager: RunLogsManager,
    history: PostgresChatMessageHistory,
    team_id: Optional[UUID] = None,
    parent_id: Optional[UUID] = None,
):
    data_sources = (
        db.session.query(DatasourceModel)
        .filter(DatasourceModel.id.in_(agent_with_configs.configs.datasources))
        .all()
    )

    tool_callback_handler = run_logs_manager.get_tool_callback_handler()

    data_source_tools = get_datasource_tools(
        data_sources,
        settings,
        provider_account,
        agent_with_configs,
        tool_callback_handler,
    )

    agent_tools = get_agent_tools(
        agent_with_configs.configs.tools,
        db,
        provider_account,
        settings,
        agent_with_configs,
        tool_callback_handler,
    )

    pre_retrieved_context = ""

    if agent_with_configs.configs.source_flow == DataSourceFlow.PRE_RETRIEVAL.value:
        if len(data_source_tools) != 0:
            pre_retrieved_context = data_source_tools[0]._run(prompt)

        tools = agent_tools
    else:
        tools = data_source_tools + agent_tools

    conversational = ConversationalAgent(sender_name, provider_account, session_id)

    async for token in conversational.run(
        settings,
        voice_settings,
        chat_pubsub_service,
        agent_with_configs,
        tools,
        prompt,
        voice_url,
        history,
        human_message_id,
        run_logs_manager,
        pre_retrieved_context,
    ):
        yield token


def create_and_send_chat_message(
    session_id: str,
    sender_name: str,
    sender_user_id: str,
    sender_account_id: str,
    prompt: str,
    voice_url: str,
    agent_id: str,
    team_id: str,
    parent_id: str,
    local_chat_message_ref_id: str,
    chat_id: str,
    run_id: UUID,
    current_agent_id: Optional[str] = None,
):
    history = PostgresChatMessageHistory(
        session_id=session_id,
        sender_account_id=sender_account_id,
        sender_user_id=sender_user_id,
        sender_name=sender_name,
        parent_id=parent_id,
        team_id=team_id,
        agent_id=current_agent_id,
        chat_id=chat_id,
        run_id=run_id,
    )

    human_message = history.create_human_message(prompt, voice_url=voice_url)
    human_message_id = UUID(human_message["id"])

    memory = ZepMemory(
        session_id=session_id,
        url=Config.ZEP_API_URL,
        api_key=Config.ZEP_API_KEY,
        memory_key="chat_history",
        return_messages=True,
    )

    memory.human_name = sender_name

    chat_pubsub_service = ChatPubSubService(
        session_id=session_id,
        user_id=sender_user_id,
        agent_id=str(agent_id) if agent_id else None,
        team_id=str(team_id) if team_id else None,
        chat_id=str(chat_id) if chat_id else None,
    )

    chat_pubsub_service.send_chat_message(
        chat_message=human_message, local_chat_message_ref_id=local_chat_message_ref_id
    )

    return history, human_message_id, memory, chat_pubsub_service
