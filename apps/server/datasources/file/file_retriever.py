import shutil
from enum import Enum
from pathlib import Path
from typing import List, Optional
from uuid import UUID, uuid4

import pinecone
import s3fs
import weaviate
from llama_index import (ServiceContext, SimpleDirectoryReader, StorageContext,
                         SummaryIndex, TreeIndex, VectorStoreIndex,
                         load_index_from_storage)
from llama_index.llms import LangChainLLM
from llama_index.vector_stores.pinecone import PineconeVectorStore
from llama_index.vector_stores.types import VectorStore
from llama_index.vector_stores.weaviate import WeaviateVectorStore
from llama_index.vector_stores.zep import ZepVectorStore

from config import Config
from services.aws_s3 import AWSS3Service
from typings.agent import AgentWithConfigsOutput
from typings.config import AccountSettings
from utils.model import get_llm

s3 = s3fs.S3FileSystem(
    key=Config.AWS_ACCESS_KEY_ID,
    secret=Config.AWS_SECRET_ACCESS_KEY,
)


class VectorStoreProvider(Enum):
    ZEP = "zep"
    PINECONE = "pinecone"
    WEAVIATE = "weaviate"


class IndexType(Enum):
    SUMMARY = "summary"
    VECTOR_STORE = "vector_store"
    TREE = "tree"


class FileDatasourceRetriever:
    settings: AccountSettings
    datasource_id = None
    index: SummaryIndex
    index_persist_dir: str
    datasource_path: Path
    index_type: str
    response_mode: str
    vector_store: str
    agent_with_configs: AgentWithConfigsOutput

    def __init__(
        self,
        settings: AccountSettings,
        index_type: str,
        response_mode: str,
        vector_store: str,
        account_id: str,
        datasource_id: str,
        agent_with_configs: Optional[AgentWithConfigsOutput] = None,
    ) -> None:
        self.settings = settings
        self.datasource_id = datasource_id
        self.datasource_path = Path(f"tmp/datasources/{self.datasource_id}")
        self.index_type = index_type
        self.response_mode = response_mode
        self.vector_store = vector_store
        self.agent_with_configs = agent_with_configs

        self.index_persist_dir = f"{Config.AWS_S3_BUCKET}/account_{account_id}/index/datasource_{self.datasource_id}"

    def get_vector_store(self):
        vector_store: VectorStore

        index_name = f"Idx_{UUID(self.datasource_id).hex}"

        if self.vector_store == VectorStoreProvider.ZEP.value:
            # Zep only supports alphanumeric characters. Max length 40
            index_name = UUID(self.datasource_id).hex

            vector_store = ZepVectorStore(
                api_url=Config.ZEP_API_URL,
                api_key=Config.ZEP_API_KEY,
                collection_name=index_name,
                embedding_dimensions=1536,
            )
        elif self.vector_store == VectorStoreProvider.PINECONE.value:
            pinecone.init(
                api_key=self.settings.pinecone_api_key,
                environment=self.settings.pinecone_environment,
            )
            pinecone.create_index(index_name, dimension=1536, metric="cosine")
            pinecone_index = pinecone.Index(index_name)

            vector_store = PineconeVectorStore(
                pinecone_index=pinecone_index,
            )
        elif self.vector_store == VectorStoreProvider.WEAVIATE.value:
            auth_config = weaviate.AuthApiKey(api_key=self.settings.weaviate_api_key)

            client = weaviate.Client(
                self.settings.weaviate_url,
                auth_client_secret=auth_config,
            )

            vector_store = WeaviateVectorStore(
                weaviate_client=client,
                index_name=index_name,
            )

        return vector_store

    def index_documents(self, file_urls: List[str]):
        # Read documents from S3 and store them in tmp directory
        self.download_documents(file_urls)
        documents = SimpleDirectoryReader(self.datasource_path.resolve()).load_data()

        # Create index from documents
        if self.index_type == IndexType.SUMMARY.value:
            self.index = SummaryIndex.from_documents(documents)
        elif self.index_type == IndexType.VECTOR_STORE.value:
            vector_store = self.get_vector_store()
            storage_context = StorageContext.from_defaults(vector_store=vector_store)

            self.index = VectorStoreIndex.from_documents(
                documents,
                storage_context=storage_context,
            )
        elif self.index_type == IndexType.TREE.value:
            self.index = TreeIndex.from_documents()

        # Persist index to S3
        self.index.set_index_id(self.datasource_id)
        self.index.storage_context.persist(persist_dir=self.index_persist_dir, fs=s3)

        # Remove tmp directory
        shutil.rmtree(self.datasource_path)

    def load_index(self):
        vector_store = self.get_vector_store()
        storage_context = StorageContext.from_defaults(
            persist_dir=self.index_persist_dir, fs=s3, vector_store=vector_store
        )
        self.index = load_index_from_storage(storage_context, self.datasource_id)

    def download_documents(self, file_urls: List[str]):
        self.datasource_path.mkdir(parents=True, exist_ok=True)

        for file_url in file_urls:
            key = AWSS3Service.get_key_from_public_url(file_url)
            _, ext = key.rsplit(".", 1)
            name = f"{uuid4()}.{ext}"
            absolute_path = self.datasource_path.joinpath(name).resolve()
            AWSS3Service.download_file(key, absolute_path)

    def query(self, query_str):
        llm = LangChainLLM(
            llm=get_llm(
                self.settings,
                self.agent_with_configs,
            ),
        )

        service_context = ServiceContext.from_defaults(llm=llm)

        query_engine = self.index.as_query_engine(
            response_mode=self.response_mode, service_context=service_context
        )

        result = query_engine.query(query_str)
        return result
