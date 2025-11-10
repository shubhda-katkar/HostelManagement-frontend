import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentLogin from "./StudentLogin";
import StudentRegister from "./StudentRegister";
import AdminLogin from "./AdminLogin";
import HomePage from "./HomePage";
import AddAdmin from "./AddAdmin";
import ComplaintPage from "./ComplaintPage";
import AdminPage from "./AdminPage";

function App() {
  return (
  
      <Router>
        <Routes>
          {/* Default page */}
          <Route path="/" element={<StudentLogin />} />

          {/* Student pages */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegister />} />

          {/* Admin pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminPage />} />

          {/* Home page after student login */}
          <Route path="/home" element={<HomePage />} />

          <Route path="/admin/add" element={<AddAdmin />} />
          <Route path="/admin/complaints" element={<ComplaintPage />} />

        </Routes>
      </Router>
  );
}

export default App;
