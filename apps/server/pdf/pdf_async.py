from dotenv import load_dotenv

load_dotenv(override=False)

from pathlib import Path
from typing import List
# import boto3
from llama_hub.file.pymu_pdf.base import PyMuPDFReader
from llama_index.response_synthesizers import get_response_synthesizer
from pathlib import Path
import time
from llama_index import SummaryIndex, SimpleDirectoryReader
import asyncio


class L3FileRetriever:
    query_engine = None
    index = None
    def load_documents(self):
        # load documents
        documents = SimpleDirectoryReader("/Users/giga/projects/l3vels/L3AGI/apps/server/pdf/files").load_data()
        self.index = SummaryIndex.from_documents(documents)
        
    def query(self, query_str):
        start_time = time.perf_counter()
        self.query_engine = self.index.as_query_engine(response_mode="tree_summarize")
        result = self.query_engine.query(query_str)
        elapsed_time = time.perf_counter() - start_time

        print(f"{elapsed_time:0.3f}s")
        print("-----------------------")
        print("Question::::::::::::/n", query_str)
        print("-----------------------")
        print("Answer::::::::::::/n", result)
        print("-----------------------")
        return result
    


l3 = L3FileRetriever()
l3.load_documents()

l3.query("What is Paul Graham's biggest achievement?")
l3.query("Tell me about systemic and toxic effects.")
l3.query("Give me a summary of local anesthetics.")
l3.query("Give me summary of Paul Graham document.")
