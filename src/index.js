import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Login from './login';
import Register from './register';
import './app.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Login />
    <Register />
  </React.StrictMode>,
  document.getElementById('root')
);
