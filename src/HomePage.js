import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [name, setName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [freeRooms, setFreeRooms] = useState([]);
  const [message, setMessage] = useState("");

  const [complaint, setComplaint] = useState("");

  // ✅ These two come from database
  const [allocatedRoom, setAllocatedRoom] = useState("");

  // ✅ NEW: List of all students + allocated rooms
  const [allStudents, setAllStudents] = useState([]);

  // ✅ Load free rooms
  useEffect(() => {
    fetch("http://localhost:5000/api/hostel/free")
      .then((res) => res.json())
      .then((data) => setFreeRooms(data))
      .catch(() => alert("⚠️ Unable to load rooms. Backend offline."));
  }, []);

  // ✅ Load requested + allocated room for the student
  useEffect(() => {
    if (!name) return;

    fetch(`http://localhost:5000/api/students/find/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setAllocatedRoom(data.allocatedRoom || "");
        setMessage(
          data.requestedRoom ? `Requested Room: ${data.requestedRoom}` : ""
        );
      })
      .catch(() => {});
  }, [name]);

  // ✅ NEW: Fetch all students with allocated rooms
  useEffect(() => {
    fetch("http://localhost:5000/api/students/all")
      .then((res) => res.json())
      .then((data) => setAllStudents(data))
      .catch(() => console.log("⚠️ Cannot load student records"));
  }, []);

  // ✅ Request Room
  const handleBookRoom = async (e) => {
    e.preventDefault();

    if (!name) return alert("Please enter your name");
    if (!selectedRoom) return alert("Please select a room");

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/request-room",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, roomNumber: selectedRoom }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Room ${selectedRoom} request submitted!`);
        setMessage(`Requested Room: ${selectedRoom}`);
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch {
      alert("⚠️ Backend not reachable.");
    }
  };

  // ✅ Submit Complaint
  const handleComplaintSubmit = async () => {
    if (!name) return alert("Enter your name first");
    if (!complaint) return alert("Complaint cannot be empty!");

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/complaint",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, complaint }),
        }
      );

      if (response.ok) {
        alert("✅ Complaint submitted!");
        setComplaint("");
      }
    } catch {
      alert("⚠️ Backend not reachable.");
    }
  };

  // ✅ Styles
  const styles = {
    container: {
      maxWidth: "500px",
      width: "100%",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      backgroundColor: "#ffffff",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      color: "#333",
      marginBottom: "25px",
      fontSize: "28px",
    },
    form: { display: "flex", flexDirection: "column", marginBottom: "30px" },
    input: {
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    textarea: {
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
      minHeight: "80px",
      width :"400px"
    },
    select: {
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
    statusBox: {
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "#eef5ff",
      borderRadius: "8px",
      fontSize: "16px",
      textAlign: "left",
      color: "#333",
      fontWeight: "bold",
    },
    studentBox: {
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "#f4f8ff",
      borderRadius: "8px",
      fontSize: "16px",
      textAlign: "left",
      color: "#444",
    },
    page: {
      minHeight: "100vh",
      backgroundColor: "#e6f0ff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding :"40px"
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>DYP Girls Hostel</h2>

        {/* ✅ Room Request Form */}
        <form style={styles.form} onSubmit={handleBookRoom}>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Room to Request</option>

            {freeRooms.length > 0 ? (
              freeRooms.map((room) => (
                <option key={room.roomNumber} value={room.roomNumber}>
                  Room {room.roomNumber}
                </option>
              ))
            ) : (
              <option disabled>No rooms available</option>
            )}
          </select>

          <button type="submit" style={styles.button}>
            Request Room
          </button>
        </form>

        {(message || allocatedRoom) && (
          <div style={styles.statusBox}>
            {message && (
              <p>
                 <b>{message}</b>
              </p>
            )}

            {allocatedRoom && (
              <p>
                 <b>Allocated Room:</b> {allocatedRoom}
              </p>
            )}
          </div>
        )}

        {/* ✅ Complaint Box */}
        <h3>Submit a Complaint</h3>
        <textarea
          style={styles.textarea}
          placeholder="Write your complaint..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button
            style={styles.button}
            onClick={handleComplaintSubmit}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#4e48a3ff")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#68a3e6ff")
            }
          >
            Submit Complaint
          </button>
        </div>

        {/* ✅ NEW: Show ALL students and allocated rooms */}
        <h3 style={{ marginTop: "30px" }}>All Students & Rooms</h3>

        <div style={styles.studentBox}>
          {allStudents.length > 0 ? (
            allStudents.map((s, index) => (
              <p key={index}>
                 <b>{s.name}</b> → Room:{" "}
                <b>{s.allocatedRoom || "Not Allocated"}</b>
              </p>
            ))
          ) : (
            <p>No student records found</p>
          )}
        </div>

        {/* ✅ Footer */}
        <div style={{ marginTop: "20px" }}>
          <Link to="/student/login">Student Login</Link> |{" "}
          <Link to="/admin/login">Admin Login</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
