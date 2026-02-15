import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case "admin":
        return "/admin";
      case "seller":
        return "/seller-dashboard";
      case "buyer":
        return "/buyer-dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Real Estate Web Platform
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>

          {isAuthenticated() ? (
            <>
              <li className="navbar-item">
                <Link to={getDashboardLink()} className="navbar-link">
                  Dashboard
                </Link>
              </li>
              <li className="navbar-item">
                <span className="navbar-user">
                  👤 {currentUser.name} ({currentUser.role})
                </span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-button">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
