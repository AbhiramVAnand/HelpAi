import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Home.css"

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!userInput) {
      return alert('Please enter a link');
    }
    setIsLoading(true); // Show loading indicator
    try {
      const response = await fetch('http://127.0.0.1:5000/init?url=' + encodeURIComponent(userInput), {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json' // Set content type for JSON data
          }// Assuming GET request for simplicity (see note below)
      });
      const data = await response.json();
      console.log('API response:', data);
      if(!!data){
        setIsLoading(false);
      }
      navigate('/deploy')
       // Hide loading indicator after receiving response
      // Handle response data (e.g., display message)
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Hide loading indicator in case of error
      alert('Error: Something went wrong!'); // Informative error message
    }
  };

  return (
    <div className="home-container">
      <h1>HelpAi!</h1>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Paste your link here"
      />
      <br/>
      <button type="submit" onClick={handleSubmit}>Start</button>
      {isLoading && <p style={{color:'white'}}>Loading...</p>} {/* Show loading text if isLoading is true */}
    </div>
  );
};

export default Home;
