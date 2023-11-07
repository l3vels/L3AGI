from abc import abstractmethod
from enum import Enum
from typing import Dict, List, Optional

from pydantic import BaseModel, Field, validator

from models.config import ConfigModel
from typings.agent import AgentOutput, ConfigsOutput
from typings.config import ConfigQueryParams


class IntegrationEnvKeyType(Enum):
    STRING = "string"
    FILE = "file"
    INT = "int"

    def __str__(self):
        return self.value


class IntegrationEnvKey(BaseModel):
    label: str = Field()
    key: str = Field()
    key_type: IntegrationEnvKeyType = Field(default=IntegrationEnvKeyType.STRING)
    is_required: bool = Field(default=False)
    is_secret: bool = Field(default=False)
    default_value: str = Field(default=None)

    @validator("is_secret", "is_required", pre=True, always=True)
    def check_bool(cls, v):
        """Check if the value is a boolean."""
        if v is None:
            return False
        elif isinstance(v, bool):
            return v
        else:
            raise ValueError("Value should be a boolean")

    @validator("key_type", pre=True, always=True)
    def check_key_type(cls, v):
        """Check if the value is a boolean."""
        if v is None:
            return IntegrationEnvKeyType.STRING
        elif isinstance(v, IntegrationEnvKeyType):
            return v
        else:
            raise ValueError("key_type should be string/file/integer")


class BaseIntegrationTools:
    id: str
    configs: Dict[str, str] = {}
    settings: Optional[ConfigsOutput] = None
    voice_slug: Optional[str] = None
    agent: Optional[AgentOutput] = None

    def get_env_key(self, key: str):
        return self.configs.get(key)


class BaseIntegration(BaseModel):
    id: str
    name: str
    description: str
    slug: str
    is_active: bool = Field(default=True)

    def get_tools_with_configs(
        self, db, account, settings, agent_with_configs
    ) -> List[BaseIntegrationTools]:
        configs = ConfigModel.get_configs(
            db=db, query=ConfigQueryParams(toolkit_id=self.id), account=account
        )
        config_dict = {config.key: config.value for config in configs}
        tools = self.get_tools()

        for tool in tools:
            tool.configs = config_dict
            tool.voice_slug = self.slug
            tool.settings = settings
            tool.account = account

        return tools

    @abstractmethod
    def get_env_keys(self) -> List[IntegrationEnvKey]:
        # Add file related config keys here
        pass
