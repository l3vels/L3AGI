import re
from typing import Optional, List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from fastapi_sqlalchemy import db
from sqlalchemy.orm import joinedload
from utils.auth import authenticate
from models.chat_message import ChatMessage as ChatMessageModel
from typings.auth import UserAccount
from pubsub_service import PubSubService
from agents.conversational.l3_conversational import L3Conversational
from agents.plan_and_execute.l3_plan_and_execute import L3PlanAndExecute
from agents.agent_simulations.authoritarian.l3_authoritarian_speaker import L3AuthoritarianSpeaker
from agents.agent_simulations.debates.l3_agent_debates import L3AgentDebates
from postgres import PostgresChatMessageHistory
from typings.chat import ChatMessageInput, NegotiateOutput
from utils.chat import get_chat_session_id, has_team_member_mention, parse_agent_mention
from tools.get_tools import get_tools
from models.agent import AgentModel
from models.datasource import DatasourceModel
from utils.agent import convert_model_to_response
from tools.datasources.get_datasource_tools import get_datasource_tools
from typings.chat import ChatMessageOutput

azureService = PubSubService()

router = APIRouter()

@router.post("", status_code=201)
def create_chat_message(body: ChatMessageInput, auth: UserAccount = Depends(authenticate)):
    """
    Create new chat message
    """

    session_id = get_chat_session_id(auth.user.id, auth.account.id, body.is_private_chat, body.agent_id)
    
    mentioned_agent_id, prompt = parse_agent_mention(body.prompt)

    agent = AgentModel.get_agent_by_id(db, body.agent_id or mentioned_agent_id, auth.account)

    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")

    agent_with_configs = convert_model_to_response(agent)

    datasources = db.session.query(DatasourceModel).filter(DatasourceModel.id.in_(agent_with_configs.configs.datasources)).all()

    datasource_tools = get_datasource_tools(datasources)
    user_tools = get_tools(['SerpGoogleSearch'])
    tools = datasource_tools + user_tools

    history = PostgresChatMessageHistory(
        session_id=session_id,
        account_id=auth.account.id,
        user_id=auth.user.id,
        user=auth.user,
        parent_id=body.parent_id,
        agent_id=agent.id
    )

    human_message = history.create_human_message(body.prompt)

    azureService.send_to_group(session_id, message={
        'type': 'CHAT_MESSAGE_ADDED',
        'from': str(auth.user.id),
        'chat_message': human_message,
        'is_private_chat': body.is_private_chat,
        'local_chat_message_ref_id': body.local_chat_message_ref_id
    })

    # If team member is tagged and no agent is tagged, this means user sends a message to team member
    if has_team_member_mention(body.prompt) and not mentioned_agent_id:
        return ""

    # if version == ChatMessageVersion.CHAT_CONVERSATIONAL:
    conversational = L3Conversational(auth.user, auth.account, session_id)
    return conversational.run(agent_with_configs, tools, prompt, history, body.is_private_chat, human_message['id'])

    # if version == ChatMessageVersion.PLAN_AND_EXECUTE or version == ChatMessageVersion.PLAN_AND_EXECUTE_WITH_TOOLS:
    #     l3_plan_and_execute = L3PlanAndExecute(
    #         user=auth.user,
    #         account=auth.account,
    #         session_id=session_id,
    #     )

    #     return l3_plan_and_execute.run(tools, prompt, history, version, body.is_private_chat, human_message['id'])

    # if version == ChatMessageVersion.AUTHORITARIAN_SPEAKER:
    #     topic = prompt
        
        
    #     agents = get_agents_from_json(topic)
    #     if(agents == []):
    #         agents = [
    #         {
    #             'name': "Alexa Ray",
    #             'role': "Project Manager",
    #             'is_director': True,
    #             'location': "Austin, Texas",
    #             'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool",
    #                        "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
    #         },
    #         {
    #             'name': "Liam Park",
    #             'role': "Monetization and In-Game Purchase Advisor",
    #             'location': "Seattle, Washington",
    #             'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool",
    #                        "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
    #         },
    #         # {
    #         #     'name': "Morgan Blake",
    #         #     'role': "Blockchain Game Strategist",
    #         #     'location': "San Francisco, California",
    #         #     'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool",
    #         #                "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
    #         # },
    #         {
    #             'name': "Taylor Greene",
    #             'role': "Gameplay Analyst",
    #             'location': "Brooklyn, New York",
    #             'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool",
    #                        "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
    #         }
    #         ]
    #     else:
    #         pattern = r'json```[\s\S]*?\]```'
    #         topic = re.sub(pattern, '', topic)

    #     # TODO: tools
    #     # for agent in agents:
    #         # agent['tools'] = get_tools(agent['tools'], api, auth.user, auth.account, game)


    #     print("AUTHORITARIAN_SPEAKER ------------------------------ start", body.version)

    #     l3_authoritarian_speaker = L3AuthoritarianSpeaker(
    #         user=auth.user,
    #         account=auth.account,
    #         session_id=session_id,
    #         word_limit=30
    #     )

    #     result = l3_authoritarian_speaker.run(
    #         topic=topic,
    #         agent_summaries=agents,
    #         history=history,
    #         is_private_chat=body.is_private_chat
    #     )

    #     return result

    # if version == ChatMessageVersion.AGENT_DEBATES:
    #     print("AGENT_DEBATES ------------------------------ start", body.version)

    #     topic = prompt
    
    #     agents = get_agents_from_json(topic)
    #     if(agents == []):
    #         agents = [
    #         {
    #             # 'name': "Alexa Ray",
    #             'name': "AI Gameplay Analyst",
    #             'location': "Austin, Texas",
    #             'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool", "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
    #         },
    #         {
    #             # 'name': "Sasha Lane",
    #             'name': "AI Monetization and In-Game Purchase Advisor",
    #             'location': "Seattle, Washington",
    #             'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool", "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
    #         },
    #         # {
    #         #     # 'name': "Sasha Lane",
    #         #     'name': "AI Blockchain Game Strategist",
    #         #     'location': "Seattle, Washington",
    #         #     'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool", "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
    #         # },
    #         {
    #             # 'name': "Sasha Lane",
    #             'name': "AI Game Narrative Designer",
    #             'location': "Seattle, Washington",
    #             'tools':  ["arxiv", "ddg-search", "wikipedia", "l3_create_game_tool", "l3_report_tool", "l3_chart_code_generator_tool", "l3_import_contract_tool", "l3_web_search_tool"],
    #         }
    #     ]
    #     else:
    #         pattern = r'json```[\s\S]*?\]```'
    #         topic = re.sub(pattern, '', topic)

    #     # TODO: tools
    #     # for agent in agents:
    #     #     agent['tools'] = get_tools(agent['tools'], api, auth.user, auth.account, game)

    #     l3_agent_debates = L3AgentDebates(
    #         user=auth.user,
    #         account=auth.account,
    #         session_id=session_id,
    #         word_limit=30
    #     )

    #     result = l3_agent_debates.run(
    #         topic=topic,
    #         agent_summaries=agents,
    #         history=history,
    #         is_private_chat=body.is_private_chat
    #     )

    #     return result

@router.get("", status_code=200, response_model=List[ChatMessageOutput])
def get_chat_messages(is_private_chat: bool, agent_id: Optional[UUID] = None, auth: UserAccount = Depends(authenticate)):
    """
    Get chat messages

    Args:
        is_private_chat (bool): Is private or team chat
        agent_id (Optional[UUID]): Agent id
    """
    session_id = get_chat_session_id(auth.user.id, auth.account.id, is_private_chat, agent_id)

    chat_messages = (db.session.query(ChatMessageModel)
                 .filter(ChatMessageModel.session_id == session_id)
                 .order_by(ChatMessageModel.created_on.desc())
                 .limit(50)
                 .options(joinedload(ChatMessageModel.agent), joinedload(ChatMessageModel.parent))
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

    token = azureService.get_client_access_token(user_id=id)
    return NegotiateOutput(url=token['url'])
