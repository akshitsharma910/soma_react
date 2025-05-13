import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5001/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        // You can redirect to home or profile after login
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.loginContainer}>
        <h1><b>Login</b></h1>
        <hr style={styles.hr} />
        <form id="loginForm" onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label htmlFor="email"><i>Email</i></label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password"><i>Password</i></label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <hr style={styles.hr} />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        <div style={styles.linkContainer}>
          <Link to="/user/signup"><i>SignUp</i></Link>
          <Link to="/"><i>Guest</i></Link>
          <Link to="/user/forgot"><i>Forgot Password?</i></Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundImage: 'url("https://wallpaper.forfun.com/fetch/ee/ee34bdb2357c16ddcc17e25f7c16fc32.jpeg")',
    backgroundSize: 'contain',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0
  },
  loginContainer: {
    width: '30%',
    height: '55%',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  inputGroup: {
    marginBottom: '16px',
    textAlign: 'left',
    padding: '20px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    margin: '10px',
    width: '50%',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  hr: {
    margin: '10px 0'
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px'
  }
};

export default LoginPage;
