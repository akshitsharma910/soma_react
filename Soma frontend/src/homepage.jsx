import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./partials/navbar";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userr, setUserr] = useState(null); // 1. Add user state

  useEffect(() => {
    fetch("http://localhost:5001")
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setLoading(false);
      });
    // 2. Fetch user data
    fetch("http://localhost:5001", { credentials: "include" })
      .then(res => res.json())
      .then(data => setUserr(data.user || null))
      .catch(() => setUserr(null));
  }, []);

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <>
      {/* Navbar at the top */}
      <Navbar user={userr} />

      {/* Main Content */}
      <div className="post-container d-block container col-7 mt-5">
        {posts.length === 0 ? (
          <p>No posts available yet.</p>
        ) : (
          posts.map(post => (
            <div className="post mb-4 p-3 border-bottom heading-container" key={post._id}>
              <Link
                to={`/posts/${post._id}`}
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="border-bottom row mb-4 pt-4">
                  <h4>{post.title}</h4>
                  <p className="genre fs-6 lead container col text-muted">
                    Genre: {post.genre}
                  </p>
                  <p className="author fs-6 lead col small text-muted">
                    Author: {post.author ? post.author : "Unknown"}
                  </p>
                </div>
                <p>{post.content}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HomePage;
