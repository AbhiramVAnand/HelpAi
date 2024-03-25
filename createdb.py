from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
import os
import shutil
from dotenv import load_dotenv

CHROMA_PATH = "chroma"


load_dotenv()

pinecone_api_key = os.environ.get('PINECONE_API_KEY')
openai_api_key = os.environ.get('OPENAI_API_KEY')


def read_text_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def run():
    file_path = "scraped_data.txt"

    raw_text = read_text_file(file_path)
    text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 1000,
    chunk_overlap  = 200,
    length_function = len,
    )
    chunks = text_splitter.split_text(raw_text)

    print(len(chunks))

    embeddings = OpenAIEmbeddings()

    if os.path.exists(CHROMA_PATH):
        shutil.rmtree(CHROMA_PATH)

    # Create a new DB from the documents.
    db = Chroma.from_texts(
        chunks, OpenAIEmbeddings(), persist_directory=CHROMA_PATH
    )
    db.persist()
    print(f"Saved {len(chunks)} chunks to {CHROMA_PATH}.")


if __name__ == "__main__":
    run()
