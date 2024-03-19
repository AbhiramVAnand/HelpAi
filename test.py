import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import re
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("./helpai-e27bd-firebase-adminsdk-1ixu1-7b64e84164.json")
firebase_admin.initialize_app(cred)


def scrape_website(url):
    # Send a GET request to the URL
    response = requests.get(url)
    i = 0
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find all links on the page
        links = soup.find_all('a', href=True)

        # Filter out YouTube links, phone numbers, and emails
        filtered_links = [link['href'] for link in links if not is_youtube_link(link['href']) and not is_phone_number(link['href']) and not is_email(link['href'])]

        # Loop through each filtered link
        for link in filtered_links:
            # Get the absolute URL of the link
            absolute_url = urljoin(url, link)

            # Send a GET request to the linked page
            linked_page_response = requests.get(absolute_url)

            # Check if the request was successful
            if linked_page_response.status_code == 200:
                # Parse the HTML content of the linked page
                linked_soup = BeautifulSoup(linked_page_response.content, 'html.parser')

                # Scrape data from the linked page
                # (replace this part with your specific scraping logic)
                linked_page_data = scrape_data_from_page(linked_soup)

                # Print or process the data from the linked page
                print("Data from linked page:", linked_page_data)
                upload_data_to_firebase(linked_page_data, i)
                i = i +1

    else:
        print("Failed to retrieve data from the website. Status code:", response.status_code)

    

def scrape_data_from_page(soup):
    # Example scraping logic:
    # Find and extract data from specific elements on the page
    # (replace this with your specific scraping logic)
    data = {}
    data['title'] = soup.title.text.strip()
    data['paragraphs'] = [p.text.strip() for p in soup.find_all('p')]
    return data

def is_youtube_link(link):
    return 'youtube.com' in link or 'youtu.be' in link

def is_phone_number(text):
    # Regular expression to match phone numbers
    phone_pattern = r'\b(?:\d[ -]?){9,}\b'
    return bool(re.search(phone_pattern, text))

def is_email(text):
    # Regular expression to match email addresses
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    return bool(re.search(email_pattern, text))

def upload_data_to_firebase(data, i):
    # Get a database reference
    db = firestore.client()
    collection = db.collection('scraped_data')
    # Push data to Firebase
    new_data_ref = collection.document(data['title']+str(i)).set(data)
    print("Data uploaded to Firebase with key:", new_data_ref)
    i = i+1

if __name__ == "__main__":
    # URL of the website to scrape
    website_url = "https://gecskp.ac.in/"

    # Call the function to scrape the website
    scrape_website(website_url)
