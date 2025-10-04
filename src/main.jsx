// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- 1. Make sure this import exists
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. This wrapper makes routing work for your whole app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);