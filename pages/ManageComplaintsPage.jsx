// src/pages/ManageComplaintsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ManageComplaintsPage() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  // For modal viewing
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(saved);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...complaints];
    updated[index].status = newStatus;

    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="fw-bold mb-4">Manage Complaints</h2>

      <button className="btn btn-secondary mb-3" onClick={() => navigate("/admin")}>
        ← Back to Dashboard
      </button>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Complaint Title</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No Complaints Found
                </td>
              </tr>
            ) : (
              complaints.map((item, i) => (
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
                      onClick={() => setSelectedComplaint(item)}
                      data-bs-toggle="modal"
                      data-bs-target="#viewComplaintModal"
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

      {/* VIEW COMPLAINT MODAL */}
      <div
        className="modal fade"
        id="viewComplaintModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            {selectedComplaint ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">
                    Complaint Details — {selectedComplaint.title}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>

                <div className="modal-body">
                  <p><strong>Submitted By:</strong> {selectedComplaint.username || "N/A"}</p>
                  <p><strong>Date:</strong> {selectedComplaint.date}</p>
                  <hr />
                  <p><strong>Description:</strong></p>
                  <p className="bg-light p-3 rounded">
                    {selectedComplaint.details || selectedComplaint.description}
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
