import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def scrape_website(url, visited_urls=set()):
    # Check if URL has already been visited to avoid infinite loops
    if url in visited_urls:
        return
    visited_urls.add(url)

    try:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            linked_page_data = scrape_data_from_page(soup)
            print("Data from linked page:", linked_page_data)
            print(linked_page_data)
            
            
            # Print other relevant data from the page
            # Example: paragraphs = soup.find_all('p')
            #          for paragraph in paragraphs:
            #              print("Paragraph:", paragraph.text.strip())

            # Recursively follow links on the page
            for link in soup.find_all('a', href=True):
                next_url = urljoin(url, link['href'])
                # Check if the URL contains "etlab"
                if 'etlab' not in next_url:
                    scrape_website(next_url, visited_urls)

    except Exception as e:
        print("Error occurred while scraping", url)
        print(e)


def scrape_data_from_page(soup):
    # Example scraping logic:
    # Find and extract data from specific elements on the page
    # (replace this with your specific scraping logic)
    data = {}
    data['title'] = soup.title.text.strip()
    data['paragraphs'] = [p.text.strip() for p in soup.find_all('p')]
    return data


if __name__ == "__main__":
    college_website_url = "https://gecskp.ac.in/"  # Replace with your college's website URL
    scrape_website(college_website_url)
