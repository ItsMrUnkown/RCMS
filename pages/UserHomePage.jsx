import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  House,
  List,
  BoxArrowRight,
  Eye,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserHomePage.css";

export default function UserHomePage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="user-home-container">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid px-4">

          {/* Brand & Mobile Toggle */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-primary me-3 d-lg-none"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <List size={22} />
            </button>

            <a className="navbar-brand fw-bold text-primary" href="#">
              RCMS
            </a>
          </div>

          {/* Desktop Navbar Toggle */}
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto align-items-center">

              <li className="nav-item me-3">
                <button
                  className="btn btn-outline-primary d-flex align-items-center"
                  onClick={() => navigate("/userhome")}
                >
                  <House size={18} className="me-2" />
                  Home
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-danger d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <BoxArrowRight size={18} className="me-2" />
                  Logout
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <main className="container main-content text-center">

        <h2 className="fw-bold text-dark mb-4">Welcome to RCMS</h2>
        <p className="mb-4">Choose an action below:</p>

        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 mb-3">
            <button
              className="btn btn-primary w-100 py-3 action-btn"
              onClick={() => navigate("/request")}
            >
              Make a Request
            </button>
          </div>

          <div className="col-lg-4 col-md-6 mb-3">
            <button
              className="btn btn-danger w-100 py-3 action-btn"
              onClick={() => navigate("/complaint")}
            >
              File a Complaint
            </button>
          </div>
        </div>

        <button
          className="btn btn-primary mt-4 px-4 py-2"
          onClick={() => navigate("/submitted")}
        >
          View Submitted Items
        </button>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-dark text-white py-3 text-center">
        © {new Date().getFullYear()} RCMS. All Rights Reserved.
      </footer>
    </div>
  );
}
