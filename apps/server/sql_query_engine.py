from llama_index.indices.struct_store.sql_query import SQLTableRetrieverQueryEngine
from llama_index.objects import SQLTableNodeMapping, ObjectIndex, SQLTableSchema
from llama_index import (
    VectorStoreIndex,
    SQLDatabase,
    ServiceContext,
    set_global_service_context,
)
from sqlalchemy import create_engine
from config import Config
from llama_index.prompts.base import Prompt
from llama_index.prompts.prompt_type import PromptType
from llama_index.llms import LangChainLLM
from llama_index.llm_predictor import LLMPredictor
from langchain.chat_models import ChatOpenAI
from llama_index.indices.query.schema import QueryBundle

DB_NAME = "l3-db-v2-dev"

if Config.NODE_ENV == "local":
    DB_NAME = "l3-db-v2-dev"
elif Config.NODE_ENV == "development":
    DB_NAME = "l3-db-v2-dev"
elif Config.NODE_ENV == "production":
    DB_NAME = "l3-core-db-prod"

DB_URI = f"postgresql+psycopg2://{Config.DB_USER}:{Config.DB_PASS}@{Config.DB_HOST}:{Config.DB_PORT}/{DB_NAME}"
engine = create_engine(DB_URI)
sql_database = SQLDatabase(engine=engine)


tables = [
    {
        "table_name": "game",
        "context_str": "This table contains games that belongs to accounts.",
    },
    {
        "table_name": "collection",
        "context_str": "This table contains collections that are created inside games. Collection is a group of "
        "assets.",
    },
    {
        "table_name": "asset",
        "context_str": "This table contains assets/NFTs that are created inside collections. Asset is a general blockchain NFT found in smart contract collection.",
    },
    {
        "table_name": "contract",
        "context_str": "This table contains contracts that are connected to each collection. Contract is smart contract for collection.",
    },
    {
        "table_name": "player",
        "context_str": '"player" table contains Blockchain players that are created inside games. Players are same as owners. Players have wallet and unique id. Do not group player by name because it\'s not unique. Players can own assets/NFTs and mint/sell/burn assets/NFTs. To see which player owns which asset/NFT, use "player_asset" table.',
    },
    {
        "table_name": "wallet",
        "context_str": "This table contains wallets that are connected to each player. Wallet is Web3 wallet. Wallet has address.",
    },
    {
        "table_name": "player_asset",
        "context_str": "This table contains relation between tables: player and asset. Player asset tells which player owns which asset/NFT and how many.",
    },
    {
        "table_name": "transaction",
        "context_str": """This table contains Blockchain transactions. Transaction is Ethereum or Polygon transaction.
Use "blockchain" field for checking if transaction is Ethereum or Polygon.
Transaction has value field in Ether.
Use "transaction_date" for date operations.
Revenue or sales can be calculated by mint transactions and value field.
Here are transaction types:
    "Mint" means that player bought asset/NFT and value field is how much player paid for asset/NFT.
    "Transfer" means that player transferred asset/NFT to another player.
    "Burn" means that player burned asset/NFT.
        """,
    },
    {
        "table_name": "transaction_asset",
        "context_str": "This table contains transaction assets/NFTs that was minted/transferred/burned inside single Blockchain transaction logs/events. Transaction asset contains relation to tables: asset and transaction. Transaction asset has amount field",
    },
    {
        "table_name": "attribute",
        "context_str": "This table contains attributes. Attributes are created inside game.",
    },
    {
        "table_name": "property",
        "context_str": "This table contains properties. Properties are created inside game.",
    },
]


def initialize_sql_index():
    # engine = create_engine(DB_URI, echo=Config.NODE_ENV == "local")
    sql_database = SQLDatabase(engine=engine)

    table_node_mapping = SQLTableNodeMapping(sql_database)

    table_schema_objs = [
        SQLTableSchema(table_name=t["table_name"], context_str=t["context_str"])
        for t in tables
    ]

    obj_index = ObjectIndex.from_objects(
        table_schema_objs,
        table_node_mapping,
        VectorStoreIndex,
    )

    return obj_index


obj_index = initialize_sql_index()


