from typing import List
from datasources.base import BaseDatasource, DatasourceEnvKey, DatasourceEnvKeyType
from tools.base import BaseTool
from tools.datasources.postgres.postgres import PostgresDatabaseTool


class PostgresDatasource(BaseDatasource):
    name: str = "Postgres"
    description: str = "PostgreSQL datasource"

    def get_tools(self) -> List[BaseTool]:
        return [PostgresDatabaseTool()]
    
    def get_env_keys(self) -> List[DatasourceEnvKey]:
        return [
            DatasourceEnvKey(label="Database Name", key="NAME", key_type=DatasourceEnvKeyType.STRING, is_required=True, is_secret=True),
            DatasourceEnvKey(label="Host", key="HOST", key_type=DatasourceEnvKeyType.STRING, is_required=True, is_secret=True),
            DatasourceEnvKey(label="Port", key="PORT", key_type=DatasourceEnvKeyType.INT, is_required=True, is_secret=True),
            DatasourceEnvKey(label="User", key="USER", key_type=DatasourceEnvKeyType.STRING, is_required=True, is_secret=True),
            DatasourceEnvKey(label="Password", key="PASS", key_type=DatasourceEnvKeyType.STRING, is_required=True, is_secret=True),
        ]