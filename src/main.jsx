import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      {/* <Router basename='/projects/FapiFormular'> */}
      <Router>
       <App />
      </Router>
   </React.StrictMode>
);
