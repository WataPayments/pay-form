import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {createRoot} from "react-dom/client";
const root = createRoot(document.getElementById('root'));
root.render(
    <Router basename="/pay-form">
        <Routes>
            <Route path="/:uuid" element={<App />} />
            {/* Другие маршруты вашего приложения */}
        </Routes>
    </Router>
);
