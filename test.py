import requests
import os
import asyncio
import pinecone
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re
import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, firestore
from langchain_community.document_loaders import AsyncChromiumLoader
from langchain_community.document_transformers import BeautifulSoupTransformer
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI

load_dotenv()

pinecone_api_key = "9682f373-caee-41bd-b80d-7cde593a5078"
os.environ["OPENAI_API_KEY"] = "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"
use_serverless = True

import pinecone
from pinecone import Pinecone

# initialize pinecone
pc = Pinecone(
    api_key=str(pinecone_api_key)
)



cred = credentials.Certificate("./helpai-e27bd-firebase-adminsdk-1ixu1-7b64e84164.json")
firebase_admin.initialize_app(cred)




def get_data_from_firebase():
    datas = ""
    # Get a database reference
    db = firestore.client()
    collection = db.collection('scraped_data')
    # Get documents list from DB
    docs = collection.get()
    for doc in docs:
        city = doc.to_dict()
        for key, value in city.items():
            datas += str(value)            
    return datas

def create():
    docs = get_data_from_firebase()
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 1200,
        chunk_overlap = 200,
        length_function = len
    )
    docs_chunks = text_splitter.split_text(docs)
    embeddings = OpenAIEmbeddings()
    indexes = pc.list_indexes().names()
    index_name = "gec"
    index = pc.Index(index_name)
    print(index.describe_index_stats())
    docsearch = Pinecone.from_documents(docs_chunks, embeddings, index_name=index_name)
    llm=OpenAI()
    qa_with_sources = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=docsearch.as_retriever(), return_source_documents=True)
    query = "Get the principal's email address."
    result = qa_with_sources({"query": query})
    result["result"]
    result["source_documents"]
    print(result)


if __name__ == "__main__":
    create()
