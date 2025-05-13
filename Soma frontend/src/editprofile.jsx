import React, { useState, useEffect } from "react";

const EditProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    picture: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    fetch("http://localhost:5001/user/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          fullName: data.user.fullName || "",
          email: data.user.email || "",
          picture: data.user.picture || "http://bootdey.com/img/Content/avatar/avatar1.png",
        });
        setPreview(data.user.picture || "http://bootdey.com/img/Content/avatar/avatar1.png");
      });
  }, []);

  // Handle text input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("inputUsername", user.fullName);
      formData.append("inputEmailAddress", user.email);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const res = await fetch("http://localhost:5001/user/updateProfile", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  return (
    <div className="container-xl px-4 mt-4" style={{ color: "#69707a" }}>
      <div className="row">
        <div className="col-xl-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                <img
                  className="img-account-profile rounded-circle mb-2"
                  src={preview}
                  alt="profile"
                  style={{ height: "10rem" }}
                />
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  className="form-control mb-2"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button className="btn btn-primary" type="submit">
                  Upload new image
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-xl-8">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="card mb-4">
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Username (how your name will appear to other users on the site)
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    name="fullName"
                    type="text"
                    placeholder="Enter your username"
                    value={user.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Save changes
                </button>
                {message && (
                  <div className="mt-3" style={{ color: res.ok ? "green" : "red" }}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Bootstrap styles for avatar and cards */}
      <style>{`
        .img-account-profile { height: 10rem; }
        .rounded-circle { border-radius: 50% !important; }
        .card { box-shadow: 0 0.15rem 1.75rem 0 rgb(33 40 50 / 15%); }
        .card .card-header { font-weight: 500; }
        .card-header:first-child { border-radius: 0.35rem 0.35rem 0 0; }
        .card-header {
          padding: 1rem 1.35rem;
          margin-bottom: 0;
          background-color: rgba(33, 40, 50, 0.03);
          border-bottom: 1px solid rgba(33, 40, 50, 0.125);
        }
        .form-control {
          display: block;
          width: 100%;
          padding: 0.875rem 1.125rem;
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1;
          color: #69707a;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #c5ccd6;
          border-radius: 0.35rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default EditProfile;
