import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import collegeLogo from "./collegeLogo.jpg";

function StudentRegister() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/students/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Registration Successful!");
        navigate("/student/login"); 
      } else {
        alert(`❌ ${data.error || "Registration failed!"}`);
      }
    } catch (err) {
      alert("⚠️ Backend not reachable. Please start the server.");
    }
  };

  const styles = {
    page: {
      height: "100vh",
      width: "100vw",
      backgroundColor: "#e6f0ff",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
    },
    topBar: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#68a3e6ff",
    },
    navLink: {
      color: "white",
      fontWeight: "bold",
      textDecoration: "none",
      fontSize: "16px",
    },
    centerBox: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px",
    },
    container: {
      width: "360px",
      padding: "25px",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    logo: {
      width: "100%",
      borderRadius: "6px",
      marginBottom: "15px",
    },
    title: {
      marginBottom: "20px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    input: {
      padding: "10px",
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
    },
  };

  return (
    <div style={styles.page}>
      
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <Link to="/admin/login" style={styles.navLink}>Admin Login</Link>
      </div>

      {/* CENTERED CARD */}
      <div style={styles.centerBox}>
        <div style={styles.container}>

          <img src={collegeLogo} alt="College Logo" style={styles.logo} />

          <h2 style={styles.title}>Student Registration</h2>

          <form onSubmit={handleRegister} style={styles.form}>
            <input
              placeholder="Name"
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

            <input
              placeholder="Class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              style={styles.input}
            />

            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#5945a0ff")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#68a3e6ff")}
            >
              Register
            </button>
          </form>

          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link
              to="/student/login"
              style={{ color: "#4e48a3ff", fontWeight: "bold", textDecoration: "none" }}
            >
              Login here
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default StudentRegister;
