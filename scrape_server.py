import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import TextLoader 
from langchain_community.embeddings import HuggingFaceEmbeddings
from dotenv import load_dotenv
import urllib.parse
import threading
import time


load_dotenv()

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/init")
def init():
    url = request.args.get('url')
    if url is None:
        return "Error: Missing 'url' parameter", 400
    domain_name = extract_domain_name(url)
    output_file = "scrapedData.txt"
    open(output_file, 'w').close()

    def scrape_in_thread():
        scrape_website(url, output_file, domain_name)

    thread = threading.Thread(target=scrape_in_thread)
    thread.start()
    thread.join(timeout=120)
    if thread.is_alive():
        return "Scraping timed out after 2 minutes", 504  # Gateway Timeout

@app.route("/gen")
def gen():
    exec(open("chat_server.py").read())
    return "Done",200
    

def scrape_website(url, output_file,domain_name, visited_urls=set()):
    # Check if URL has already been visited to avoid infinite loops
    if url in visited_urls:
        return
    visited_urls.add(url)

    try:
        response = requests.get(url)
        if response.status_code == 200:
            print(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            linked_page_data = scrape_data_from_page(soup)
            
            # Write scraped data to a text file
            with open(output_file, 'a', encoding='utf-8') as file:
                file.write(str(linked_page_data))
                
            # Recursively follow links on the page
            for link in soup.find_all('a', href=True):
                next_url = urljoin(url, link['href'])
                # Check if the URL contains "etlab"
                if domain_name in next_url:
                    scrape_website(next_url, visited_urls, output_file)

    except Exception as e:
        print("Error occurred while scraping", url)
        print(e)


def scrape_data_from_page(soup):
    # Initialize an empty string to store the formatted data
    formatted_data = ''

    # Find all <p> tags in the soup
    paragraphs = soup.find_all('p')

    # Iterate over each <p> tag
    for p in paragraphs:
        # Extract the text from the <p> tag and strip leading/trailing whitespace
        paragraph_text = p.text.strip()
        # Check if the paragraph is not empty
        if paragraph_text:
            # Append the formatted paragraph text to the string with a newline character
            formatted_data += paragraph_text + "\n "

    # Return the formatted data
    return formatted_data

def extract_domain_name(link):
    parsed_url = urllib.parse.urlparse(link)
    netloc = parsed_url.netloc
    domain_parts = netloc.split(".")
    if len(domain_parts) >= 2:
        if(domain_parts[0]!="www"):
            return domain_parts[0] 
        return domain_parts[1] 
    else:
        return None


if __name__ == "__main__":
    app.run(debug=True, port=5001)