class CustomSQLTableRetrieverQueryEngine(SQLTableRetrieverQueryEngine):
    def _query(self, query_bundle: QueryBundle) -> str:
        """Answer a query."""
        table_desc_str = self._get_table_context(query_bundle)
        # logger.info(f"> Table desc str: {table_desc_str}")

        response_str = self._service_context.llm_predictor.predict(
            self._text_to_sql_prompt,
            query_str=query_bundle.query_str,
            schema=table_desc_str,
            dialect=self._sql_database.dialect,
        )

        sql_query_str = self._parse_response_to_sql(response_str)
        return sql_query_str


def create_sql_query_engine(account_id: str):
    TEXT_TO_SQL_PROMPT_TEMPLATE = (
        "Given an input question, first create a syntactically correct {dialect} "
        "query to run, then look at the results of the query and return the answer. "
        "You can order the results by a relevant column to return the most "
        "interesting examples in the database.\n"
        "Never query for all the columns from a specific table, only ask for a "
        "few relevant columns given the question.\n"
        "Pay attention to use only the column names that you can see in the schema "
        "description. "
        "Be careful to not query for columns that do not exist. "
        "Pay attention to which column is in which table. "
        "Also, qualify column names with the table name when needed.\n"
        f"Every table has 'account_id' and 'deleted' columns. Please filter by 'deleted = false' and account_id = '{account_id}'"
        "Use the following format:\n"
        "Question: Question here\n"
        "SQLQuery: SQL Query to run\n"
        "SQLResult: Result of the SQLQuery\n"
        "Answer: Final answer here\n"
        "Only use the tables listed below.\n"
        "{schema}\n"
        "Question: {query_str}\n"
        "SQLQuery: "
    )

    text_to_sql_prompt = Prompt(
        TEXT_TO_SQL_PROMPT_TEMPLATE,
        prompt_type=PromptType.TEXT_TO_SQL,
    )

    llm = LangChainLLM(llm=ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0))
    llm_predictor = LLMPredictor(llm=llm)

    service_context = ServiceContext.from_defaults(
        llm_predictor=llm_predictor,
    )

    set_global_service_context(service_context)

    query_engine = CustomSQLTableRetrieverQueryEngine(
        sql_database=sql_database,
        table_retriever=obj_index.as_retriever(similarity_top_k=4),
        synthesize_response=False,
        text_to_sql_prompt=text_to_sql_prompt,
        service_context=service_context,
    )

    return query_engine


def fix_sql_query_engine(sql: str, error: str):
    TEXT_TO_SQL_PROMPT_TEMPLATE = (
        "Given an input question, generated {dialect} query and error in the SQL query, fix SQL"
        "You can order the results by a relevant column to return the most "
        "interesting examples in the database.\n"
        "Never query for all the columns from a specific table, only ask for a "
        "few relevant columns given the question.\n"
        "Pay attention to use only the column names that you can see in the schema "
        "description. "
        "Be careful to not query for columns that do not exist. "
        "Pay attention to which column is in which table. "
        "Also, qualify column names with the table name when needed.\n"
        "Use the following format:\n"
        "Question: Question here\n"
        "SQLError: SQL Error here\n",
        "SQLGenerated: SQL that was previously run and resulted in error here\n"
        "SQLQuery: SQL Query to run\n"
        "SQLResult: Result of the SQLQuery\n"
        "Answer: Final answer here\n"
        "Only use the tables listed below.\n"
        "{schema}\n"
        "Question: {query_str}\n"
        f"SQLError: {error}\n"
        f"SQLGenerated: {sql}\n"
        "SQLQuery: ",
    )

    text_to_sql_prompt = Prompt(
        TEXT_TO_SQL_PROMPT_TEMPLATE,
        prompt_type=PromptType.TEXT_TO_SQL,
    )

    llm = LangChainLLM(llm=ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0))
    llm_predictor = LLMPredictor(llm=llm)

    service_context = ServiceContext.from_defaults(
        llm_predictor=llm_predictor,
    )

    set_global_service_context(service_context)

    query_engine = CustomSQLTableRetrieverQueryEngine(
        sql_database=sql_database,
        table_retriever=obj_index.as_retriever(similarity_top_k=6),
        synthesize_response=False,
        text_to_sql_prompt=text_to_sql_prompt,
        service_context=service_context,
    )

    return query_engine
