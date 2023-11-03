from typing import List, Optional

from datasources.base import DatasourceType
from models.datasource import DatasourceModel
from services.run_log import ToolCallbackHandler
from tools.base import BaseTool
from tools.datasources.file.file import FileDatasourceTool
from tools.datasources.mysql.mysql import MySQLDatabaseTool
from tools.datasources.postgres.postgres import PostgresDatabaseTool
from typings.account import AccountOutput
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings


def get_datasource_tools(
    datasources: List[DatasourceModel],
    settings: AccountSettings,
    account: AccountOutput,
    agent_with_configs: AgentWithConfigsOutput,
    callback_handler: Optional[ToolCallbackHandler] = None,
) -> List[BaseTool]:
    """Get tools needed for datasources. For example Postgres datasource needs SQL tool to execute queries."""

    tools: List[BaseTool] = []

    for data_source in datasources:
        tool = None

        if data_source.source_type == DatasourceType.POSTGRES.value:
            tool = PostgresDatabaseTool()
        if data_source.source_type == DatasourceType.MYSQL.value:
            tool = MySQLDatabaseTool()
        if data_source.source_type == DatasourceType.FILE.value:
            tool = FileDatasourceTool()

        tool.name = f"{data_source.name} Data Source"
        tool.description = data_source.description
        tool.settings = settings
        tool.account = account
        tool.agent_with_configs = agent_with_configs
        tool.data_source_id = str(data_source.id)

        if callback_handler:
            tool.callbacks = [callback_handler]

        tools.append(tool)

    return tools
