import os
from langchain_community.document_loaders import TextLoader  # Modified import

from langchain_community.embeddings import HuggingFaceEmbeddings
import streamlit as st
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import google.generativeai as genai
from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

from langchain_pinecone import PineconeVectorStore

load_dotenv()
GOOGLE_API_KEY = "AIzaSyCz8BIJOrUQLKyUoBxf0ReDThKDkQV62C8"

genai.configure(api_key = GOOGLE_API_KEY)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L12-v2")

loader = TextLoader("./scraped_data.txt")  

pages = loader.load()  

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1200,
    chunk_overlap = 200,
    length_function = len,
)
docs_chunks = text_splitter.split_documents(pages)

index_name = "test3"
vectorstore_from_docs = PineconeVectorStore.from_documents(
    docs_chunks,
    index_name=index_name,
    embedding=embeddings
)

query = "Who is the principal of the college"

docs = vectorstore_from_docs.similarity_search(query)

print(docs)
