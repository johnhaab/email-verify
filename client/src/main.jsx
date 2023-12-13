import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SendCodePage from "./pages/SendCode.jsx";
import CheckCodePage from "./pages/EnterCode.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SendCodePage />,
  },
  {
    path: "/check-code",
    element: <CheckCodePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
