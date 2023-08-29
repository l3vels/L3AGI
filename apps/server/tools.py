import requests
import sentry_sdk

from chains import (
    generate_sql_for_report_chain,
    generate_chart_code_chain,
    fix_generate_sql_for_report_chain,
)
import json
from chart_generator_lambda import chart_generator_lambda
import re
import base64
import io
from pubsub_service import PubSubService
from api.client import L3Api
from api.user import User
from api.account import Account
from config import Config

from langchain.agents import load_tools
from langchain import SerpAPIWrapper
from langchain.agents import Tool

from sql_query_engine import create_sql_query_engine, fix_sql_query_engine

azureService = PubSubService()


class L3Tools:
    def __init__(self, api: L3Api, user: User, account: Account, game):
        self.user = user
        self.account = account
        self.game = game
        self.api = api

    def generate_report_sql(self, action_input: str):
        try:
            print("Report Tool Objective: ", action_input)
            chain = generate_sql_for_report_chain()
            sql_string = chain.run(
                user_prompt=action_input, account_id=self.account.id
            )

            sql = self.extract_query(sql_string)
            print("SQL:")
            print(sql)
            return sql
        except Exception as e:
            sentry_sdk.capture_exception(e)
            return e

    def report_tool(self, action_input: str):
        """useful for when you need to report data.

    Report tool receives one parameter which is objective.
    Objective is A natural language string that succinctly describes the desired SQL query

    Usage:
    Report tool is ideal for getting data about: games, collections, assets, players, player's assets, wallets, transactions, and more.

    Not useful for: Chat messages or chat history

    Objectives examples:
    - What are top X minted assets?
    - Which asset was sold for the highest price?
    - Which player has the most NFTs?
    - How many assets are in total?
    - Fetch wallet details and NFTs for a player using their player_id.
    - How many collections are in a game X?

    Guidelines:
    - Avoid using Report tool to fetch chat messages or chat history.
    - Always call Report tool to get fresh data from the database instead of reading from conversation memory.
    - If the original user prompt mentions a specific game or collection, always incorporate the associated ID in your objective.
    - Referencing Chat History: You can craft an objective based on previously exchanged messages in the chat.
    - Token Limit Consideration: Limit the number of returned rows to approximately 10 if user has not specified number of records.
        """

        if Config.NODE_ENV == "production":
            try:
                sql = self.generate_report_sql(action_input)

                data = self.api.chat.fetch_sql_report(sql)
                return json.dumps(data)
            except Exception as e:
                try:
                    fix_chain = fix_generate_sql_for_report_chain(
                        f"An error occurred: {e}".replace("{", "{{").replace("}", "}}"),
                        sql,
                    )
                    fix_sql_string = fix_chain.run(
                        user_prompt=action_input, account_id=self.account.id
                    )

                    fix_sql = self.extract_query(fix_sql_string)
                    print("Fixed SQL:")
                    print(fix_sql)

                    data = self.api.chat.fetch_sql_report(fix_sql)
                    return json.dumps(data)
                except Exception as e:
                    sentry_sdk.capture_exception(e)
                    print(e)
                    return "Could not retrieve data for reporting"
        else:
            try:
                query_engine = create_sql_query_engine(self.account.id)
                sql = query_engine.query(action_input)
                data = self.api.chat.fetch_sql_report(sql)
                return json.dumps(data)
            except Exception as err:
                try:
                    query_engine = fix_sql_query_engine(
                        sql, f"{err}".replace("{", "{{").replace("}", "}}")
                    )
                    sql = query_engine.query(action_input)

                    data = self.api.chat.fetch_sql_report(sql)
                    return json.dumps(data)
                except Exception as err:
                    sentry_sdk.capture_exception(err)
                    print(err)
                    return "Could not retrieve data for reporting"


    def chart_generator_tool(self, tool_input: str):
        """useful for when you need to generate chart.

    Parameter is JSON string representing action input.
        "json_data" Python List or Dictionary which was you got by calling report tool. json_data is used for pandas DataFrame
        "user_prompt" str, which is objective in natural language provided by user

    Guidelines:
    - Do not call chart generator tool if you have not called report tool yet and if you have not got data from report tool.
        """

        try:
            action = json.loads(tool_input)
            json_data = json.dumps(action["json_data"])

            chain = generate_chart_code_chain()
            code = chain.run(user_prompt=action["user_prompt"], json_data=json_data)
            code = self.extract_code(code)

            res = chart_generator_lambda(
                {
                    "code": code,
                    "params": json_data,
                },
                None,
            )

            status_code = res["statusCode"]

            if status_code == 200:
                body = json.loads(res["body"])
                base64_image = body["result"]

                game_id = None

                if self.game is not None:
                    game_id = self.game["id"]

                result = self.api.file.generate_upload_url(
                    file_name="chart.png",
                    file_type="image/png",
                    game_id=game_id,
                    location_field="chat",
                )

                img_data = io.BytesIO(base64.b64decode(base64_image))
                requests.put(result["upload_url"], data=img_data)

                return result["file_location"]
            else:
                return "Error generating chart code"
        except Exception as e:
            sentry_sdk.capture_exception(e)
            return "Could not generate chart"

    def extract_code(self, text):
        # Match triple backtick blocks first
        triple_match = re.search(r"```(?:\w+\n)?(.+?)```", text, re.DOTALL)
        if triple_match:
            return triple_match.group(1).strip()
        else:
            # If no triple backtick blocks, match single backtick blocks
            single_match = re.search(r"`(.+?)`", text, re.DOTALL)
            if single_match:
                return single_match.group(1).strip()
        # If no code blocks found, return original text
        return text

    def extract_query(self, text):
        # Match triple backtick blocks first
        triple_match = re.search(r"```(?:\w+\n)?(.+?)```", text, re.DOTALL)
        if triple_match:
            return triple_match.group(1).strip()
        else:
            # If no triple backtick blocks, match single backtick blocks
            single_match = re.search(r"`(.+?)`", text, re.DOTALL)
            if single_match:
                return single_match.group(1).strip()
        # If no code blocks found, return original text
        return text

    def import_contract_tool(self, action_input: str):
        """useful for when you need to import contract from ethereum or polygon using smart contract address.

        Import tool receives contract address, chain name and game name to import contract into game.

        Action input must be a string JSON with mentioned parameters:
            "contract_address" str, which is the address
            "chain_id" int. Available chains are 1 for Ethereum mainnet, 137 for Polygon mainnet, 80001 for Polygon
            testnet, 5 for Goerli testnet.
            "game_id": str, which is the name of the game to import contract into
        """

        action = json.loads(action_input)

        if "game_id" not in action:
            return "User must mention game to import contract into"

        try:
            data = self.api.chat.import_contract(
                action["contract_address"], action["chain_id"], action["game_id"]
            )
            return data["message"]
        except Exception as e:
            sentry_sdk.capture_exception(e)
            return "Error importing contract"


