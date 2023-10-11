from typing import List
from datasources.base import (
    BaseDatasource,
    DatasourceEnvKey,
    DatasourceEnvKeyType,
    DatasourceCategory,
    DatasourceType,
)
from tools.base import BaseTool
from tools.datasources.file.file import FileDatasourceTool


class FileDatasource(BaseDatasource):
    name: str = "File"
    description: str = "File datasource"
    category: DatasourceCategory = DatasourceCategory.FILE
    type: DatasourceType = DatasourceType.FILE

    def get_tools(self) -> List[BaseTool]:
        return [FileDatasourceTool()]

    def get_env_keys(self) -> List[DatasourceEnvKey]:
        return [
            DatasourceEnvKey(
                label="Files",
                key="files",
                key_type=DatasourceEnvKeyType.FILES,
                is_required=True,
                is_secret=False,
            ),
        ]
