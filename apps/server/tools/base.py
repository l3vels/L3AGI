from abc import abstractmethod
from enum import Enum
from typing import Any, Dict, List, Optional
from uuid import UUID

from langchain.callbacks.base import BaseCallbackHandler
from langchain.tools import BaseTool as LangchainBaseTool
from pydantic import BaseModel, Field, validator

from models.config import ConfigModel
from typings.account import AccountOutput
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings, ConfigQueryParams


class ToolEnvKeyType(Enum):
    STRING = "string"
    FILE = "file"
    INT = "int"

    def __str__(self):
        return self.value


class ToolEnvKey(BaseModel):
    label: str = Field()
    key: str = Field()
    key_type: ToolEnvKeyType = Field(default=ToolEnvKeyType.STRING)
    is_required: bool = Field(default=False)
    is_secret: bool = Field(default=False)

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
            return ToolEnvKeyType.STRING
        elif isinstance(v, ToolEnvKeyType):
            return v
        else:
            raise ValueError("key_type should be string/file/integer")


class BaseTool(LangchainBaseTool):
    tool_id: str
    configs: Dict[str, str] = {}
    settings: Optional[AccountSettings] = None
    toolkit_slug: Optional[str] = None
    account: Optional[AccountOutput] = None
    agent_with_configs: Optional[AgentWithConfigsOutput] = None

    def get_env_key(self, key: str):
        return self.configs.get(key)


class ToolCallbackHandler(BaseCallbackHandler):
    def on_tool_start(
        self,
        serialized: Dict[str, Any],
        input_str: str,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        tags: List[str] | None = None,
        metadata: Dict[str, Any] | None = None,
        **kwargs: Any,
    ) -> Any:
        # create run log model
        return super().on_tool_start(
            serialized,
            input_str,
            run_id=run_id,
            parent_run_id=parent_run_id,
            tags=tags,
            metadata=metadata,
            **kwargs,
        )

    def on_tool_error(
        self,
        error: BaseException,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        **kwargs: Any,
    ) -> Any:
        # update run log model and include error
        return super().on_tool_error(
            error, run_id=run_id, parent_run_id=parent_run_id, **kwargs
        )

    def on_tool_end(
        self,
        output: str,
        *,
        run_id: UUID,
        parent_run_id: UUID | None = None,
        **kwargs: Any,
    ) -> Any:
        #
        return super().on_tool_end(
            output, run_id=run_id, parent_run_id=parent_run_id, **kwargs
        )


class BaseToolkit(BaseModel):
    toolkit_id: str
    name: str
    description: str
    slug: str
    is_active: bool = Field(default=True)

    def get_tools_with_configs(
        self, db, account, settings, agent_with_configs
    ) -> List[BaseTool]:
        configs = ConfigModel.get_configs(
            db=db, query=ConfigQueryParams(toolkit_id=self.toolkit_id), account=account
        )
        config_dict = {config.key: config.value for config in configs}
        tools = self.get_tools()

        for tool in tools:
            tool.configs = config_dict
            tool.toolkit_slug = self.slug
            tool.settings = settings
            tool.account = account
            tool.agent_with_configs = agent_with_configs
            tool.callbacks = [ToolCallbackHandler()]

        return tools

    @abstractmethod
    def get_tools(self) -> List[BaseTool]:
        # Add file related tools object here
        pass

    @abstractmethod
    def get_env_keys(self) -> List[ToolEnvKey]:
        # Add file related config keys here
        pass
