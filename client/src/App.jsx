import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import './styles/App.css';

function App() {
  console.log('App component rendering in production:', process.env.NODE_ENV);
  
  return (
    <Router>
      <div className="App">
        <Home />
      </div>
    </Router>
  );
}

export default App;