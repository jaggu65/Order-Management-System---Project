import React from "react";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="cards">
        <div className="card">New Orders: 125</div>
        <div className="card">Orders Processed: 8,120</div>
        <div className="card">Revenue: $32,500</div>
        <div className="card">Customers: 1,532</div>
      </div>
      <div className="order-processing">
        <h3>Order Processing</h3>
        <div className="progress-bar">
          <div className="pending">20%</div>
          <div className="processing">25%</div>
          <div className="shipped">45%</div>
          <div className="delivered">10%</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;