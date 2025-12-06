import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./AddShipment.css";

function AddShipment() {
  const [form, setForm] = useState({
    orderId: "",
    status: "Packed",
    deliveryPartner: "",
    expectedDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/shipments", form);
      alert("✅ Shipment added");
      navigate("/shipments");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to add shipment");
    }
  };

  return (
    <div className="add-shipment-page">
      <h2>➕ Add Shipment</h2>
      <form className="shipment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="orderId"
          placeholder="Order ID"
          value={form.orderId}
          onChange={handleChange}
          required
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Packed">Packed</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input
          type="text"
          name="deliveryPartner"
          placeholder="Delivery Partner"
          value={form.deliveryPartner}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expectedDate"
          value={form.expectedDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddShipment;
