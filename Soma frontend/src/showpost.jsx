import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ShowPost = ({ currentUser }) => {
  const { id } = useParams(); // post ID from route
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch post and comments on mount
  useEffect(() => {
    fetch(`http://localhost:5001/posts/${id}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        setPost(data.post);
        setComments(data.comments || []);
        setLoading(false);
      });
  }, [id]);

  // Delete post
  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`http://localhost:5001/posts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("Post deleted successfully!");
      navigate("/");
    } else {
      alert("Failed to delete post.");
    }
  };

  // Upvote
  const handleUpvote = async () => {
    const res = await fetch(`http://localhost:5001/posts/${id}/upvote`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      // Refetch post
      const data = await res.json();
      setPost(prev => ({ ...prev, upvotes: data.upvotes || prev.upvotes }));
    }
  };

  // Downvote
  const handleDownvote = async () => {
    const res = await fetch(`http://localhost:5001/posts/${id}/downvote`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      // Refetch post
      const data = await res.json();
      setPost(prev => ({ ...prev, downvotes: data.downvotes || prev.downvotes }));
    }
  };

  // Add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentValue.trim()) return;
    const res = await fetch(`http://localhost:5001/posts/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content: commentValue }),
    });
    const data = await res.json();
    if (res.ok) {
      setComments([...comments, data.comment]);
      setCommentValue("");
    } else {
      setMessage(data.message || "Failed to add comment.");
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    const res = await fetch(`http://localhost:5001/posts/${id}/comment/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setComments(comments.filter(c => c._id !== commentId));
    } else {
      alert(data.message || "Failed to delete comment.");
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (!post) return <div className="container mt-5">Post not found.</div>;

  return (
    <div className="container mt-5 col-5">
      <div className="post">
        <h1>{post.title}</h1>
        <p className="genre">Genre: {post.genre}</p>
        <p className="author">
          Author: {post.author ? post.author : "Unknown"}
        </p>
        <p className="content">{post.content}</p>
        {currentUser && post.authorId === currentUser.id && (
          <button
            onClick={handleDeletePost}
            className="btn btn-outline-secondary"
          >
            Delete Post
          </button>
        )}
      </div>

      <p className="badge border views-color mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg> {post.views}
      </p>

      <div className="btn-group ms-3" role="group" aria-label="Basic mixed styles example">
        <button className="btn btn-outline-info" onClick={handleUpvote}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708z"/>
            <path fillRule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
          </svg>{" "}
          {post.upvotes ? post.upvotes.length : 0}
        </button>
        <button className="btn btn-outline-warning" onClick={handleDownvote}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-down" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
            <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
          </svg>{" "}
          {post.downvotes ? post.downvotes.length : 0}
        </button>
      </div>

      <div className="container mt-3 post-container col-5 mt-2 py-3 border-top">
        <h3 className="text-secondary" id="comment-length">
          Comments ({comments.length})
        </h3>
        {currentUser && (
          <form onSubmit={handleAddComment}>
            <div className="mb-3 row align-items-center">
              <div className="form-floating col-9">
                <textarea
                  name="content"
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                  value={commentValue}
                  onChange={e => setCommentValue(e.target.value)}
                  required
                ></textarea>
                <label htmlFor="floatingTextarea2" className="ms-2">
                  Add your opinion...
                </label>
              </div>
              <button className="btn btn-sm btn-primary mx-4 col-2" type="submit">
                Add
              </button>
            </div>
          </form>
        )}

        <div className="mt-3">
          {comments.map(comment => (
            <div className="comment" id={`comment-${comment._id}`} key={comment._id}>
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>
                {comment.author ? comment.author : "Unknown User"}
              </strong>
              <pre className="ms-5">{comment.content}</pre>
              {currentUser && comment.authorId === currentUser.id && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteComment(comment._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
        {message && <div style={{ color: "red" }}>{message}</div>}
      </div>
    </div>
  );
};

export default ShowPost;
