// src/pages/ComplaintPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { House, List, BoxArrowRight } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ComplaintPage.css";

export default function ComplaintPage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [form, setForm] = useState({ title: "", details: "" });
  const [alert, setAlert] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const handleHome = () => {
    navigate("/userhome");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.details) {
      setAlert("⚠️ Please fill in all fields before submitting.");
      return;
    }

    const existingComplaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    const newComplaint = {
      id: Date.now(),
      title: form.title,
      details: form.details,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("complaints", JSON.stringify([newComplaint, ...existingComplaints]));
    setAlert("✅ Complaint submitted successfully!");
    setForm({ title: "", details: "" });

    setTimeout(() => setAlert(""), 3000);
  };

  return (
    <div className="complaint-page-container">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid px-4">

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

          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-3">
                <button
                  className="btn btn-outline-primary d-flex align-items-center"
                  onClick={handleHome}
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
      <main className="container main-content mt-5 pt-5">
        <h2 className="fw-bold text-center mb-4">File a Complaint</h2>
        <p className="text-center mb-4">Fill out the form below to submit your complaint.</p>

        {alert && (
          <div className="alert alert-success text-center" role="alert">
            {alert}
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-sm p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Complaint Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter complaint title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Complaint Details</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Explain your complaint"
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                  ></textarea>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleHome}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-danger">
                    Submit Complaint
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-dark text-white py-3 text-center mt-auto">
        © {new Date().getFullYear()} RCMS. All Rights Reserved.
      </footer>
    </div>
  );
}
