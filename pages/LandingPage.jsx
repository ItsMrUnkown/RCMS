// src/pages/LandingPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, X, House } from "react-bootstrap-icons"; // ✅ Icons
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false); // ✅ For navbar toggle

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top mb-5">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand fw-bold text-primary d-flex align-items-center" href="#">
            <House className="me-2" size={22} /> RCMS
          </a>

          {/* Toggler (React controlled) */}
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

          {/* Navbar Links */}
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-2">
                <button
                  className="btn btn-outline-primary me-2 mb-2 mb-lg-0"
                  onClick={() => {
                    navigate("/login");
                    setIsNavOpen(false);
                  }}
                >
                  Login
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

      {/* ✅ Hero Section */}
      <section className="d-flex align-items-center justify-content-center text-center ">
        <div id="container" >
          <h1 className="display-4 fw-bold mb-3">
            Welcome to <span className="text-primary">RCMS</span>
          </h1>
          <p className="lead mb-4 fw-bold txt">
            Request and Complaint Management System
          </p>
          <div>
            <button
              className="btn btn-primary btn-lg me-3"
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-dark text-white py-3 text-center">
        <p className="mb-0">
          © {new Date().getFullYear()} RCMS. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}
