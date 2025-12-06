import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token"); // ✅ Get JWT from login
        const response = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
        alert("❌ Unauthorized. Please log in again.");
      }
    }

    fetchOrders();
  }, []);

  const downloadInvoice = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/orders/${orderId}/invoice`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Add token here too
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("❌ Failed to download invoice:", error);
      alert("Failed to download invoice.");
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>📦 Orders</h2>
        <Link to="/orders/new">
          <button className="add-order-btn">➕ New Order</button>
        </Link>
      </div>

      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.date?.split("T")[0]}</td>
                  <td>₹{order.total}</td>
                  <td>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="download-btn"
                      onClick={() => downloadInvoice(order.id)}
                    >
                      📄 Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
