from llama_index.core import (ServiceContext, SQLDatabase, VectorStoreIndex,
                              set_global_service_context)
from llama_index.core.indices.struct_store.sql_query import \
    SQLTableRetrieverQueryEngine
from llama_index.core.objects import (ObjectIndex, SQLTableNodeMapping,
                                      SQLTableSchema)
from llama_index.core.prompts.base import Prompt
from llama_index.core.prompts.prompt_type import PromptType
from llama_index.llms.langchain import LangChainLLM
from sqlalchemy import MetaData, create_engine

from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from utils.model import get_llm


class SQLQueryEngine:
    """LLamaIndex SQL Query Engine for SQL datasource"""

    def __init__(
        self,
        settings: AccountSettings,
        agent_with_configs: AgentWithConfigsOutput,
        uri: str,
    ):
        self.sql_database = SQLDatabase(engine=create_engine(uri))
        self.meta = MetaData()
        self.meta.reflect(bind=self.sql_database.engine)
        self.settings = settings
        self.agent_with_configs = agent_with_configs

    def run(self, query: str):
        """Run query and return result"""

        obj_index = self.initialize_sql_index()

        try:
            query_engine = self.create_sql_query_engine(obj_index)
            res = query_engine.query(query)
            return res.response
        except Exception as err:
            print(err)
            return str(err)

    def initialize_sql_index(self):
        """Initialize LLamaIndex SQL index"""

        table_names = self.meta.tables.keys()

        table_schema_objs = [
            SQLTableSchema(table_name=table_name) for table_name in table_names
        ]

        table_node_mapping = SQLTableNodeMapping(self.sql_database)

        # TODO: research about saving index

        obj_index = ObjectIndex.from_objects(
            table_schema_objs,
            table_node_mapping,
            VectorStoreIndex,
        )

        return obj_index

    def create_query_engine(self, obj_index, template: str):
        text_to_sql_prompt = Prompt(
            template,
            prompt_type=PromptType.TEXT_TO_SQL,
        )

        llm = LangChainLLM(
            llm=get_llm(
                self.settings,
                self.agent_with_configs,
            ),
        )

        service_context = ServiceContext.from_defaults(llm=llm)

        set_global_service_context(service_context)

        query_engine = SQLTableRetrieverQueryEngine(
            sql_database=self.sql_database,
            table_retriever=obj_index.as_retriever(similarity_top_k=4),
            synthesize_response=False,
            text_to_sql_prompt=text_to_sql_prompt,
            service_context=service_context,
        )

        return query_engine

    def create_sql_query_engine(self, obj_index: ObjectIndex):
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

        return self.create_query_engine(obj_index, TEXT_TO_SQL_PROMPT_TEMPLATE)

    def fix_sql_query_engine(self, obj_index: ObjectIndex, sql: str, error: str):
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

        return self.create_query_engine(obj_index, TEXT_TO_SQL_PROMPT_TEMPLATE)
