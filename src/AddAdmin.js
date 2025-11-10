import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAdmin() {
  const [admins, setAdmins] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Remove horizontal scrolling globally
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => (document.body.style.overflowX = "auto");
  }, []);

  const loadAdmins = () => {
    fetch("http://localhost:5000/api/admin/all")
      .then((res) => res.json())
      .then((data) => setAdmins(data))
      .catch(() => alert("⚠️ Unable to load admins. Backend offline."));
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleAddAdmin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Admin added successfully!");
        setName("");
        setPassword("");
        loadAdmins();
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch {
      alert("⚠️ Cannot connect to backend.");
    }
  };

  const handleDeleteAdmin = async (adminName) => {
    if (!window.confirm(`Delete admin "${adminName}"?`)) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/delete/${adminName}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (response.ok) {
        alert("🗑️ Admin deleted!");
        loadAdmins();
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch {
      alert("⚠️ Backend not reachable.");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#e6f0ff",
      fontFamily: "Arial, sans-serif",
      overflowX: "hidden", // ✅ Fix horizontal scroll
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
      maxWidth: "500px",
      margin: "40px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      boxSizing: "border-box", // ✅ no overflow
    },

    title: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
      fontSize: "24px",
    },

    form: { display: "flex", flexDirection: "column", marginBottom: "25px" },

    input: {
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },

    button: {
      padding: "12px",
      backgroundColor: "#68a3e6ff",
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },

    adminList: { marginTop: "20px" },

    adminItem: {
      backgroundColor: "#f2f2f2",
      padding: "10px",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },

    deleteButton: {
      backgroundColor: "#ff4d4d",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "6px 10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>

      <div style={styles.topBar}>
        <span style={styles.navItem} onClick={() => navigate("/admin/dashboard")}>
          Dashboard
        </span>
        <span style={styles.navItem} onClick={() => navigate("/admin/complaints")}>
          Complaint Box
        </span>
      </div>

      <div style={styles.container}>
        <h2 style={styles.title}>Add / Manage Admins</h2>

        <form onSubmit={handleAddAdmin} style={styles.form}>
          <input
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4e48a3ff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#68a3e6ff")}
          >
            Add Admin
          </button>
        </form>

        <div style={styles.adminList}>
          <h3>Existing Admins:</h3>

          {admins.length > 0 ? (
            admins.map((admin) => (
              <div key={admin._id} style={styles.adminItem}>
                <span>{admin.name}</span>

                <button
                  style={styles.deleteButton}
                  onClick={() => handleDeleteAdmin(admin.name)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No admins found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddAdmin;
