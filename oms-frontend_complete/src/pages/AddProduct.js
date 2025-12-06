import React, { useState } from "react";
import api from "../api/api";
import "./AddProduct.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    stock: 0,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", formData);
      alert("✅ Product added successfully!");
      setFormData({ name: "", stock: 0, price: 0 });
    } catch (err) {
      console.error("❌ Failed to add product:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="page">
      <h2>Add New Product</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            placeholder="e.g. Samsung Galaxy S23"
          />
        </label>
        <label>
          Stock Quantity:
          <input
            type="number"
            name="stock"
            value={formData.stock}
            required
            onChange={handleChange}
            min="1"
          />
        </label>
        <label>
          Price (₹):
          <input
            type="number"
            name="price"
            value={formData.price}
            required
            onChange={handleChange}
            min="1"
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
