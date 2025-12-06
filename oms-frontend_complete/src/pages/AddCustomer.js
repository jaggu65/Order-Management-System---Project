import React, { useState } from "react";
import api from "../api/api"; // axios instance
import "./AddCustomer.css"; // you can design this later

function AddCustomer() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/customers", customer);
      alert("✅ Customer added successfully!");
      setCustomer({ name: "", email: "", phone: "", address: "" });
    } catch (error) {
      console.error("❌ Failed to add customer:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="page">
      <h2>Add New Customer</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
            placeholder="Full name"
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
          />
        </label>

        <label>
          Address:
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            rows={3}
            placeholder="Customer address"
          />
        </label>

        <button type="submit">➕ Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;
