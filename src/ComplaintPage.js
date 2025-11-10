import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminComplaintBox() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  // ✅ Apply global no-scroll styles using JS
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";   // ✅ Remove horizontal scroll

    return () => {
      // cleanup on unmount (optional)
      document.body.style.overflowX = "auto";
    };
  }, []);

  // ✅ Fetch all complaints
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/complaint")
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => {
        console.log(err);
        alert("⚠️ Unable to load complaints. Backend offline.");
      });
  }, []);

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#e6f0ff",
      paddingTop: "20px",
      paddingBottom: "40px",
      overflowX: "hidden",        // ✅ remove horizontal scroll
      fontFamily: "Arial, sans-serif",
    },
    topBar: {
      width: "100%",
      backgroundColor: "#68a3e6ff",
      padding: "12px 20px",
      display: "flex",
      gap: "20px",
      alignItems: "center",
      boxSizing: "border-box",   // ✅ stops overflow
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    navItem: {
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "16px",
    },
    container: {
      maxWidth: "850px",
      width: "100%",             // ✅ prevents width overflow
      margin: "30px auto",
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "12px",
      boxSizing: "border-box",   // ✅ no overflow
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    },
    title: {
      textAlign: "center",
      fontSize: "26px",
      color: "#333",
      marginBottom: "20px",
    },
    complaintBox: {
      backgroundColor: "#f9f9f9",
      padding: "15px",
      borderRadius: "10px",
      borderLeft: "6px solid #4e48a3ff",
      marginBottom: "15px",
    },
    studentName: {
      fontWeight: "bold",
      fontSize: "18px",
      marginBottom: "5px",
      color: "#333",
    },
    complaintText: {
      fontSize: "15px",
      color: "#555",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.page}>
      
      {/* ✅ NAVBAR */}
      <div style={styles.topBar}>
        <span style={styles.navItem} onClick={() => navigate("/admin/dashboard")}>
          Dashboard
        </span>
        <span style={styles.navItem} onClick={() => navigate("/admin/add")}>
          Add Admin
        </span>
      </div>

      {/* ✅ Complaints Container */}
      <div style={styles.container}>
        <h2 style={styles.title}>Student Complaints</h2>

        {complaints.length > 0 ? (
          complaints.map((c, index) => (
            <div key={index} style={styles.complaintBox}>
              <div style={styles.studentName}>{c.name}</div>
              <div style={styles.complaintText}>{c.complaint}</div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            No complaints submitted yet.
          </p>
        )}
      </div>

    </div>
  );
}

export default AdminComplaintBox;