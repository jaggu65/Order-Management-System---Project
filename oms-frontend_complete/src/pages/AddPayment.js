// src/pages/AddPayment.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./AddPayment.css";

function AddPayment() {
  const [payment, setPayment] = useState({
    orderId: "",
    customer: "",
    amount: "",
    method: "UPI",
    status: "Pending",
    date: new Date().toISOString().split("T")[0],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/payments", payment);
      alert("✅ Payment submitted successfully!");
      navigate("/payments");
    } catch (err) {
      console.error("❌ Failed to submit payment:", err);
      alert("Failed to submit payment.");
    }
  };

  return (
    <div className="page add-payment-page">
      <h2>Add Payment</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Order ID:
          <input
            type="text"
            name="orderId"
            value={payment.orderId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Customer:
          <input
            type="text"
            name="customer"
            value={payment.customer}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Amount (₹):
          <input
            type="number"
            name="amount"
            value={payment.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Method:
          <select name="method" value={payment.method} onChange={handleChange}>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
          </select>
        </label>

        <label>
          Status:
          <select name="status" value={payment.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
        </label>

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
}

export default AddPayment;
