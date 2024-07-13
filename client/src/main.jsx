import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/LandingPage";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
