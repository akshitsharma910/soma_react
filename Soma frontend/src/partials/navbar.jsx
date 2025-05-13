import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/user/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        navigate('/user/login');
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
        <div className="container-xxl d-flex justify-content-around">
          {/* Offcanvas Sidebar Trigger */}
          <div className="col-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-square-half text-black-50 justify-content-start"
              viewBox="0 0 16 16"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowSidebar(true)}
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </div>
          {/* Brand */}
          <div className="col-2">
            <Link className="navbar-brand fw-bold text-secondary" to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-vector-pen me-2 text-secondary"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828zm-1.8 2.908-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"
                />
                <path
                  fillRule="evenodd"
                  d="M2.832 13.228 8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086z"
                />
              </svg>
              Soma
            </Link>
          </div>
          {/* Search & Collapse */}
          <div className="col-6">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarSupportedContent"
            >
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const searchInput = formData.get('searchInput');
                  if (searchInput.trim()) {
                    navigate(`/search?query=${encodeURIComponent(searchInput)}`);
                  }
                }}
                className="d-flex"
                role="search"
              >
                <input
                  className="form-control me-2"
                  type="search"
                  id="searchInput"
                  name="searchInput"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
          {/* Mobile Auth Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3 d-block d-lg-none">
            {!user && (
              <>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => navigate('/user/signup')}
                  >
                    Signup
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => navigate('/user/login')}
                  >
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
          {/* Desktop Auth/Action Buttons */}
          <div className="ms-4 d-none d-lg-block">
            {!user ? (
              <>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => navigate('/user/signup')}
                >
                  Signup
                </button>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => navigate('/user/login')}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => navigate('/posts/add')}
                >
                  
                  Add Post
                </button>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => navigate('/user/posts')}
                >
                  My Posts
                </button>
                <form
                  id="logoutForm"
                  onSubmit={handleLogout}
                  style={{ display: 'inline' }}
                >
                  <button className="btn btn-danger" type="submit">
                    Logout
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Offcanvas */}
      <Sidebar show={showSidebar} handleClose={() => setShowSidebar(false)} />
    </>
  );
};

export default Navbar;
