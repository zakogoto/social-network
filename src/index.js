import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
    root.render(
      <MainApp />
    );
} 

renderApp();

// window.store = store