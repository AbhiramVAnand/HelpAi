#Script that scrapes datas without any errors and write them onto a text file

import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from dotenv import load_dotenv

load_dotenv()

def scrape_website(url, visited_urls=set(), output_file="scraped_data.txt"):
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
                if 'gecskp' in next_url:
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


if __name__ == "__main__":
    college_website_url = "https://gecskp.ac.in/"  # Replace with your college's website URL
    output_file = "scraped_data.txt"  # Output file name
    # Clear existing content of the output file
    open(output_file, 'w').close()
    scrape_website(college_website_url, output_file=output_file)
