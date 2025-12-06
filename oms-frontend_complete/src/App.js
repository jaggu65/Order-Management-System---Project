// src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";

import WelcomeIntro from "./pages/WelcomeIntro";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Returns from "./pages/Returns";
import Payments from "./pages/Payments";
import Integration from "./pages/Integration";
import Reports from "./pages/Reports";
import NewOrder from "./pages/NewOrder";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AddProduct from "./pages/AddProduct";
import AddCustomer from "./pages/AddCustomer";
import AddReturn from "./pages/AddReturn";
import AddPayment from "./pages/AddPayment";
import Shipments from "./pages/Shipments";
import AddShipment from "./pages/AddShipment";

import "./App.css";

// ✅ Auth-protected route
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function Layout() {
  const location = useLocation();

  // ✅ Hide sidebar on auth/welcome pages
  const hideSidebar = ["/login", "/register", "/welcome"].includes(location.pathname);

  // ✅ Auto logout after 1 hour
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }, 3600000); // 1 hour

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar />}
      <div className="main-content">
        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {/* ✅ Authenticated Routes */}
          <Route path="/welcome" element={<PrivateRoute><WelcomeIntro /></PrivateRoute>} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/orders/new" element={<PrivateRoute><NewOrder /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/products/new" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
          <Route path="/customers/add" element={<PrivateRoute><AddCustomer /></PrivateRoute>} />
          <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
          <Route path="/returns" element={<PrivateRoute><Returns /></PrivateRoute>} />
          <Route path="/returns/add" element={<PrivateRoute><AddReturn /></PrivateRoute>} />
          <Route path="/payments" element={<PrivateRoute><Payments /></PrivateRoute>} />
          <Route path="/payment/add" element={<PrivateRoute><AddPayment /></PrivateRoute>} />
          <Route path="/integration" element={<PrivateRoute><Integration /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
          <Route path="/shipments" element={<PrivateRoute><Shipments /></PrivateRoute>} />
          <Route path="/shipments/new" element={<PrivateRoute><AddShipment /></PrivateRoute>} />

          {/* ✅ Catch all unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
