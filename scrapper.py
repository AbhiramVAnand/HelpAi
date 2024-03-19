import requests
from bs4 import BeautifulSoup
import urllib.robotparser

# Function to scrape a website and follow redirects
def scrape_website(url, visited_urls):
  """
  Scrapes a website and follows redirects, keeping track of visited URLs.

  Args:
      url: The URL of the website to scrape.
      visited_urls: A set of already visited URLs to avoid infinite loops.

  Returns:
      A list of dictionaries, where each dictionary contains scraped data from a page.
  """
  scraped_data = []
  robots = urllib.robotparser.RobotFileParser()
  robots.set_url(f"{url}/robots.txt")
  robots.read()

  # Check robots.txt for allowed scraping
  if not robots.can_fetch("*", url):
      print(f"Scraping not allowed by robots.txt for {url}")
      return scraped_data

  try:
    response = requests.get(url, allow_redirects=True)
    response.raise_for_status()  # Raise exception for bad status codes
  except requests.exceptions.RequestException as e:
    print(f"Error fetching {url}: {e}")
    return scraped_data

  soup = BeautifulSoup(response.content, "html.parser")

  # Extract data from the current page (implementation depends on website structure)
  # ... your logic to extract data from the current page ...
  # data = {"title": soup.title.string, "content": ...}
  # scraped_data.append(data)

  # Find all links on the page
  links = soup.find_all("a", href=True)

  # Follow links that are not already visited and within allowed domain
  for link in links:
    href = link["href"]
    print(href)
    #if href and href not in visited_urls and robots.can_fetch("*", href):
      #visited_urls.add(href)
      #scraped_data.extend(scrape_website(href, visited_urls.copy()))

  return "scraped_data"

# Starting URL and empty set for visited URLs
start_url = "https://gecskp.ac.in/"  # Replace with your target website
visited_urls = set()

# Scrape the website and print the extracted data (modify to handle data)
scraped_data = scrape_website(start_url, visited_urls)
print(f"Scraped data: {scraped_data}")
