import React, { useState } from "react";
import api from "../api/api";
import "./NewOrder.css";

function NewOrder() {
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    quantity: 1,
    price: 0,
    status: "Pending",
  });

  const [total, setTotal] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = { ...formData, [name]: value };

    // Recalculate total only if quantity or price changes
    const quantity = parseInt(updatedData.quantity) || 0;
    const price = parseFloat(updatedData.price) || 0;

    setFormData(updatedData);
    setTotal(quantity * price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      ...formData,
      total,
      date: new Date().toISOString(),
    };

    try {
      await api.post("/orders", order);
      console.log("Order Submitted:", order);
      alert("✅ Order submitted successfully!");
    } catch (error) {
      console.error("❌ Failed to submit order:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="page">
      <h2>Create New Order</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </label>

        <label>
          Product Name:
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            min="1"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price (per unit):
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </label>

        <label>
          Total Amount:
          <input type="text" value={`₹${total}`} disabled />
        </label>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default NewOrder;
