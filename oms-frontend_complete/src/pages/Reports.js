import React, { useEffect, useState } from "react";
import api from "../api/api"; // ✅ use secured axios instance
import "./Reports.css";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await api.get("/reports/summary"); // ✅ token is auto-attached
        setReport(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch report:", error);
        alert("❌ Could not load report data. You might not be authorized.");
      }
    }

    fetchReport();
  }, []);

  return (
    <div className="reports-page">
      <h2>📊 Business Reports</h2>
      {!report ? (
        <p>Loading report...</p>
      ) : (
        <div className="report-cards">
          <div className="report-card">
            <h3>Total Orders</h3>
            <p>{report.totalOrders}</p>
          </div>
          <div className="report-card">
            <h3>Pending Orders</h3>
            <p>{report.pendingOrders}</p>
          </div>
          <div className="report-card">
            <h3>Shipped Orders</h3>
            <p>{report.shippedOrders}</p>
          </div>
          <div className="report-card">
            <h3>Delivered Orders</h3>
            <p>{report.deliveredOrders}</p>
          </div>
          <div className="report-card">
            <h3>Cancelled Orders</h3>
            <p>{report.cancelledOrders}</p>
          </div>
          <div className="report-card">
            <h3>Total Revenue</h3>
            <p>₹{report.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
