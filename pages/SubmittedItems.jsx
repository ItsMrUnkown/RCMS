// src/pages/SubmittedItems.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { House, List, BoxArrowRight, PencilSquare, Trash } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SubmittedItems.css";

export default function SubmittedItemsPage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [view, setView] = useState("requests"); // "requests" or "complaints"
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ title: "", type: "", details: "" });

  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    const savedComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    setRequests(savedRequests);
    setComplaints(savedComplaints);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const handleHome = () => {
    navigate("/userhome");
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      type: item.type || "",
      details: item.details,
    });
  };

  const handleCancel = (itemId) => {
    if (view === "requests") {
      const updated = requests.filter((r) => r.id !== itemId);
      localStorage.setItem("requests", JSON.stringify(updated));
      setRequests(updated);
    } else {
      const updated = complaints.filter((c) => c.id !== itemId);
      localStorage.setItem("complaints", JSON.stringify(updated));
      setComplaints(updated);
    }
  };

  const handleSave = () => {
    if (!form.title || !form.details || (view === "requests" && !form.type)) return;

    if (view === "requests") {
      const updated = requests.map((r) =>
        r.id === editingItem.id ? { ...r, ...form, date: new Date().toLocaleString() } : r
      );
      localStorage.setItem("requests", JSON.stringify(updated));
      setRequests(updated);
    } else {
      const updated = complaints.map((c) =>
        c.id === editingItem.id ? { ...c, ...form, date: new Date().toLocaleString() } : c
      );
      localStorage.setItem("complaints", JSON.stringify(updated));
      setComplaints(updated);
    }

    setEditingItem(null);
    setForm({ title: "", type: "", details: "" });
  };

  return (
    <div className="submitted-page-container">

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
      <main className="container mt-5 pt-5">
        <h2 className="text-center fw-bold mb-4">Submitted Items</h2>
        <p className="text-center mb-4">View or manage your submitted requests and complaints.</p>

        {/* View Buttons */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-3 col-md-4 col-6 mb-2">
            <button
              className={`btn w-100 py-2 ${view === "requests" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setView("requests")}
            >
              View Requests
            </button>
          </div>
          <div className="col-lg-3 col-md-4 col-6 mb-2">
            <button
              className={`btn w-100 py-2 ${view === "complaints" ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => setView("complaints")}
            >
              View Complaints
            </button>
          </div>
        </div>

        {/* Editing Form */}
        {editingItem && (
          <div className="row justify-content-center mb-4">
            <div className="col-lg-6">
              <div className="card p-3 shadow-sm mb-3">
                <h5 className="fw-bold mb-3">Edit {view === "requests" ? "Request" : "Complaint"}</h5>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                  {view === "requests" && (
                    <select
                      className="form-select mb-2"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                    >
                      <option value="">Select type</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="technical">Technical</option>
                      <option value="others">Others</option>
                    </select>
                  )}
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Details"
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <button className="btn btn-secondary" onClick={() => setEditingItem(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Display Items */}
        <div className="row">
          {(view === "requests" ? requests : complaints).length > 0 ? (
            (view === "requests" ? requests : complaints).map((item) => (
              <div className="col-lg-4 col-md-6 mb-3" key={item.id}>
                <div className="card shadow-sm h-100 p-3">
                  <h5 className="fw-bold">{item.title}</h5>
                  {item.type && view === "requests" && (
                    <p className="text-capitalize mb-1"><strong>Type:</strong> {item.type}</p>
                  )}
                  <p className="mb-1">{item.details}</p>

                  {/* ✅ Show status for both requests and complaints */}
                  <p className="mb-1">
                    <strong>Status:</strong> {item.status || "Pending"}
                  </p>

                  <small className="text-muted">{item.date}</small>
                  <div className="mt-2 d-flex justify-content-between">
                    <button className="btn btn-sm btn-outline-warning" onClick={() => handleEdit(item)}>
                      <PencilSquare size={16} className="me-1" /> Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleCancel(item.id)}>
                      <Trash size={16} className="me-1" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted mt-3">
              No {view === "requests" ? "requests" : "complaints"} submitted yet.
            </p>
          )}
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-dark text-white py-3 text-center mt-auto">
        © {new Date().getFullYear()} RCMS. All Rights Reserved.
      </footer>
    </div>
  );
}
