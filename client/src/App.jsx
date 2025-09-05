import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import Home from './pages/Home';
import './styles/App.css';

function App() {
  console.log('App component is rendering');
  
  return (
    <Router>
      <div className="App">
        <h1>Digital Scrapbook</h1>
        <p>App is working! The issue is likely in the Home component.</p>
      </div>
    </Router>
  );
}

export default App;