def get_tools(tool_names, api, user: User, account: Account, game):
    l3_tools = L3Tools(api=api, user=user, account=account, game=game)

    search = SerpAPIWrapper()

    l3_report_tool = Tool.from_function(l3_tools.report_tool, name="Report", description=l3_tools.report_tool.__doc__)

    l3_chart_code_generator_tool = Tool.from_function(l3_tools.chart_generator_tool, name="Chart Generator",
                                                   description=l3_tools.chart_generator_tool.__doc__)

    l3_import_contract_tool = Tool.from_function(l3_tools.import_contract_tool, name="Import contract",
                           description=l3_tools.import_contract_tool.__doc__)

    l3_web_search_tool = Tool(
        name="Search",
        func=search.run,
        description="useful for when you need to answer questions about current events"
    )
    
    tools = {
        'l3_report_tool': l3_report_tool,
        'l3_chart_code_generator_tool': l3_chart_code_generator_tool,
        'l3_import_contract_tool': l3_import_contract_tool,
        'l3_web_search_tool': l3_web_search_tool
    }

    result = []
    default_tools = []
    
    if tool_names is None:
        return list(tools.values())
    else:
        for name in tool_names:
            if name in tools:
                # todo need insure if tool-name exist if not skip
                result.append(tools[name])
            else:
                #todo need insure if tool-name exist if not skip
                default_tools.append(name)
                
    if len(default_tools) > 0:
        result = result + load_tools(default_tools)       
    
    return result