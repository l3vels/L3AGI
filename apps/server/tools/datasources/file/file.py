import json
from typing import Optional, Type

from fastapi_sqlalchemy import db
from langchain.callbacks.manager import CallbackManagerForToolRun
from pydantic import BaseModel, Field

from datasources.file.file_retriever import FileDatasourceRetriever
from models.config import ConfigModel
from tools.base import BaseTool
from typings.config import ConfigQueryParams


class FileDatasourceSchema(BaseModel):
    query: str = Field(description="Containing question in English natural language")


class FileDatasourceTool(BaseTool):
    name = "File Datasource Q&A"

    description = (
        "useful for when you need to answer questions over File datasource.\n"
        "Input is a question in English natural language"
    )

    args_schema: Type[FileDatasourceSchema] = FileDatasourceSchema

    tool_id = "0bc35905-738c-4777-915d-6f5e0f24d887"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Ask questions over file datasource. Return result."""

        configs = ConfigModel.get_configs(
            db, ConfigQueryParams(datasource_id=self.data_source_id), None
        )

        data_source_account_id = configs[0].account_id

        files_config = [config for config in configs if config.key == "files"][0]

        value = json.loads(files_config.value)
        index_type = value.get("index_type")
        response_mode = value.get("response_mode")
        vector_store = value.get("vector_store")
        chunk_size = value.get("chunk_size")
        similarity_top_k = value.get("similarity_top_k", 2)

        retriever = FileDatasourceRetriever(
            self.settings,
            index_type,
            response_mode,
            vector_store,
            str(self.account.id),
            str(data_source_account_id),
            self.data_source_id,
            self.agent_with_configs,
            chunk_size,
            similarity_top_k,
        )
        retriever.load_index()
        result = retriever.query(query)
        return result
