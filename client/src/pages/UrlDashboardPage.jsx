import React from "react";
import UrlDashboardComponent from "../components/UrlDashboardComponent";
const UrlDashboardPage = () => {
  return (
    <main className="dashboard-container">
      <h1>Enter your URL for shortening</h1>
      <UrlDashboardComponent />
    </main>
  );
};

export default UrlDashboardPage;
