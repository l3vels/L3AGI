from typing import List
from datasources.base import (
    BaseDatasource,
    DatasourceEnvKey,
    DatasourceEnvKeyType,
    DatasourceCategory,
    DatasourceType,
)
from tools.base import BaseTool
from tools.datasources.postgres.postgres import PostgresDatabaseTool


class PostgresDatasource(BaseDatasource):
    name: str = "Postgres"
    description: str = "PostgreSQL datasource"
    category: DatasourceCategory = DatasourceCategory.DATABASE
    type: DatasourceType = DatasourceType.POSTGRES

    def get_tools(self) -> List[BaseTool]:
        return [PostgresDatabaseTool()]

    def get_env_keys(self) -> List[DatasourceEnvKey]:
        return [
            DatasourceEnvKey(
                label="Database Name",
                key="name",
                key_type=DatasourceEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            DatasourceEnvKey(
                label="Host",
                key="host",
                key_type=DatasourceEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            DatasourceEnvKey(
                label="Port",
                key="port",
                key_type=DatasourceEnvKeyType.INT,
                is_required=True,
                is_secret=True,
            ),
            DatasourceEnvKey(
                label="User",
                key="user",
                key_type=DatasourceEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
            DatasourceEnvKey(
                label="Password",
                key="pass",
                key_type=DatasourceEnvKeyType.STRING,
                is_required=True,
                is_secret=True,
            ),
        ]
