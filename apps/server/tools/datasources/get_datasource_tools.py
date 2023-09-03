from typing import List
from models.datasource import DatasourceModel
from tools.datasources.postgres.postgres import PostgresDatabaseTool

def get_datasource_tools(datasources: List[DatasourceModel]):
    """Get tools needed for datasources. For example Postgres datasource needs SQL tool to execute queries."""

    tools = []

    datasource_types = [datasource.source_type for datasource in datasources]
    datasource_types = list(set(datasource_types))

    for datasource_type in datasource_types:
        if datasource_type == "Postgres":
            tools.append(PostgresDatabaseTool())


    return tools
