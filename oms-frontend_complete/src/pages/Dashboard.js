// src/pages/Dashboard.js
import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

const orderData = [
  { date: "Mon", orders: 30 },
  { date: "Tue", orders: 50 },
  { date: "Wed", orders: 40 },
  { date: "Thu", orders: 65 },
  { date: "Fri", orders: 80 },
  { date: "Sat", orders: 55 },
  { date: "Sun", orders: 70 },
];

const productSales = [
  { name: "Smartphones", value: 400 },
  { name: "Laptops", value: 300 },
  { name: "Earbuds", value: 200 },
  { name: "Smart Watches", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>📊 Dashboard Overview</h2>

      <div className="cards">
        <div className="card">
          <h3>🆕 New Orders</h3>
          <p>125</p>
        </div>
        <div className="card">
          <h3>✅ Orders Processed</h3>
          <p>8,120</p>
        </div>
        <div className="card">
          <h3>💰 Revenue</h3>
          <p>₹32,500</p>
        </div>
        <div className="card">
          <h3>👥 Customers</h3>
          <p>1,532</p>
        </div>
      </div>

      <div className="order-processing">
        <h3>🚚 Order Processing Status</h3>
        <div className="progress-bar">
          <div className="progress pending" style={{ width: "20%" }}>
            Pending
          </div>
          <div className="progress processing" style={{ width: "25%" }}>
            Processing
          </div>
          <div className="progress shipped" style={{ width: "45%" }}>
            Shipped
          </div>
          <div className="progress delivered" style={{ width: "10%" }}>
            Delivered
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>📈 Orders This Week</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#1d4ed8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>🥇 Top-Selling Products</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={productSales}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {productSales.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>⚠️ Critical Stock Items</h3>
          <p>3 items below stock threshold</p>
        </div>

        <div className="chart-card">
          <h3>📦 Total Revenue (This Week)</h3>
          <p>₹1,56,000</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
