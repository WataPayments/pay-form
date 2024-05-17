import React from 'react';
import ReactDOM from 'react-dom';
import {
    RouterProvider, createHashRouter
} from 'react-router-dom';
import App from './App';
import SuccessPage from './Components/SuccessPage';
import ErrorPage from './Components/ErrorPage';

const router = createHashRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/error-pay",
        element: <ErrorPage />,
    },
    {
        path: "/pay/:uuid",
        element: <App />,
    },
    {
        path: "/success-pay",
        element: <SuccessPage />,
    },
    {
        path: "/fail-pay",
        element: <ErrorPage />,
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
    document.getElementById('root')
);
