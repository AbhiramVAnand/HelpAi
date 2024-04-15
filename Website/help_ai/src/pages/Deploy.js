import React, { useState, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Install with npm install react-copy-to-clipboard

const Deploy = () => {
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  const downloadChatbotJs = async () => {
    // Replace with the actual URL of the chatbot.js file on GitHub
    const url = 'https://raw.githubusercontent.com/AbhiramVAnand/HelpAi/develop/webpage/Website/chatbot.js';
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Create temporary link
    link.download = 'chatbot.js';
    link.click(); // Simulate click to trigger download
  };

  const downloadChatbotCSS = async () => {
    // Replace with the actual URL of the chatbot.js file on GitHub
    const url = 'https://raw.githubusercontent.com/AbhiramVAnand/HelpAi/develop/webpage/Website/chatbot.js';
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Create temporary link
    link.download = 'chatbot.css';
    link.click(); // Simulate click to trigger download
  };


  return (
    <div className="container">
      <h2>Steps to Integrate Chatbot</h2>
      <ol>
        <li>
          Download both <i><b>chatbot.js</b></i> and <i><b>chatbot.css</b></i> file by clicking on the buttons below.
          <div className="download-buttons">
            <button onClick={downloadChatbotJs}>Download Chatbot.js</button> &nbsp; &nbsp;
            <button onClick={downloadChatbotCSS}>Download Chatbot.js</button>
          </div>
        </li>
        <li>
          Save both the files in your project repository.
        </li>
        <li>
          Add both the CSS and JS file to your html file.
        </li>
        <li>
            Voila! you are ready to go.
        </li>
      </ol>
    </div>
  );
};

export default Deploy;
