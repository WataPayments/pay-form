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
        path: "/error-pay/:uuid",
        element: <ErrorPage />,
    },
    {
        path: "/:uuid",
        element: <App />,
    },
    {
        path: "/success-pay/:uuid",
        element: <SuccessPage />,
    },
    {
        path:"/success-pay?id=:uuid",
        element:<SuccessPage/>
    },
    {
        path:"/failed-pay?id=:uuid",
        element:<ErrorPage/>
    }
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
    document.getElementById('root')
);
