// src/pages/AdminPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  BoxArrowRight,
  People,
  ClipboardCheck,
  ExclamationCircle,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css";

export default function AdminPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const requests = JSON.parse(localStorage.getItem("requests")) || [];
    const complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    setTotalUsers(users.length);
    setTotalRequests(requests.length);
    setTotalComplaints(complaints.length);

    // Combine requests and complaints into recent activities
    const activities = [
      ...requests.map((r) => ({ ...r, type: "Request" })),
      ...complaints.map((c) => ({ ...c, type: "Complaint" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    setRecentActivities(activities.slice(0, 5)); // show latest 5
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };
  

  return (
    <div className="admin-container">
      {/* TOP NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-primary me-3 d-lg-none"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <List size={22} />
            </button>

            <span className="navbar-brand fw-bold text-primary">RCMS</span>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
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

      {/* PAGE CONTENT */}
      <div className="d-flex">
        {/* Sidebar */}
        <div className={`sidebar bg-dark text-white p-3 ${isExpanded ? "show-sidebar" : ""}`}>
          <h5 className="fw-bold mb-4 text-center">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <span className="nav-link text-white active">
                Dashboard
              </span>
            </li>
            <li className="nav-item mb-2">
              <span className="nav-link text-white" onClick = {() => navigate("/manage-users")}>
                Users
              </span>
            </li>
            <li className="nav-item mb-2">
              <span className="nav-link text-white" onClick={() => navigate("/manage-requests")}>
                Requests
              </span>
            </li>
            <li className="nav-item mb-2">
              <span className="nav-link text-white" onClick={() => navigate("/manage-complaints")}>
                Complaints
              </span>
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="content container-fluid p-5 mt-4">
          <h2 className="fw-bold mb-4">Admin Dashboard</h2>

          {/* DASHBOARD CARDS */}
          <div className="row g-4 mb-5">
            <div className="col-md-4 col-sm-6">
              <div
                className="card dashboard-card shadow-sm border-0 p-4 text-center"
                onClick={() => navigate("/manage-users")}
              >
                <People size={32} className="text-primary mb-2" />
                <h5>Total Users</h5>
                <p className="fs-4 fw-bold">{totalUsers}</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div
                className="card dashboard-card shadow-sm border-0 p-4 text-center"
                onClick={() => navigate("/manage-requests")}
              >
                <ClipboardCheck size={32} className="text-success mb-2" />
                <h5>Requests</h5>
                <p className="fs-4 fw-bold">{totalRequests}</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-6">
              <div
                className="card dashboard-card shadow-sm border-0 p-4 text-center"
                onClick={() => navigate("/manage-complaints")}
              >
                <ExclamationCircle size={32} className="text-danger mb-2" />
                <h5>Complaints</h5>
                <p className="fs-4 fw-bold">{totalComplaints}</p>
              </div>
            </div>
          </div>

          {/* RECENT USER ACTIVITY */}
          <h4 className="fw-bold mb-3 bg-light list-group-item d-flex justify-content-between align-items-center">Recent User Activity</h4>
          {recentActivities.length === 0 ? (
            <p>No recent activity available.</p>
          ) : (
            <div className="list-group">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{activity.type}</strong>: {activity.title || activity.details}
                  </div>
                  <small className="text-muted">{new Date(activity.date).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
