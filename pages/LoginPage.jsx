// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, X, House } from "react-bootstrap-icons"; // ✅ Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    const adminAccount = {
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Admin login
    if (email === adminAccount.email && password === adminAccount.password) {
      setError("");
      localStorage.setItem("loggedInUser", JSON.stringify(adminAccount)); // store admin
      navigate("/admin");
      return;
    }

    // ✅ User login
    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (validUser) {
      setError("");
      localStorage.setItem("loggedInUser", JSON.stringify(validUser)); // store user
      navigate("/userhome");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <a
            className="navbar-brand fw-bold text-primary d-flex align-items-center"
            href="#"
          >
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

          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-2">
                <button
                  className="btn btn-outline-primary me-2 mb-2 mb-lg-0"
                  onClick={() => {
                    navigate("/");
                    setIsNavOpen(false);
                  }}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-primary mb-2 mb-lg-0"
                  onClick={() => {
                    navigate("/register");
                    setIsNavOpen(false);
                  }}
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="container-fluid d-flex justify-content-center align-items-center">
        <div
          className="card shadow-lg p-4 position-absolute top-50 start-50 translate-middle mt-5"
          style={{
            width: "24rem",
            borderRadius: "12px",
            backgroundColor: "#ffffff57",
            backdropFilter: "blur(7px)",
          }}
        >
          <h3 className="text-center mb-4 fw-bold">Login</h3>

          {error && (
            <div className="alert alert-danger text-center py-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Sign In
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don’t have an account?{" "}
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
