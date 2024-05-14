import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    BrowserRouter as Router,
    createBrowserRouter,
    HashRouter,
    Route,
    RouterProvider,
    Routes
} from 'react-router-dom';
import App from './App';
import SuccessPage from './Components/SuccessPage';
import ErrorPage from './Components/ErrorPage';

const router=createBrowserRouter([
    {
        path:"pay-form/error-pay/:uuid",
        element:<ErrorPage/>,
    },
    {
        path:"/pay-form/:uuid",
        element:<App/>,
    },
    {
        path:"/pay-form/success-pay/:uuid",
        element:<SuccessPage/>,
    }
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
    document.getElementById('root')
);
