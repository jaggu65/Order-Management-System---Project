import React, { useState } from "react";
import api from "../api/api";
import "./AddReturn.css";

function AddReturn() {
  const [formData, setFormData] = useState({
    orderId: "",
    product: "",
    customer: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReturn = {
      ...formData,
      date: new Date().toISOString(),
    };

    try {
      await api.post("/returns", newReturn);
      alert("✅ Return request submitted!");
      setFormData({ orderId: "", product: "", customer: "", reason: "" });
    } catch (err) {
      console.error("Return failed:", err);
      alert("❌ Failed to submit return.");
    }
  };

  return (
    <div className="page">
      <h2>Submit Return Request</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Order ID:
          <input
            type="text"
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Product:
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Customer Name:
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Reason for Return:
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            required
          />
        </label>

        <button type="submit">➕ Submit Return</button>
      </form>
    </div>
  );
}

export default AddReturn;
