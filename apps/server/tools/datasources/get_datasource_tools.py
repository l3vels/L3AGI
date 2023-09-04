from typing import List
from models.datasource import DatasourceModel
from datasources.base import DatasourceType
from tools.datasources.postgres.postgres import PostgresDatabaseTool
from tools.datasources.mysql.mysql import MySQLDatabaseTool

def get_datasource_tools(datasources: List[DatasourceModel]):
    """Get tools needed for datasources. For example Postgres datasource needs SQL tool to execute queries."""

    tools = []

    datasource_types = [datasource.source_type for datasource in datasources]
    datasource_types = list(set(datasource_types))

    for datasource_type in datasource_types:
        if datasource_type == DatasourceType.Postgres.value:
            tools.append(PostgresDatabaseTool())
        if datasource_type == DatasourceType.MySQL.value:
            tools.append(MySQLDatabaseTool())


    return tools
