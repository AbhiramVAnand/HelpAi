import React, { useState, useRef } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard'; // Install with npm install react-copy-to-clipboard

const Deploy = () => {
  const [copied, setCopied] = useState(false);
  const textRef = useRef(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className="container">
      <h1>Copyable Text</h1>
      <div className="copy-container">
        <p ref={textRef}>This is the text you can copy!</p>
        <CopyToClipboard text={textRef.current?.innerText} onCopy={handleCopy}>
          <button className="copy-button">
            <i className="fas fa-copy"></i> {copied ? 'Copied!' : 'Copy'}
          </button>
        </CopyToClipboard>
      </div>
      <h2>Steps to Follow</h2>
      <ol>
        <li>Step 1: This is the first step description.</li>
        <li>Step 2: Here's what you need to do in the second step.</li>
        <li>Step 3: Follow these instructions for step 3.</li>
        {/* Add more steps as needed */}
      </ol>
    </div>
  );
};

export default Deploy;
