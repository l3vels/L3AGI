from typing import Optional, Type
from pydantic import BaseModel, Field
from langchain.callbacks.manager import (
    CallbackManagerForToolRun,
)

from tools.base import BaseTool
from datasources.file.file_retriever import FileDatasourceRetriever

class FileDatasourceSchema(BaseModel):
    query: str = Field(description="Containing Datasource Id and question in English natural language, separated by semicolon")


class FileDatasourceTool(BaseTool):
    name = "File Datasource Q&A"
    
    description = (
        "useful for when you need to answer questions over File datasource.\n"
        "Input is string. String is separated by semicolon. First is question in English natural language. Second is datasource ID."
    )

    args_schema: Type[FileDatasourceSchema] = FileDatasourceSchema

    tool_id = "f5a8fec0-7399-42f5-a076-be3a8c85b689"

    def _run(
        self, query: str, run_manager: Optional[CallbackManagerForToolRun] = None
    ) -> str:
        """Ask questions over file datasource. Return result."""

        question, datasource_id = query.split(';')

        retriever = FileDatasourceRetriever(datasource_id)
        retriever.load_documents()
        result = retriever.query(question)
        return result

