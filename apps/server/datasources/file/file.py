from typing import List
from datasources.base import BaseDatasource, DatasourceEnvKey, DatasourceEnvKeyType, DatasourceCategory, DatasourceType
from tools.base import BaseTool
# from tools.datasources.postgres.postgres import PostgresDatabaseTool


class FileDatasource(BaseDatasource):
    name: str = "File"
    description: str = "File datasource"
    category: DatasourceCategory = DatasourceCategory.FILE
    type: DatasourceType = DatasourceType.UPLOAD_FILE

    def get_tools(self) -> List[BaseTool]:
        return []
    
    def get_env_keys(self) -> List[DatasourceEnvKey]:
        return [
            DatasourceEnvKey(label="Database Name", key="name", key_type=DatasourceEnvKeyType.STRING, is_required=True, is_secret=True),
        ]
