// src/pages/Payments.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Payments.css";

function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const res = await api.get("/payments");
        setPayments(res.data);
      } catch (err) {
        console.error("❌ Failed to load payments:", err);
        alert("Error loading payments.");
      }
    }
    fetchPayments();
  }, []);

  return (
    <div className="page payments-page">
      <h2>Payments</h2>

      <Link to="/payment/add">
        <button className="add-btn">➕ Add Payment</button>
      </Link>

      {payments.length > 0 ? (
        <table className="payment-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.orderId}</td>
                <td>{p.customer}</td>
                <td>₹{p.amount}</td>
                <td>{p.method}</td>
                <td>{p.status}</td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
}

export default Payments;
