import React, { useState, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "./Deploy.css" // Install with npm install react-copy-to-clipboard

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
    const url = 'https://raw.githubusercontent.com/AbhiramVAnand/HelpAi/develop/webpage/Website/chatbot.css';
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Create temporary link
    link.download = 'chatbot.css';
    link.click(); // Simulate click to trigger download
  };


  return (
    <div className="containerDeploy">
      <div className="instructions-container">
      <h2>Steps to Integrate Chatbot</h2>
      <ol className="instruction-steps">
        <li>
          <b>Download Chatbot Files:</b>
          <div className="download-buttons">
            <button onClick={downloadChatbotJs}>Download Chatbot.js</button>
            <button onClick={downloadChatbotCSS}>Download Chatbot.css</button>
          </div>
        </li>
        <li>
          <b>Save Downloaded Files:</b>
          <p>Save both the downloaded `chatbot.js` and `chatbot.css` files in your project directory.</p>
        </li>
        <li>
          <b>Include Files in HTML:</b>
          <p>
            Add the downloaded files to your HTML file using the following code:
          </p>
          <pre>
            &lt;link rel="stylesheet" href="path/to/chatbot.css"&gt; <br/><br/>
            &lt;script src="path/to/chatbot.js"&gt;&lt;/script&gt;
          </pre>
          <p>(Replace "path/to" with the actual file paths in your project)</p>
        </li>
        <li>
          <b>Include jQuery Library (if required by chatbot.js):</b>
          <p>
            If `chatbot.js` depends on jQuery, add the following script tag just before the closing body tag in your HTML:
          </p>
          <pre>
            &lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"&gt;&lt;/script&gt;
          </pre>
          <p>(Optional, only if necessary)</p>
        </li>
        <li>
          <b>Add Chatbot Integration Tag:</b>
          <p>
            Add the following code just before the closing body tag in your HTML:
          </p>
          <pre>
            &lt;mybot&gt;&lt;/mybot&gt;
          </pre>
        </li>
        <li>
          <b>Voila! You're Ready to Go!</b>
          <p>Your chatbot should now be integrated into your web page.</p>
        </li>
      </ol>
    </div>
    </div>
  );
};

export default Deploy;

