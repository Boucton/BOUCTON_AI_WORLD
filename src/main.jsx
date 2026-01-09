import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

const repoName = "BOUCTON_AI_WORLD"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={`/${repoName}`}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
