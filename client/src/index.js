import React from 'react';
import ReactDOM from 'react-dom/client';

console.log('Starting React app...');

// Minimal component
function MinimalApp() {
  return React.createElement('div', {}, 
    React.createElement('h1', {}, 'Hello World - React is Working!'),
    React.createElement('p', {}, 'If you see this, React is rendering correctly.')
  );
}

const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  console.log('Rendering app...');
  root.render(React.createElement(MinimalApp));
} else {
  console.error('Root element not found!');
}

console.log('Script finished');