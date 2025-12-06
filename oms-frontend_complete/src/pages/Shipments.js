// src/pages/Shipments.js
import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./Shipments.css";
import { Link } from "react-router-dom";

function Shipments() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    api
      .get("/shipments")
      .then((res) => setShipments(res.data))
      .catch((err) => {
        console.error("❌ Failed to load shipments", err);
        alert("Failed to load shipments");
      });
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Packed":
        return "status packed";
      case "Dispatched":
        return "status dispatched";
      case "Delivered":
        return "status delivered";
      default:
        return "status";
    }
  };

  return (
    <div className="shipments-page">
      <div className="shipments-header">
        <h2>🚚 Shipments</h2>
        <Link to="/shipments/new">
          <button className="add-shipment-btn">➕ New Shipment</button>
        </Link>
      </div>

      <table className="shipment-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Delivery Partner</th>
            <th>Expected Delivery</th>
          </tr>
        </thead>
        <tbody>
          {shipments.length > 0 ? (
            shipments.map((s) => (
              <tr key={s.id}>
                <td>{s.orderId}</td>
                <td>
                  <span className={getStatusClass(s.status)}>{s.status}</span>
                </td>
                <td>{s.deliveryPartner}</td>
                <td>{s.expectedDate?.split("T")[0]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No shipments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Shipments;
