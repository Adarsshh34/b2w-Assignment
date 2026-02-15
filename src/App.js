import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PropertyProvider } from "./context/PropertyContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import AdminPanel from "./pages/AdminPanel";
import "./App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <PropertyProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/buyer-dashboard"
                element={
                  <ProtectedRoute requiredRole="buyer">
                    <BuyerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller-dashboard"
                element={
                  <ProtectedRoute requiredRole="seller">
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </PropertyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
