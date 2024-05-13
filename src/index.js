import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, HashRouter, Route, Routes} from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route path="/pay-form/:uuid" element={<App />} />
        </Routes>
    </HashRouter>,
    document.getElementById('root')
);
