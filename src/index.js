import React from 'react';
import {
    RouterProvider, createHashRouter
} from 'react-router-dom';
import App from './App';
import SuccessPage from './Components/SuccessPage';
import ErrorPage from './Components/ErrorPage';
import {createRoot} from "react-dom/client";
// import PayQrPage from "./Components/PayQrPage";

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
        path: "/success-pay?transaction_uuid=",
        element: <SuccessPage />,
    },
    {
        path:"/success-pay/:uuid",
        element:<SuccessPage/>
    },
    {
        path:"/failed-pay?transaction_uuid=:uuid",
        element:<ErrorPage/>
    },
    // {
    //     path:"/sbp-pay/:uuid",
    //     element:<PayQrPage/>
    // }
]);

const root=createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
