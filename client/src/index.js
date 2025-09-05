import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log('Index.js is running');
console.log('Root element:', document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('ReactDOM root created');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('App rendered');

reportWebVitals();