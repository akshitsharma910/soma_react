import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    genre: ""
  });
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
      const res = await fetch("http://localhost:5001/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Post added successfully!");
        setTimeout(() => navigate("/"), 1200);
      } else {
        setError(data.message || "Failed to add post");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div>
      <header style={styles.header}>
        <h1>Add a New Post</h1>
      </header>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" style={styles.label}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            style={styles.input}
          />

          <label htmlFor="content" style={styles.label}>Content</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            style={styles.textarea}
          />

          <label htmlFor="genre" style={styles.label}>Genre</label>
          <select
            id="genre"
            name="genre"
            required
            value={form.genre}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select a genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Poetry">Poetry</option>
          </select>

          <button type="submit" style={styles.button}>Submit</button>
        </form>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 10 }}>{success}</div>}
      </div>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: "#4a90e2",
    color: "white",
    padding: "1rem",
    textAlign: "center"
  },
  formContainer: {
    maxWidth: "600px",
    margin: "2rem auto",
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
  },
  label: {
    fontWeight: "bold",
    marginTop: "1rem",
    color: "#555",
    display: "block"
  },
  input: {
    marginTop: "0.5rem",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    width: "100%"
  },
  textarea: {
    resize: "vertical",
    height: "150px",
    marginTop: "0.5rem",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    width: "100%"
  },
  button: {
    marginTop: "1.5rem",
    padding: "0.75rem",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.2s"
  }
};

export default AddPost;
