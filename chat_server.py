from flask import Flask, request
import os
from langchain_community.document_loaders import TextLoader  # Modified import
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv

# For errors regarding debugging

import langchain

# Set the debug flag to True to enable debugging
langchain.debug = True

load_dotenv()

app = Flask(__name__)

# Load data and create database (place outside a function for efficiency)
loader = TextLoader("./scrapedData.txt")
pages = loader.load()
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L12-v2")
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1200,
    chunk_overlap = 200,
    length_function = len,
)
docs_chunks = text_splitter.split_documents(pages)

db = FAISS.from_documents(docs_chunks, embeddings)

def answer_query(user_query):
    docs = db.similarity_search(user_query)
    content = "\n".join([x.page_content for x in docs])
    qa_prompt = "Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.----------------"
    input_text = qa_prompt + "\nContext:" + content + "\nUser question:\n" + user_query
    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    return llm.invoke(input_text).content

@app.route("/ask", methods=["POST"])
def answer():
    if request.method == "POST":
        user_query = request.json.get('query')
        if user_query is None:
            return "Error: Missing 'query' in request body", 400
        answer = answer_query(user_query)
        return answer, 200
    else:
        return "405 Method Not Allowed", 405



@app.route("/init")
def init():
    user_query = request.args.get('query')
    if user_query is None:
        return "Error: Missing 'query' in request body", 400
    answer = answer_query(user_query)
    return answer, 200

if __name__ == "__main__":
  app.run(debug=True,port=5000)
