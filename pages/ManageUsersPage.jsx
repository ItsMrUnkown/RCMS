// src/pages/ManageUsersPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, BoxArrowRight, People, Pencil, Trash } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPage.css";

export default function ManageUsersPage() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="admin-container">
      {/* NAVBAR */}
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

          <div className="ms-auto">
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              <BoxArrowRight size={18} className="me-2" /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* PAGE LAYOUT */}
      <div className="d-flex">
        {/* SIDEBAR */}
        <div className={`sidebar bg-dark text-white p-3 vh-100 ${isExpanded ? "show-sidebar" : ""}`}>
          <h5 className="fw-bold mb-4 text-center">Menu</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <span className="nav-link text-white" onClick={() => navigate("/admin")}>
                Dashboard
              </span>
            </li>
            <li className="nav-item mb-2">
              <span className="nav-link text-white active">Users</span>
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
          <h2 className="fw-bold mb-4 d-flex align-items-center">
            <People size={26} className="me-2 text-primary" /> Manage Users
          </h2>

          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Location</th> {/* ✅ New column */}
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, idx) => (
                    <tr key={user.id}>
                      <td>{idx + 1}</td>
                      <td>{user.name || "N/A"}</td>
                      <td>{user.email}</td>
                      <td>{user.location || "N/A"}</td> {/* ✅ Display location */}
                      <td>{user.role || "User"}</td>
                      <td>
                        

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
