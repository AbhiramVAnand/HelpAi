import os
from langchain_community.document_loaders import TextLoader  # Modified import

from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_google_genai import ChatGoogleGenerativeAI

from langchain_community.vectorstores import FAISS

from dotenv import load_dotenv

load_dotenv()

loader = TextLoader("./scraped_data.txt")  # Modified loader for text file

pages = loader.load_and_split()  # Assuming each line represents a page



embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

db = FAISS.from_documents(pages, embeddings)



query = "Who is HoD of CSE Department? Get me her contact details."

docs = db.similarity_search(query)


content = "\n".join([x.page_content for x in docs])

qa_prompt = "Use the following pieces of context to answer the user's question. If you don't know the answer, just say that you don't know, don't try to make up an answer.----------------"

input_text = qa_prompt+"\nContext:"+content+"\nUser question:\n"+query

llm = ChatGoogleGenerativeAI(model="gemini-pro")

result = llm.invoke(input_text)

print(result.content)
