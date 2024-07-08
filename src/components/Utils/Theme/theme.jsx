import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../../App';
import { ThemeProvider } from './theme'; // Adjust the path based on your project structure

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
