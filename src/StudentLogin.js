import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import collegeLogo from "./collegeLogo.jpg";

function StudentLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/students/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Login Successful!");
        navigate("/home"); 
      } else {
        alert(`❌ ${data.error || "Invalid login credentials!"}`);
      }
    } catch (error) {
      alert("⚠️ Backend not reachable. Please start the server.");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      backgroundColor: "#e6f0ff",
      fontFamily: "Arial, sans-serif",
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
      marginLeft: "20px",
      fontSize: "16px",
    },
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      backgroundColor: "#f9f9f9",
      textAlign: "center",
    },
    logo: {
      width: "100%",
      marginBottom: "20px",
    },
    title: {
      marginBottom: "25px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
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
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <Link to="/admin/login" style={styles.navLink}>Admin Login</Link>
      </div>

      <div style={styles.container}>
        <img src={collegeLogo} alt="College Logo" style={styles.logo} />
        <h2 style={styles.title}>Student Login</h2>

        <form onSubmit={handleLogin} style={styles.form}>
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

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#5945a0ff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#68a3e6ff")}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: "20px", fontSize: "14px" }}>
          <p>
            Don't have an account?  
            <Link to="/student/register" style={{ color: "#4e48a3ff", fontWeight: "bold", textDecoration: "none" }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
