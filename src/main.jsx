import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./resets.css";
import "./utils.css";
import "./index.css"; // Ensure this contains necessary global styles

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Blogs from "./pages/blogs/Blogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blog",
    element: <Blogs />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
