import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await api.get("/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    }
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this customer?");
    if (!confirm) return;

    try {
      await api.delete(`/customers/${id}`);
      setCustomers(customers.filter((c) => c.id !== id));
      alert("Customer deleted!");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="page">
      <h2>Customers</h2>
      <Link to="/customers/add">
        <button>➕ Add Customer</button>
      </Link>
      {customers.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>
                  <button onClick={() => handleDelete(c.id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customers found.</p>
      )}
    </div>
  );
}

export default Customers;
