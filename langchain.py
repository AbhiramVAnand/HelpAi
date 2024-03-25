import os
import asyncio
import pinecone
import getpass
from pinecone import Pinecone, PodSpec  
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_openai import OpenAIEmbeddings
from dotenv import load_dotenv
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI  
from langchain.chains import RetrievalQA  


load_dotenv()

pinecone_api_key = os.environ.get('PINECONE_API_KEY')
openai_api_key = os.environ.get('OPENAI_API_KEY')

loader = PyPDFLoader("input.pdf")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1200,
    chunk_overlap  = 200,
    length_function = len,
)

docs_chunks = text_splitter.split_documents(docs)

model_name = 'text-embedding-ada-002'  

embeddings = OpenAIEmbeddings(  
    model=model_name,  
    openai_api_key=openai_api_key  
)  

pc = Pinecone(api_key=pinecone_api_key)  

index_name = 'gec'  

index = pc.Index(index_name)  
index.describe_index_stats() 
  
vectorstore = PineconeVectorStore(  
    index, embeddings, docs_chunks  
)  

query = "who is the principal"  

llm = ChatOpenAI(  
    openai_api_key=OPENAI_API_KEY,  
    model_name='gpt-3.5-turbo',  
    temperature=0.0  
)  
qa = RetrievalQA.from_chain_type(  
    llm=llm,  
    chain_type="stuff",  
    retriever=vectorstore.as_retriever()  
)  
qa.run(query)  