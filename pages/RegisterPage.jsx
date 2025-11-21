// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, X, House } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState(""); // ✅ New location state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !location) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setError("An account with this email already exists.");
      return;
    }

    users.push({ email, password, location }); // ✅ Save location
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Registration successful! Redirecting to login...");
    setError("");

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary d-flex align-items-center" href="#">
            <House className="me-2" size={22} /> RCMS
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-controls="navbarNav"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            {isNavOpen ? <X size={26} /> : <List size={26} />}
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-2">
                <button
                  className="btn btn-outline-primary me-2 mb-2 mb-lg-0"
                  onClick={() => { navigate("/"); setIsNavOpen(false); }}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-primary mb-2 mb-lg-0"
                  onClick={() => { navigate("/login"); setIsNavOpen(false); }}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card shadow-lg p-4"
          style={{
            width: "26rem",
            borderRadius: "12px",
            backgroundColor: "#ffffff57",
            backdropFilter: "blur(7px)",
            marginTop: "5rem",
          }}
        >
          <h3 className="text-center mb-4 fw-bold">Register</h3>

          {error && <div className="alert alert-danger text-center py-2">{error}</div>}
          {success && <div className="alert alert-success text-center py-2">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* ✅ New Location Field */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success w-100">Register</button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <button type="button" className="btn btn-link p-0" onClick={() => navigate("/login")}>
                Login
              </button>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
