import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import "./Returns.css";

function Returns() {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    async function fetchReturns() {
      try {
        const response = await api.get("/returns");
        setReturns(response.data);
      } catch (error) {
        console.error("Failed to load returns:", error);
      }
    }

    fetchReturns();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this return request?");
    if (!confirm) return;

    try {
      await api.delete(`/returns/${id}`);
      setReturns(returns.filter((r) => r.id !== id));
      alert("Deleted!");
    } catch (error) {
      console.error("Failed to delete return:", error);
    }
  };

  return (
    <div className="page">
      <h2>Return Requests</h2>
      <Link to="/returns/add">
        <button>➕ New Return</button>
      </Link>
      {returns.length > 0 ? (
        <table className="return-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r) => (
              <tr key={r.id}>
                <td>{r.orderId}</td>
                <td>{r.product}</td>
                <td>{r.customer}</td>
                <td>{r.reason}</td>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(r.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No return requests found.</p>
      )}
    </div>
  );
}

export default Returns;
