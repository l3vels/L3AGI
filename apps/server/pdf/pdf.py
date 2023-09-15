import camelot
from llama_index import Document, SummaryIndex

# https://en.wikipedia.org/wiki/The_World%27s_Billionaires
from llama_index import VectorStoreIndex, ServiceContext, LLMPredictor
from llama_index.query_engine import PandasQueryEngine, RetrieverQueryEngine
from llama_index.retrievers import RecursiveRetriever
from llama_index.schema import IndexNode
from llama_index.llms import OpenAI

from llama_hub.file.pymu_pdf.base import PyMuPDFReader
from pathlib import Path
from typing import List
# import boto3
from llama_hub.file.pymu_pdf.base import PyMuPDFReader
from llama_index.response_synthesizers import get_response_synthesizer
from pathlib import Path



def get_file_from_s3():
    # # Initialize boto3 client for S3
    # s3 = boto3.client('s3', region_name='us-west-2')

    # # Define the bucket and file path in S3
    # bucket_name = 'your-bucket-name'
    # s3_file_path = 'path/to/your/file.pdf'

    # # Define where you want to download the file to
    # local_file_path = '/tmp/local_file.pdf'

    # # Download the file from S3
    # s3.download_file(bucket_name, s3_file_path, local_file_path)
    return "/Users/giga/projects/l3vels/L3AGI/apps/server/pdf/data/The Billionaire By Marni Mann.pdf"
    
class L3FileRetriever:
    file_path = get_file_from_s3()

    table_dfs = []
    vector_retriever = None
    df_id_query_engine_mapping = None
    

    # use camelot to parse tables
    def get_tables(self, path: str, pages: List[int]):

        for page in pages:
            table_list = camelot.read_pdf(path, pages=str(page))
            table_df = table_list[0].df
            table_df = (
                table_df.rename(columns=table_df.iloc[0])
                .drop(table_df.index[0])
                .reset_index(drop=True)
            )
            self.table_dfs.append(table_df)
        return self.table_dfs


    def load_document(self):
        # initialize PDF reader
        reader = PyMuPDFReader()

        self.docs = reader.load(Path(self.file_path))

    
        self.table_dfs = self.get_tables(self.file_path, pages=[3, 25])

        # shows list of top billionaires in 2023
        print(self.table_dfs[0])
        return self.table_dfs
        
        
    def pandas_query_engine(self):
        # define query engines over these tables
        df_query_engines = [PandasQueryEngine(table_df) for table_df in self.table_dfs]
        df_query_engines[0].query(
            "What's the net worth of the second richest billionaire in 2023?"
        )

        llm = OpenAI(temperature=0, model="gpt-4")

        service_context = ServiceContext.from_defaults(
            llm=llm,
        )

        doc_nodes = service_context.node_parser.get_nodes_from_documents(self.docs)

        # define index nodes
        summaries = [
            "This node provides information about the world's richest billionaires in 2023",
            "This node provides information on the number of billionaires and their combined net worth from 2000 to 2023.",
        ]

        df_nodes = [
            IndexNode(text=summary, index_id=f"pandas{idx}")
            for idx, summary in enumerate(summaries)
        ]

        self.df_id_query_engine_mapping = {
            f"pandas{idx}": df_query_engine
            for idx, df_query_engine in enumerate(df_query_engines)
        }

        # construct top-level vector index + query engine
        vector_index = VectorStoreIndex(doc_nodes + df_nodes)
        self.vector_retriever = vector_index.as_retriever(similarity_top_k=1)

        # baseline vector index (that doesn't include the extra df nodes).
        # used to benchmark
        vector_index0 = VectorStoreIndex(doc_nodes)
        vector_query_engine0 = vector_index0.as_query_engine()

    def recursive_retriever(self, query: str):
        recursive_retriever = RecursiveRetriever(
            "vector",
            retriever_dict={"vector": self.vector_retriever},
            query_engine_dict=self.df_id_query_engine_mapping,
            verbose=True,
        )

        response_synthesizer = get_response_synthesizer(
            # service_context=service_context,
            response_mode="compact"
        )

        query_engine = RetrieverQueryEngine.from_args(
            recursive_retriever, response_synthesizer=response_synthesizer
        )
        
        return query_engine.query(query)

            

l3 = L3FileRetriever()
l3.load_document()
l3.pandas_query_engine()
l3.recursive_retriever("What's the net worth of the second richest billionaire in 2023?")

