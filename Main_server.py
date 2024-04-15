import os
import subprocess

from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/scraper")
def scraper():
    scraper = ['python','scrape_server.py']
    scrape_process = subprocess.run(scraper)
    return "Done",200

@app.route("/chatbot")
def chatbot():
    chat_server = ['python','chat_server.py']
    chatbot_process = subprocess.run(chat_server)
    return "Done",200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
