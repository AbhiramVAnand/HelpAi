import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home'; // Import Home component if used
import Deploy from './pages/Deploy';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />  
        <Route path="/deploy" element={<Deploy />} />  
      </Routes>
    </BrowserRouter>
  );
};

export default App;
