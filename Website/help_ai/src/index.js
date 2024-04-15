import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from "firebase/compat/app"; // Replace with your config file path
import reportWebVitals from './reportWebVitals';

firebase.initializeApp({
  apiKey: "AIzaSyCDRAoBX79TlG3bj5vrE4ozvB2unbIgq7w",
  authDomain: "helpai-e27bd.firebaseapp.com",
  projectId: "helpai-e27bd",
  storageBucket: "helpai-e27bd.appspot.com",
  messagingSenderId: "855494177900",
  appId: "1:855494177900:web:32d7cacdb819d6f62a5449",
  measurementId: "G-XM26DYX86J"
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
