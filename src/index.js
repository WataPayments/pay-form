import React from 'react';
import ReactDOM from 'react-dom';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate, createHashRouter
} from 'react-router-dom';
import App from './App';
import SuccessPage from './Components/SuccessPage';
import ErrorPage from './Components/ErrorPage';

const router= createHashRouter([
    {
        path:"/",
        element: <Navigate to="/1"/>
    },
    {
        path:"/error-pay/:uuid",
        element:<ErrorPage/>,
    },
    {
        path:"/:uuid",
        element:<App/>,
    },
    {
        path:"/pay/:uuid",
        element:<App/>,
    },
    {
        path:"/success-pay/:uuid",
        element:<SuccessPage/>,
    }
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
    document.getElementById('root')
);
