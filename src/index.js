import React from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import App from "./App";
import { createRoot } from "react-dom/client";
import Error404Page from "./Components/Error404Page";
import Error500Page from "./Components/Error500Page";
import PayQrPage from "./Components/pay-qr/page";
import MainPage from "./Components/MainPage";

import "./i18n";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:uuid",
        element: <MainPage />,
      },
      {
        path: "/sbp-pay/:uuid",
        element: <PayQrPage />,
      },
      {
        path: "/result-pay/:uuid",
        async lazy() {
          let { ResultPage } = await import(
            "./Components/ResultPage/ResultPage"
          );
          return { Component: ResultPage };
        },
      },
      {
        path: "/404",
        element: <Error404Page />,
      },
      {
        path: "/500",
        element: <Error500Page />,
      },
      {
        path: "*",
        element: <Error404Page />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  // <React.Component>
  <RouterProvider router={router} />
  // </React.Component>
);
