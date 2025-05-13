import React, { useEffect, useState } from "react";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null); // Optional: if you want to show/hide delete button
  const [loading, setLoading] = useState(true);

  // Fetch posts and user info on mount
  useEffect(() => {
    fetch("http://localhost:5001/user/posts", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setUser(data.user || null);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`http://localhost:5001/posts/${postId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (res.ok) {
      setPosts(posts.filter(post => post._id !== postId));
      alert("Post deleted successfully!");
    } else {
      alert("Failed to delete post.");
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div>
      <h1 className="container">My Posts</h1>
      <div className="post-container d-block container col-7 mt-5">
        {posts.length > 0 ? (
          posts.map(post => (
            <div className="post mb-4 p-3 border-bottom heading-container" key={post._id}>
              <a
                href={`/posts/${post._id}`}
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="border-bottom row mb-4 pt-4">
                  <h4>{post.title}</h4>
                  <p className="genre fs-6 lead container col text-muted">
                    Genre: {post.genre}
                  </p>
                  <p className="author fs-6 lead col small text-muted">
                    Author: {post.author || "Unknown"}
                  </p>
                  {user && post.authorId === user.id && (
                    <div className="col-1">
                      <button
                        className="delete-btn btn btn-outline-danger"
                        onClick={e => {
                          e.preventDefault();
                          handleDelete(post._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <p>{post.content}</p>
              </a>
            </div>
          ))
        ) : (
          <p>You haven't written any posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
