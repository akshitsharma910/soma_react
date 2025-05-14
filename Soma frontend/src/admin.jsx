import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [message, setMessage] = useState("");

  // Fetch users on mount
  useEffect(() => {
    fetch("http://localhost:5001/admin/dashboard", { credentials: "include" })
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
  }, []);

  // Handle input changes for editing users
  const handleEditChange = (userId, field, value) => {
    setEditFields(prev => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value }
    }));
  };

  // Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch("http://localhost:5001/admin/manageUser/" + userId, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setUsers(users.filter(u => u._id !== userId));
      setMessage(data.message || "User deleted.");
    } else {
      setMessage(data.message || "Failed to delete user.");
    }
  };

  // Edit user
  const handleEdit = async (userId) => {
    const fields = editFields[userId] || {};
    const res = await fetch("http://localhost:5001/admin/manageUser/" + userId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        fullName: fields.fullName,
        email: fields.email,
        isAdmin: fields.isAdmin === "true" || fields.isAdmin === true, // convert to boolean
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setUsers(users.map(u => u._id === userId ? { ...u, ...fields, isAdmin: fields.isAdmin === "true" || fields.isAdmin === true } : u));
      setMessage(data.message || "User updated.");
    } else {
      setMessage(data.message || "Failed to update user.");
    }
  };

  // Generate site reports
  const generateReports = async () => {
    const res = await fetch("http://localhost:5001/admin/reports", { credentials: "include" });
    const data = await res.json();
    setReports(data);
  };

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      {message && (
        <div style={{ color: "green", marginBottom: 10 }}>{message}</div>
      )}
      <h2>Manage Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            const fields = editFields[user._id] || {};
            return (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ marginRight: "8px" }}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  <input
                    type="text"
                    placeholder="Edit Name"
                    value={fields.fullName ?? user.fullName}
                    onChange={e =>
                      handleEditChange(user._id, "fullName", e.target.value)
                    }
                    style={{ width: "120px", marginRight: "4px" }}
                  />
                  <input
                    type="email"
                    placeholder="Edit Email"
                    value={fields.email ?? user.email}
                    onChange={e =>
                      handleEditChange(user._id, "email", e.target.value)
                    }
                    style={{ width: "170px", marginRight: "4px" }}
                  />
                  <select
                    value={fields.isAdmin ?? user.isAdmin ? "true" : "false"}
                    onChange={e =>
                      handleEditChange(user._id, "isAdmin", e.target.value)
                    }
                    style={{ marginRight: "4px" }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Site Reports</h2>
      <button className="btn btn-info" onClick={generateReports}>
        Generate Reports
      </button>
      <div id="reports" style={{ marginTop: "15px" }}>
        {reports && (
          <>
            <p>Total Users: {reports.userCount}</p>
            <p>Total Posts: {reports.postCount}</p>
            <p>Total Admins: {reports.adminCount}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
