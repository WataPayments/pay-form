// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/pay-form/:uuid" element={<App />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
