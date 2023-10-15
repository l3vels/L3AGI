from abc import abstractmethod
from typing import List
from pydantic import BaseModel, Field, validator
from tools.base import BaseTool
from enum import Enum


class DatasourceEnvKeyType(Enum):
    STRING = "string"
    FILE = "file"
    FILES = "files"
    INT = "int"

    def __str__(self):
        return self.value


class DatasourceEnvKey(BaseModel):
    label: str = Field()
    key: str = Field()
    key_type: DatasourceEnvKeyType = Field(default=DatasourceEnvKeyType.STRING)
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
            return DatasourceEnvKeyType.STRING
        elif isinstance(v, DatasourceEnvKeyType):
            return v
        else:
            raise ValueError("key_type should be string/file/integer")


class DatasourceCategory(Enum):
    DATABASE = "Database"
    FILE = "File"
    APPLICATION = "Application"
    CRAWLER = "Crawler"

    def __str__(self):
        return self.value


class DatasourceType(Enum):
    POSTGRES = "Postgres"
    MYSQL = "MySQL"
    FILE = "File"
    WEB_PAGE = "Web Page"
    NOTION = "Notion"
    SHOPIFY = "Shopify"
    GOOGLE_ANALYTICS = "Google Analytics"
    FIREBASE = "Firebase"

    def __str__(self):
        return self.value


class BaseDatasource(BaseModel):
    name: str
    description: str
    category: DatasourceCategory
    type: str

    is_active: bool = Field(default=True)

    @abstractmethod
    def get_tools(self) -> List[BaseTool]:
        # Add file related tools object here
        pass

    @abstractmethod
    def get_env_keys(self) -> List[str]:
        # Add file related config keys here
        pass
