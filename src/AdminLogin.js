import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import collegeLogo from "./collegeLogo.jpg";

function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message); // Either "First admin created successfully" or "Login successful"
      localStorage.setItem("adminName", name);
      navigate("/admin/dashboard"); // redirect after login/first admin creation
    } else {
      alert(`❌ ${data.error || "Something went wrong"}`);
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Could not connect to server. Start backend using: npm run server");
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
    title: { marginBottom: "25px", color: "#333" },
    form: { display: "flex", flexDirection: "column" },
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
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.page}>

      {/* Top Bar */}
      <div style={styles.topBar}>
        <Link to="/student/login" style={styles.navLink}>
          Student Login
        </Link>
      </div>

      {/* Login Box */}
      <div style={styles.container}>
        <img src={collegeLogo} alt="College Logo" style={styles.logo} />
        <h2 style={styles.title}>Admin Login</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            placeholder="Admin Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#455aa0ff")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#68a3e6ff")
            }
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
