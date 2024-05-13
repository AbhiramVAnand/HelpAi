import React, { useState } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { useNavigate } from 'react-router-dom'; // For navigation
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if(password != null  && email !=null )
      {
        const auth = await firebase.auth().signInWithEmailAndPassword(email, password);
        if(auth.user){
          alert("Login Successfull");
          navigate('/home');
        }
      }
    } catch (error) {
      console.error(error);
      // Handle login errors (display error message)
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <center>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      </center>
    </div>
  );
};

export default Login;
