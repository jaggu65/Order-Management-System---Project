// src/components/Sidebar.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiRefreshCw,
  FiDollarSign,
  FiCpu,
  FiBarChart2,
  FiLogOut
} from "react-icons/fi";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const links = [
    { to: "/", icon: <FiGrid />, label: "Dashboard" },
    { to: "/orders", icon: <FiShoppingCart />, label: "Orders" },
    { to: "/products", icon: <FiPackage />, label: "Products" },
    { to: "/customers", icon: <FiUsers />, label: "Customers" },
    { to: "/inventory", icon: <FiRefreshCw />, label: "Inventory" },
    { to: "/returns", icon: <FiRefreshCw />, label: "Returns" },
    { to: "/payments", icon: <FiDollarSign />, label: "Payment" },
    { to: "/integration", icon: <FiCpu />, label: "Integration" },
    { to: "/reports", icon: <FiBarChart2 />, label: "Reports" },
  ];

  return (
    <div className="sidebar">
     <h2 className="sidebar-header">🧠 OMS</h2>
      <ul className="sidebar-links">
        {links.map((link, idx) => (
          <li key={idx} className={location.pathname === link.to ? "active" : ""}>
            <Link to={link.to}>
              <span className="icon">{link.icon}</span>
              <span className="label">{link.label}</span>
            </Link>
          </li>
        ))}
        <li>
          <Link to="/shipments">🚚 Shipments</Link>
        </li>

        <li>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
