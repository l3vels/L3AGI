from abc import abstractmethod
from enum import Enum
from typing import Dict, List, Optional

from pydantic import BaseModel, Field, validator

from models.config import ConfigModel
from typings.account import AccountOutput
from typings.config import AccountSettings, ConfigQueryParams


class VoiceEnvKeyType(Enum):
    STRING = "string"
    FILE = "file"
    INT = "int"

    def __str__(self):
        return self.value


class VoiceEnvKey(BaseModel):
    label: str = Field()
    key: str = Field()
    key_type: VoiceEnvKeyType = Field(default=VoiceEnvKeyType.STRING)
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
            return VoiceEnvKeyType.STRING
        elif isinstance(v, VoiceEnvKeyType):
            return v
        else:
            raise ValueError("key_type should be string/file/integer")


class BaseVoiceTools:
    id: str
    configs: Dict[str, str] = {}
    settings: Optional[AccountSettings] = None
    voice_slug: Optional[str] = None
    account: Optional[AccountOutput] = None

    def get_env_key(self, key: str):
        return self.configs.get(key)


class BaseVoice(BaseModel):
    id: str
    name: str
    description: str
    slug: str
    is_active: bool = Field(default=True)
    is_synthesizer: bool
    is_transcriber: bool

    def get_tools_with_configs(
        self, db, account, settings, agent_with_configs
    ) -> List[BaseVoiceTools]:
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

    # @abstractmethod
    # def get_tools(self) -> List[BaseVoiceTools]:
    #     # Add file related tools object here
    #     pass

    @abstractmethod
    def get_env_keys(self) -> List[VoiceEnvKey]:
        # Add file related config keys here
        pass
