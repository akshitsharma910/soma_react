import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setInfoMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfoMessage("");
    try {
      const res = await fetch("http://localhost:5001/user/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setInfoMessage(data.message || "If this email exists, a reset link will be sent.");
      } else {
        setError(data.message || "Failed to request password reset.");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1>Forgot Password</h1>
        <form id="forgotPasswordForm" onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Reset Password</button>
          {infoMessage && <p style={styles.infoMessage}>{infoMessage}</p>}
          {error && <p style={{ ...styles.infoMessage, color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

const styles = {
  body: {
    background: "linear-gradient(to right, #1f4037, #99f2c8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: 300,
    textAlign: "center"
  },
  inputGroup: {
    marginBottom: 15,
    textAlign: "left"
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 10,
    border: "1px solid #ccc",
    borderRadius: 4
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer"
  },
  infoMessage: {
    marginTop: 20,
    color: "#888"
  }
};

export default ForgotPassword;
