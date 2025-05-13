import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5001/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/user/login"), 1500);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.signupContainer}>
        <h1><i>Signup</i></h1>
        <hr style={styles.hr} />
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="fullName" style={styles.label}>Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              style={styles.input}
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.input}
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              style={styles.input}
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}
        <br />
        <hr style={styles.hr} />
        <h4>
          <i>
            <Link to="/user/login" style={styles.link}>Already SignIn</Link>
          </i>
        </h4>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundImage: 'url("https://wallpaper.forfun.com/fetch/ee/ee34bdb2357c16ddcc17e25f7c16fc32.jpeg")',
    backgroundSize: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    fontFamily: 'Arial, sans-serif'
  },
  signupContainer: {
    width: '30%',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  inputGroup: {
    marginBottom: '16px',
    textAlign: 'center'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    textAlign: 'left',
    marginLeft: '30px'
  },
  input: {
    width: '80%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    width: '80%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  hr: {
    width: '90%'
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
};

export default SignupPage;
