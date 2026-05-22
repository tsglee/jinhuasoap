import React from 'react';
import ReactDOM from 'react-dom/client';
import { RedesignApp } from './redesign/App.jsx';
import './redesign/styles/redesign.css';

ReactDOM.createRoot(document.getElementById('redesign-root')).render(
  <React.StrictMode>
    <RedesignApp />
  </React.StrictMode>,
);
