import React, { useEffect } from 'react';
import {
    RouterProvider, createHashRouter
} from 'react-router-dom';
import App from './App';
import SuccessPage from './Components/SuccessPage';
import ErrorPage from './Components/ErrorPage';
import { createRoot } from "react-dom/client";
import Error404Page from "./Components/Error404Page";
import Error500Page from "./Components/Error500Page";
import PayQrPage from "./Components/pay-qr/page";

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
        element: <SuccessPage />
    },
    {
        path: "/404",
        element: <Error404Page />
    },
    {
        path: "/500",
        element: <Error500Page />
    },
    {
        path: "/sbp-pay/:uuid",
        element: <PayQrPage />
    }
]);

const RootComponent = () => {
    useEffect(() => {
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        if (theme === "dark") {
            import("./index.css");
        } else {
            import("./indexLight.css");
        }
    }, []);

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
};

const root = createRoot(document.getElementById("root"));

root.render(<RootComponent />);
