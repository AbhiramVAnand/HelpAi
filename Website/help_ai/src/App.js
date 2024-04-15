import React, { useState } from 'react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Show loader
    setResponse(null); // Clear previous response

    try {
      const url = new URL('http://127.0.0.1:5001/init');
      url.searchParams.append('url', userInput);  // Add data to query string
      const response = await fetch(url.toString(), {
        method: 'GET',
      });
      // ... rest of your code
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Enter data for the API"
      />
      <button onClick={handleSubmit}>Send to API</button>
      {isLoading && <p>Loading...</p>}
      {response && <p>{response}</p>}
    </div>
  );
}

export default App;
