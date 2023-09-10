from typing import List
from models.datasource import DatasourceModel
from datasources.base import DatasourceType
from tools.datasources.postgres.postgres import PostgresDatabaseTool
from tools.datasources.mysql.mysql import MySQLDatabaseTool
from tools.base import BaseTool
from typings.config import AccountSettings

def get_datasource_tools(datasources: List[DatasourceModel], settings: AccountSettings) -> List[BaseTool]:
    """Get tools needed for datasources. For example Postgres datasource needs SQL tool to execute queries."""

    tools: List[BaseTool] = []

    datasource_types = [datasource.source_type for datasource in datasources]
    datasource_types = list(set(datasource_types))

    for datasource_type in datasource_types:
        if datasource_type == DatasourceType.POSTGRES.value:
            tools.append(PostgresDatabaseTool())
        if datasource_type == DatasourceType.MYSQL.value:
            tools.append(MySQLDatabaseTool())

    for tool in tools:
        tool.settings = settings

    return tools
