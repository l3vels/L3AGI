from pathlib import Path
from typing import List
from pathlib import Path
import shutil
import s3fs
from uuid import uuid4
from llama_index import SummaryIndex, VectorStoreIndex, TreeIndex, SimpleDirectoryReader, ServiceContext
from llama_index import load_index_from_storage, StorageContext
from llama_index.llms import LangChainLLM
from langchain.chat_models import ChatOpenAI
from config import Config
from services.aws_s3 import AWSS3Service
from typings.config import AccountSettings
from enum import Enum

s3 = s3fs.S3FileSystem(
   key=Config.AWS_ACCESS_KEY_ID,
   secret=Config.AWS_SECRET_ACCESS_KEY,
)

class ResponseMode(Enum):
    REFINE = 'refine'
    TREE_SUMMARIZE = 'tree_summarize'
    SIMPLE_SUMMARIZE = 'simple_summarize'

class IndexType(Enum):
    SUMMARY = 'summary'
    VECTOR_STORE = 'vector_store'
    TREE = 'tree'

class FileDatasourceRetriever:
    datasource_id = None
    index: SummaryIndex
    index_persist_dir: str
    datasource_path: Path
    service_context: ServiceContext
    index_type: str
    response_mode: str

    def __init__(self, settings: AccountSettings, index_type: str, response_mode: str, account_id: str, datasource_id: str) -> None:
        self.datasource_id = datasource_id
        self.datasource_path = Path(f"tmp/datasources/{self.datasource_id}")
        self.index_type = index_type
        self.response_mode = response_mode
        
        self.index_persist_dir = f"{Config.AWS_S3_BUCKET}/account_{account_id}/index/datasource_{self.datasource_id}"

        llm = LangChainLLM(llm=ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0, openai_api_key=settings.openai_api_key))
        self.service_context = ServiceContext.from_defaults(llm=llm)

    def index_documents(self, file_urls: List[str]):
        # Read documents from S3 and store them in tmp directory
        self.download_documents(file_urls)
        documents = SimpleDirectoryReader(self.datasource_path.resolve()).load_data()

        # Create index from documents
        if self.index_type == IndexType.SUMMARY.value:
            self.index = SummaryIndex.from_documents(documents, service_context=self.service_context)
        elif self.index_type == IndexType.VECTOR_STORE.value:
            self.index = VectorStoreIndex.from_documents(documents, service_context=self.service_context)
        elif self.index_type == IndexType.TREE.value:
            self.index = TreeIndex.from_documents(documents, service_context=self.service_context)

        # Persist index to S3
        self.index.set_index_id(self.datasource_id)
        self.index.storage_context.persist(persist_dir=self.index_persist_dir, fs=s3)  

        # Remove tmp directory
        shutil.rmtree(self.datasource_path)


    def load_index(self):
        storage_context = StorageContext.from_defaults(persist_dir=self.index_persist_dir, fs=s3)
        self.index = load_index_from_storage(storage_context, self.datasource_id)
    
    def download_documents(self, file_urls: List[str]):
        self.datasource_path.mkdir(parents=True, exist_ok=True)

        for file_url in file_urls:
            key = AWSS3Service.get_key_from_public_url(file_url)
            _, ext = key.rsplit('.', 1)
            name = f"{uuid4()}.{ext}"
            absolute_path = self.datasource_path.joinpath(name).resolve()
            AWSS3Service.download_file(key, absolute_path)

    def query(self, query_str):
        query_engine = self.index.as_query_engine(response_mode=self.response_mode, service_context=self.service_context)
        result = query_engine.query(query_str)
        return result