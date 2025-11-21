import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserHomePage from "./pages/UserHomePage";
import RequestPage from "./pages/RequestPage";
import ComplaintPage from "./pages/ComplaintPage";
import SubmittedItems from "./pages/SubmittedItems";
import ManageRequestsPage from "./pages/ManageRequestsPage";
import ManageComplaintsPage from "./pages/ManageComplaintsPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import AdminPage from "./pages/AdminPage";
import './index.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/userhome" element={<UserHomePage />} />
        <Route path="request/" element={<RequestPage/>} />
        <Route path="complaint" element={<ComplaintPage />} />
        <Route path="/submitted" element={<SubmittedItems />} />
        <Route path="/manage-requests" element={<ManageRequestsPage />} />
        <Route path="/manage-complaints" element={<ManageComplaintsPage />} />
        <Route path="/manage-users" element={<ManageUsersPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}
