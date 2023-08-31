import re
from typing import Optional
from fastapi import APIRouter, Depends, Request
from fastapi_sqlalchemy import db
from utils.auth import authenticate
from models.chat_message import ChatMessage as ChatMessageModel
from enums import ChatMessageVersion
from typings.auth_types import UserAccount
from api.client import L3Api
from pubsub_service import PubSubService
from agents.conversational.l3_conversational import L3Conversational
from agents.plan_and_execute.l3_plan_and_execute import L3PlanAndExecute
from agents.agent_simulations.authoritarian.l3_authoritarian_speaker import L3AuthoritarianSpeaker
from agents.agent_simulations.debates.l3_agent_debates import L3AgentDebates
from postgres import PostgresChatMessageHistory
from typings.chat_types import ChatMessageInput, NegotiateOutput
from utils.chat_utils import get_chat_session_id, get_agents_from_json, has_agent_mention, has_team_member_mention, get_version_from_prompt, AGENT_MENTIONS
from tools.get_tools import get_tools

azureService = PubSubService()

router = APIRouter()

@router.post("", status_code=201)
def create_chat_message(body: ChatMessageInput, request: Request, auth: UserAccount = Depends(authenticate)):
    """
    Create new chat message
    """

    api = L3Api(request.headers, request.cookies)
    session_id = get_chat_session_id(auth.user.id, auth.account.id, body.is_private_chat, body.game_id)

    game = None
    collection = None

    if body.game_id:
        game = api.game.fetch_game_by_id(body.game_id)

        if game is None:
            return "Game not found"

    if body.collection_id:
        collection = api.collection.fetch_collection_by_id(body.collection_id)

        if collection is None:
            return "Collection not found"

    version = get_version_from_prompt(body.prompt)


    tools = get_tools(['SerpGoogleSearch'])

    history = PostgresChatMessageHistory(
        session_id=session_id,
        game_id=body.game_id,
        version=version.value,
        account_id=auth.account.id,
        user_id=auth.user.id,
        user=auth.user,
        parent_id=body.parent_id
    )

    human_message = history.create_human_message(body.prompt)

    azureService.send_to_group(session_id, message={
        'type': 'CHAT_MESSAGE_ADDED',
        'from': auth.user.id,
        'chat_message': human_message,
        'is_private_chat': body.is_private_chat,
        'local_chat_message_ref_id': body.local_chat_message_ref_id
    })


    # If team member is tagged and no agent is tagged, this means user sends a message to team member
    if has_team_member_mention(body.prompt) and not has_agent_mention(body.prompt):
        return ""



    prompt = body.prompt
    
    for mention in AGENT_MENTIONS:
        prompt = prompt.replace(mention, "").strip()

    if version == ChatMessageVersion.CHAT_CONVERSATIONAL:
        conversational = L3Conversational(auth.user, auth.account, game, collection, session_id)
        return conversational.run(tools, prompt, history, body.is_private_chat, human_message_id = human_message['id'])

    if version == ChatMessageVersion.PLAN_AND_EXECUTE or version == ChatMessageVersion.PLAN_AND_EXECUTE_WITH_TOOLS:
        l3_plan_and_execute = L3PlanAndExecute(
            user=auth.user,
            account=auth.account,
            game=game,
            collection=collection,
            session_id=session_id,
        )

        return l3_plan_and_execute.run(tools, prompt, history, version, body.is_private_chat, human_message['id'])

    if version == ChatMessageVersion.AUTHORITARIAN_SPEAKER:
        topic = prompt
        
        
        agents = get_agents_from_json(topic)
        if(agents == []):
            agents = [
            {
                'name': "Alexa Ray",
                'role': "Project Manager",
                'is_director': True,
                'location': "Austin, Texas",
                'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool",
                           "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
            },
            {
                'name': "Liam Park",
                'role': "Monetization and In-Game Purchase Advisor",
                'location': "Seattle, Washington",
                'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool",
                           "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
            },
            # {
            #     'name': "Morgan Blake",
            #     'role': "Blockchain Game Strategist",
            #     'location': "San Francisco, California",
            #     'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool",
            #                "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
            # },
            {
                'name': "Taylor Greene",
                'role': "Gameplay Analyst",
                'location': "Brooklyn, New York",
                'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool",
                           "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
            }
            ]
        else:
            pattern = r'json```[\s\S]*?\]```'
            topic = re.sub(pattern, '', topic)

        # TODO: tools
        # for agent in agents:
            # agent['tools'] = get_tools(agent['tools'], api, auth.user, auth.account, game)


        print("AUTHORITARIAN_SPEAKER ------------------------------ start", body.version)

        l3_authoritarian_speaker = L3AuthoritarianSpeaker(
            user=auth.user,
            account=auth.account,
            game=game,
            collection=collection,
            session_id=session_id,
            word_limit=30
        )

        result = l3_authoritarian_speaker.run(
            topic=topic,
            agent_summaries=agents,
            history=history,
            is_private_chat=body.is_private_chat
        )

        return result

    if version == ChatMessageVersion.AGENT_DEBATES:
        print("AGENT_DEBATES ------------------------------ start", body.version)

        topic = prompt
    
        agents = get_agents_from_json(topic)
        if(agents == []):
            agents = [
            {
                # 'name': "Alexa Ray",
                'name': "AI Gameplay Analyst",
                'location': "Austin, Texas",
                'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool", "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
            },
            {
                # 'name': "Sasha Lane",
                'name': "AI Monetization and In-Game Purchase Advisor",
                'location': "Seattle, Washington",
                'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool", "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
            },
            # {
            #     # 'name': "Sasha Lane",
            #     'name': "AI Blockchain Game Strategist",
            #     'location': "Seattle, Washington",
            #     'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool", "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
            # },
            {
                # 'name': "Sasha Lane",
                'name': "AI Game Narrative Designer",
                'location': "Seattle, Washington",
                'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool", "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
            }
        ]
        else:
            pattern = r'json```[\s\S]*?\]```'
            topic = re.sub(pattern, '', topic)

        # TODO: tools
        # for agent in agents:
        #     agent['tools'] = get_tools(agent['tools'], api, auth.user, auth.account, game)

        l3_agent_debates = L3AgentDebates(
            user=auth.user,
            account=auth.account,
            game=game,
            collection=collection,
            session_id=session_id,
            word_limit=30
        )

        result = l3_agent_debates.run(
            topic=topic,
            agent_summaries=agents,
            history=history,
            is_private_chat=body.is_private_chat
        )

        return result

@router.get("", status_code=200)
def get_chat_messages(is_private_chat: bool, game_id: Optional[str] = None, auth: UserAccount = Depends(authenticate)):
    """
    Get chat messages

    Args:
        is_private_chat (bool): Is private or team chat
        game_id (Optional[str], optional): Game ID. Defaults to None.
    """
    session_id = get_chat_session_id(auth.user.id, auth.account.id, is_private_chat, game_id)

    chat_messages = (db.session.query(ChatMessageModel)
                         .filter(ChatMessageModel.session_id == session_id)
                         .order_by(ChatMessageModel.created_on.desc())
                         .limit(50)
                         .all())
    
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

    token = azureService.get_client_access_token(user_id=id)
    return NegotiateOutput(url=token['url'])
