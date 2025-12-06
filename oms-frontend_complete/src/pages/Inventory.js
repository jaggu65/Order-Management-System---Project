// src/pages/Inventory.js
import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./Inventory.css";

const STOCK_THRESHOLD = 10;
const SALES_THRESHOLD = 30;

function Inventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInventory() {
      try {
        const res = await api.get("/products");
        console.log("📦 Fetched products:", res.data);
        setInventoryData(res.data);
      } catch (err) {
        console.error("❌ Error fetching inventory:", err);
        alert("Failed to load inventory.");
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, []);

  const isCritical = (item) => {
    return (
      item.stock === 0 ||
      (item.stock < STOCK_THRESHOLD && item.salesPerDay > SALES_THRESHOLD)
    );
  };

  const restockItem = async (id, name, currentStock) => {
    if (!id) {
      alert("❌ Cannot restock. Invalid product ID.");
      return;
    }

    const confirmRestock = window.confirm(
      `⚠️ Are you sure you physically have more stock of "${name}" in warehouse?`
    );
    if (!confirmRestock) return;

    try {
      const newStock = currentStock + 20;
      await api.put(`/products/${id}/stock`, { stock: newStock });

      const updated = inventoryData.map((item) =>
        item.id === id ? { ...item, stock: newStock } : item
      );
      setInventoryData(updated);
      alert(`✅ Stock updated for ${name}`);
    } catch (err) {
      console.error("❌ Failed to update stock:", err);
      alert("Failed to update stock.");
    }
  };

  return (
    <div className="page">
      <h2>📦 Inventory</h2>

      {loading ? (
        <p>Loading inventory...</p>
      ) : inventoryData.length === 0 ? (
        <p>No products found in inventory.</p>
      ) : (
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Stock</th>
              <th>Sales/Day</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((item) => {
              const critical = isCritical(item);
              const itemId = item.id || item._id || item.name; // Fallback
              return (
                <tr key={itemId}>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                  <td>{item.salesPerDay || 0}</td>
                  <td>
                    {critical ? (
                      <span className="low-stock">⚠️ Critical</span>
                    ) : (
                      <span className="in-stock">✔️ Normal</span>
                    )}
                  </td>
                  <td>
                    {critical && (
                      <button
                        className="restock-btn"
                        onClick={() => restockItem(itemId, item.name, item.stock)}
                      >
                        ➕ Restock
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Inventory;
