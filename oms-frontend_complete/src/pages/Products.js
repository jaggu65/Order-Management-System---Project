import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Needed to link to the form
import api from "../api/api";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error);
        alert("Failed to load products.");
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="page">
      <h2>Product List</h2>

      {/* ✅ Add New Product Button */}
      <Link to="/products/new">
        <button className="add-product-button">➕ Add New Product</button>
      </Link>

      {products.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Stock</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr key={index}>
                <td>{p.name}</td>
                <td>{p.stock}</td>
                <td>{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default Products;
