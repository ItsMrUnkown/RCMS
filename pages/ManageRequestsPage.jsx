// src/pages/ManageRequestsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ManageUsersPage.css";

export default function ManageRequestsPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null); // Modal state

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(saved);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...requests];
    updated[index].status = newStatus;

    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="fw-bold mb-4">Manage Requests</h2>

      <button className="btn btn-secondary mb-3" onClick={() => navigate("/admin")}>
        ← Back to Dashboard
      </button>

      <div className="table-responsive">
        <table className="table table-bordered table-striped shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Request Title</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No Requests Found</td>
              </tr>
            ) : (
              requests.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.title}</td>

                  <td>{item.date}</td>

                  <td>
                    <select
                      className="form-select"
                      value={item.status || "Pending"}
                      onChange={(e) => handleStatusChange(i, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setSelectedRequest(item)}
                      data-bs-toggle="modal"
                      data-bs-target="#viewRequestModal"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW REQUEST MODAL */}
      <div
        className="modal fade"
        id="viewRequestModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            {selectedRequest ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">
                    Request Details — {selectedRequest.title}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>

                <div className="modal-body">
                  <p>
                    <strong>Requested By:</strong>{" "}
                    {selectedRequest.username || "N/A"}
                  </p>
                  <p>
                    <strong>Date Submitted:</strong> {selectedRequest.date}
                  </p>

                  <hr />

                  <p><strong>Description:</strong></p>
                  <p className="bg-light p-3 rounded">
                    {selectedRequest.details ||
                      selectedRequest.description ||
                      "No description provided."}
                  </p>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4 text-center">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
