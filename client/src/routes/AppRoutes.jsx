import React from "react";
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UrlDashboardPage from "../pages/UrlDashboardPage";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/dashboard" element={<UrlDashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
