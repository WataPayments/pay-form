import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, HashRouter, Route, Routes} from 'react-router-dom';
import App from './App';
import SuccessPage from './Components/SuccessPage';
import ErrorPage from './Components/ErrorPage';

ReactDOM.render(
    <HashRouter>
        <Routes>
            <Route exact path="/pay-form/#/:uuid" element={<App />} />

            <Route path="/pay-form/success-pay/:uuid" element={<SuccessPage />} />
            <Route path="/pay-form/error-pay/:uuid" element={<ErrorPage />} />
        </Routes>
    </HashRouter>,
    document.getElementById('root')
);
