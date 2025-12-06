import React, { useEffect, useState } from "react";
import api from "../api/api"; // ✅ import custom axios instance
import "./Integration.css";

function Integration() {
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    async function fetchIntegrations() {
      try {
        const res = await api.get("/integrations");
        setIntegrations(res.data);
      } catch (err) {
        console.error("❌ Failed to load integrations:", err);
        alert("Failed to fetch integrations. You may not be authorized.");
      }
    }

    fetchIntegrations();
  }, []);

  const toggleConnection = async (name) => {
    try {
      const res = await api.put(`/integrations/toggle/${name}`);
      setIntegrations((prev) =>
        prev.map((i) => (i.name === name ? res.data : i))
      );
    } catch (err) {
      console.error("❌ Failed to toggle connection:", err);
      alert("Failed to toggle integration. Check authorization.");
    }
  };

  return (
    <div className="integration-page">
      <h2>🔗 Integration Center</h2>
      <table className="integration-table">
        <thead>
          <tr>
            <th>System</th>
            <th>Description</th>
            <th>Status</th>
            <th>Toggle</th>
          </tr>
        </thead>
        <tbody>
          {integrations.map((i) => (
            <tr key={i.name}>
              <td>{i.name}</td>
              <td>{i.description}</td>
              <td>{i.connected ? "🟢 Connected" : "🔴 Disconnected"}</td>
              <td>
                <button onClick={() => toggleConnection(i.name)}>
                  {i.connected ? "Disconnect" : "Connect"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Integration;
