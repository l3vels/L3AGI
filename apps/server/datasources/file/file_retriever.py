import shutil
from enum import Enum
from pathlib import Path
from typing import List, Optional
from uuid import UUID, uuid4

import s3fs
from llama_index.core import (ServiceContext, Settings, SimpleDirectoryReader,
                              StorageContext, SummaryIndex, TreeIndex,
                              VectorStoreIndex, load_index_from_storage)
from llama_index.core.vector_stores.types import VectorStore
from llama_index.embeddings.langchain import LangchainEmbedding
from llama_index.embeddings.openai import OpenAIEmbedding as OpenAIEmbeddings
from llama_index.llms.langchain import LangChainLLM
from llama_index.vector_stores.pinecone import PineconeVectorStore
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
    datasource_path: Path
    index_type: str
    response_mode: str
    vector_store: str
    similarity_top_k: int
    chunk_size: int
    agent_with_configs: AgentWithConfigsOutput
    account_id: str
    data_source_account_id: str

    def __init__(
        self,
        settings: AccountSettings,
        index_type: str,
        response_mode: str,
        vector_store: str,
        account_id: str,
        data_source_account_id: str,
        datasource_id: str,
        agent_with_configs: Optional[AgentWithConfigsOutput] = None,
        chunk_size: Optional[int] = 1024,
        similarity_top_k: Optional[int] = 2,
    ) -> None:
        self.settings = settings
        self.datasource_id = datasource_id
        self.datasource_path = Path(f"tmp/datasources/{self.datasource_id}")
        self.index_type = index_type
        self.response_mode = response_mode
        self.vector_store = vector_store
        self.chunk_size = chunk_size
        self.similarity_top_k = similarity_top_k
        self.agent_with_configs = agent_with_configs
        self.account_id = account_id
        self.data_source_account_id = data_source_account_id

    def get_vector_store(self, is_retriever: bool = False):
        vector_store: VectorStore

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
            import pinecone

            # Pinecone only supports alphanumeric characters. Max length 40
            index_name = UUID(self.datasource_id).hex

            pinecone.init(
                api_key=self.settings.pinecone_api_key,
                environment=self.settings.pinecone_environment,
            )

            if not is_retriever:
                pinecone.create_index(index_name, dimension=1536, metric="cosine")

            pinecone_index = pinecone.Index(index_name)

            vector_store = PineconeVectorStore(
                pinecone_index=pinecone_index,
            )
        elif self.vector_store == VectorStoreProvider.WEAVIATE.value:
            import weaviate

            auth_config = weaviate.AuthApiKey(api_key=self.settings.weaviate_api_key)

            # Weaviate requires index name to start with uppercase letter
            index_name = f"Idx_{UUID(self.datasource_id).hex}"

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

        documents = SimpleDirectoryReader(
            self.datasource_path.resolve(), filename_as_id=True
        ).load_data()

        # Remove tmp directory
        shutil.rmtree(self.datasource_path)

        Settings.embed_model = OpenAIEmbeddings(
            api_key=self.settings.openai_api_key,
            show_progress_bar=True,
        )
        # embed_model = LangchainEmbedding(
        #     OpenAIEmbeddings(
        #         openai_api_key=self.settings.openai_api_key,
        #         show_progress_bar=True,
        #     ),
        # )

        service_context = ServiceContext.from_defaults(
            chunk_size=self.chunk_size, embed_model=Settings.embed_model
        )

        # try:
        #     self.load_index()
        # except FileNotFoundError:
        # Create index from documents
        if self.index_type == IndexType.SUMMARY.value:
            self.index = SummaryIndex.from_documents(
                documents, service_context=service_context, show_progress=True
            )
        elif self.index_type == IndexType.VECTOR_STORE.value:
            vector_store = self.get_vector_store()
            storage_context = StorageContext.from_defaults(vector_store=vector_store)

            self.index = VectorStoreIndex.from_documents(
                documents,
                service_context=service_context,
                storage_context=storage_context,
                show_progress=True,
            )
        elif self.index_type == IndexType.TREE.value:
            self.index = TreeIndex.from_documents(
                documents, service_context=service_context, show_progress=True
            )

        self.index.set_index_id(self.datasource_id)

        # Refresh docs if re-indexing
        # self.index.refresh_ref_docs(
        #     documents,
        #     service_context=service_context,
        #     update_kwargs={"delete_kwargs": {"delete_from_docstore": True}},
        # )

        # Persist index to S3
        index_persist_dir = f"{Config.AWS_S3_BUCKET}/account_{self.account_id}/index/datasource_{self.datasource_id}"

        self.index.storage_context.persist(persist_dir=index_persist_dir, fs=s3)

    def load_index(self):
        index_persist_dir = f"{Config.AWS_S3_BUCKET}/account_{self.data_source_account_id}/index/datasource_{self.datasource_id}"

        vector_store = self.get_vector_store(is_retriever=True)
        storage_context = StorageContext.from_defaults(
            persist_dir=index_persist_dir, fs=s3, vector_store=vector_store
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

        service_context = ServiceContext.from_defaults(
            llm=llm, chunk_size=self.chunk_size
        )

        retriever = self.index.as_retriever(
            service_context=service_context,
            similarity_top_k=self.similarity_top_k,
            verbose=True,
        )

        # query_engine = self.index.as_query_engine(
        #     response_mode=self.response_mode,
        #     service_context=service_context,
        #     similarity_top_k=self.similarity_top_k
        #     if self.index_type == IndexType.VECTOR_STORE.value
        #     else None,
        #     verbose=True,
        # )

        nodes = retriever.retrieve(query_str)
        content = "\n".join([node.text for node in nodes])
        return content
