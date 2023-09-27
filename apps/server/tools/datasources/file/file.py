import json
from typing import Optional, Type
from pydantic import BaseModel, Field
from fastapi_sqlalchemy import db
from langchain.callbacks.manager import (
    CallbackManagerForToolRun,
)
from typings.config import ConfigQueryParams
from tools.base import BaseTool
from datasources.file.file_retriever import FileDatasourceRetriever
from models.config import ConfigModel

class FileDatasourceSchema(BaseModel):
    query: str = Field(description="Containing Datasource Id and question in English natural language, separated by semicolon")


class FileDatasourceTool(BaseTool):
    name = "File Datasource Q&A"
    
    description = (
        "useful for when you need to answer questions over File datasource.\n"
        "Input is string. String is separated by semicolon. First is question in English natural language. Second is datasource ID."
    )

    args_schema: Type[FileDatasourceSchema] = FileDatasourceSchema

    tool_id = "0bc35905-738c-4777-915d-6f5e0f24d887"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Ask questions over file datasource. Return result."""

        question, datasource_id = query.split(';')

        configs = ConfigModel.get_configs(db, ConfigQueryParams(datasource_id=datasource_id), self.account)
        files_config = [config for config in configs if config.key == 'files'][0]

        value = json.loads(files_config.value)
        index_type = value['index_type']
        response_mode = value['response_mode']

        retriever = FileDatasourceRetriever(self.settings, index_type, response_mode, str(self.account.id), datasource_id)
        retriever.load_index()
        result = retriever.query(question)
        return result

