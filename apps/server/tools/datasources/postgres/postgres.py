from typing import Optional, Type

from fastapi_sqlalchemy import db
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field

from models.config import ConfigModel
from tools.base import BaseTool
from tools.datasources.sql_query_engine import SQLQueryEngine
from utils.encyption import decrypt_data, is_encrypted


class PostgresDatabaseSchema(BaseModel):
    query: str = Field(
        description="Containing database question in English natural language. It is not SQL script!"
    )


class PostgresDatabaseTool(BaseTool):
    name = "PostgreSQL Database Q&A"

    description = (
        "useful for when you need to answer questions over Postgres datasource.\n"
        "Input is database question in English natural language. it is not SQL script!\n"
    )
    args_schema: Type[PostgresDatabaseSchema] = PostgresDatabaseSchema

    tool_id = "f5a8fec0-7399-42f5-a076-be3a8c85b689"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Convert natural language to SQL Query and execute. Return result."""

        configs = (
            db.session.query(ConfigModel)
            .where(
                ConfigModel.datasource_id == self.data_source_id,
                ConfigModel.is_deleted.is_(False),
            )
            .all()
        )

        config = {}

        for cfg in configs:
            config[cfg.key] = (
                decrypt_data(cfg.value) if is_encrypted(cfg.value) else cfg.value
            )

        user = config.get("user")
        password = config.get("pass")
        host = config.get("host")
        port = config.get("port")
        name = config.get("name")

        uri = f"postgresql+psycopg2://{user}:{password}@{host}:{port}/{name}"

        result = SQLQueryEngine(self.settings, self.agent_with_configs, uri).run(query)
        return result
