import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, registerBuyer, registerSeller } = useAuth();

  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    company: "",
    paymentConfirmed: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      const result = login(formData.email, formData.password);
      if (result.success) {
        // Redirect based on role
        switch (result.user.role) {
          case "admin":
            navigate("/admin");
            break;
          case "seller":
            navigate("/seller-dashboard");
            break;
          case "buyer":
            navigate("/buyer-dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        setError(result.message);
      }
    } else if (mode === "registerBuyer") {
      const result = registerBuyer({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
      });
      if (result.success) {
        setError("");
        alert("Registration successful! Please login.");
        setMode("login");
        setFormData({
          email: "",
          password: "",
          name: "",
          phone: "",
          company: "",
          paymentConfirmed: false,
        });
      } else {
        setError(result.message);
      }
    } else if (mode === "registerSeller") {
      if (!formData.paymentConfirmed) {
        setError("Please confirm the mock payment to proceed");
        return;
      }
      const result = registerSeller({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        company: formData.company,
        paymentConfirmed: formData.paymentConfirmed,
      });
      if (result.success) {
        setError("");
        alert("Seller registration successful! Please login.");
        setMode("login");
        setFormData({
          email: "",
          password: "",
          name: "",
          phone: "",
          company: "",
          paymentConfirmed: false,
        });
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>
            {mode === "login" && "Login"}
            {mode === "registerBuyer" && "Register as Buyer"}
            {mode === "registerSeller" && "Register as Seller"}
          </h2>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {mode !== "login" && (
            <>
              <div className="form-field">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-field">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              {mode === "registerSeller" && (
                <div className="form-field">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Enter company name"
                  />
                </div>
              )}
            </>
          )}

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          {mode === "registerSeller" && (
            <div className="form-field checkbox-field">
              <label>
                <input
                  type="checkbox"
                  name="paymentConfirmed"
                  checked={formData.paymentConfirmed}
                  onChange={handleChange}
                />
                <span>I confirm the mock registration payment</span>
              </label>
            </div>
          )}

          <button type="submit" className="login-button">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="login-footer">
          {mode === "login" ? (
            <>
              <p>Don't have an account?</p>
              <div className="register-buttons">
                <button
                  onClick={() => setMode("registerBuyer")}
                  className="link-button"
                >
                  Register as Buyer
                </button>
                <button
                  onClick={() => setMode("registerSeller")}
                  className="link-button"
                >
                  Register as Seller
                </button>
              </div>
            </>
          ) : (
            <button onClick={() => setMode("login")} className="link-button">
              Already have an account? Login
            </button>
          )}
        </div>

        <div className="demo-credentials">
          <h4>Demo Credentials</h4>
          <div className="credential-item">
            <strong>Admin:</strong> admin@realestate.com / admin123
          </div>
          <div className="credential-item">
            <strong>Buyer:</strong> buyer@test.com / buyer123
          </div>
          <div className="credential-item">
            <strong>Seller:</strong> seller@test.com / seller123
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
