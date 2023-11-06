from typing import Optional, Type

from fastapi_sqlalchemy import db
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field

from models.config import ConfigModel
from tools.base import BaseTool
from tools.datasources.sql_query_engine import SQLQueryEngine
from utils.encyption import decrypt_data, is_encrypted


class MySQLDatabaseSchema(BaseModel):
    query: str = Field(
        description="Containing database question in English natural language. It is not SQL script!"
    )


class MySQLDatabaseTool(BaseTool):
    name = "MySQL Database Q&A"

    description = (
        "useful for when you need to answer questions over MySQL datasource.\n"
        "Input is database question in English natural language. it is not SQL script!\n"
    )

    args_schema: Type[MySQLDatabaseSchema] = MySQLDatabaseSchema

    tool_id = "50f76896-7321-4e12-a3b7-c9f34ab13b1d"

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

        uri = f"mysql+pymysql://{user}:{password}@{host}:{port}/{name}"

        result = SQLQueryEngine(self.settings, self.agent_with_configs, uri).run(query)
        return result
