import arxiv
from pathlib import Path
from llama_index import download_loader

# Download paper to local file system (LFS)
# `id_list` contains 1 item that matches our PDF's arXiv ID
paper = next(arxiv.Client().results(arxiv.Search(id_list=["1603.09320"])))
# paper.download_pdf(filename="scraped_data.pdf")

# Download and instantiate `PDFReader` from LlamaHub
PDFReader = download_loader("PDFReader")
loader = PDFReader()

# Load HNSW PDF from LFS
documents = loader.load_data(file=Path('./inp.pdf'))

# Preview one of our documents
documents[0]

print(documents[0])