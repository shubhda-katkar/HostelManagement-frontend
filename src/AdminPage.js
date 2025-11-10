import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [freeRooms, setFreeRooms] = useState([]);

  // ✅ Remove horizontal scroll globally
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => (document.body.style.overflowX = "auto");
  }, []);

  const loadStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/students/all");
      const data = await res.json();
      setStudents(data);
    } catch {
      alert("⚠️ Unable to load students. Backend offline.");
    }
  };

  const loadFreeRooms = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/hostel/free");
      const data = await res.json();
      setFreeRooms(data);
    } catch {
      alert("⚠️ Unable to load free rooms. Backend offline.");
    }
  };

  useEffect(() => {
    loadStudents();
    loadFreeRooms();
  }, []);

  const approveRoom = async (studentName, requestedRoom) => {
    if (!requestedRoom) {
      alert("❌ Student has not requested any room.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/hostel/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: studentName, roomNumber: requestedRoom }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Room allocated!");
        loadStudents();
        loadFreeRooms();
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch {
      alert("⚠️ Backend not reachable.");
    }
  };

  const rejectRoom = async (studentName) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/students/request-room",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: studentName, roomNumber: "" }),
        }
      );

      if (response.ok) {
        alert("❌ Request Rejected");
        loadStudents();
      }
    } catch {
      alert("⚠️ Backend not reachable.");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#e6f0ff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflowX: "hidden", // ✅ FIX horizontal scroll
      fontFamily: "Arial, sans-serif",
    },
    topBar: {
      width: "100%",
      backgroundColor: "#68a3e6ff",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "20px",
      boxSizing: "border-box", // ✅ prevents overflow
    },
    navItem: {
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "16px",
      textDecoration: "none",
    },
    container: {
      maxWidth: "900px",
      width: "100%",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      backgroundColor: "#ffffff",
      marginTop: "30px",
      boxSizing: "border-box", // ✅ prevents content overflow
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      border: "1px solid #ddd",
      padding: "10px",
      backgroundColor: "#4CAF50",
      color: "white",
    },
    td: {
      border: "1px solid #ddd",
      padding: "10px",
      textAlign: "center",
    },
    button: {
      padding: "8px 10px",
      margin: "5px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    approveBtn: { backgroundColor: "#4CAF50", color: "white" },
    rejectBtn: { backgroundColor: "#f44336", color: "white" },
    backBtn: { backgroundColor: "#777", color: "white" },
  };

  return (
    <div style={styles.page}>

      {/* ✅ NAVBAR */}
      <div style={styles.topBar}>
        <span style={styles.navItem} onClick={() => navigate("/admin/add")}>
          Add Admin
        </span>
        <span style={styles.navItem} onClick={() => navigate("/admin/complaints")}>
          Complaint Box
        </span>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div style={styles.container}>
        <button
          style={{ ...styles.button, ...styles.backBtn }}
          onClick={() => navigate("/admin/login")}
        >
          ← Back
        </button>

        <h2>Admin Room Allocation Dashboard</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Requested Room</th>
              <th>Allocated Room</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4">No students found</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.requestedRoom || "-"}</td>
                  <td>{student.allocatedRoom || "-"}</td>

                  <td>
                    <button
                      style={{
                        ...styles.button,
                        ...styles.approveBtn,
                        opacity: student.requestedRoom ? 1 : 0.5,
                        cursor: student.requestedRoom ? "pointer" : "not-allowed",
                      }}
                      disabled={!student.requestedRoom}
                      onClick={() =>
                        approveRoom(student.name, student.requestedRoom)
                      }
                    >
                      Approve
                    </button>

                    <button
                      style={{
                        ...styles.button,
                        ...styles.rejectBtn,
                        opacity: student.requestedRoom ? 1 : 0.5,
                        cursor: student.requestedRoom ? "pointer" : "not-allowed",
                      }}
                      disabled={!student.requestedRoom}
                      onClick={() => rejectRoom(student.name)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
