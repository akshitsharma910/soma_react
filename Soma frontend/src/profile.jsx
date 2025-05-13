import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();

  // Dummy data for articles, followers, and rating
  // Replace with real data from your backend as needed
  const articles = user.articlesCount || 41;
  const followers = user.followersCount || 976;
  const rating = user.rating || 8.5;

  return (
    <section
      className="w-100 px-4 py-5"
      style={{ backgroundColor: "#9de2ff", borderRadius: "0.5rem 0.5rem 0 0" }}
    >
      <div className="row d-flex justify-content-center">
        <div className="col col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{ borderRadius: "15px" }}>
            <div className="card-body p-4">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <img
                    src={
                      user.picture ||
                      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    }
                    alt="Profile"
                    className="img-fluid"
                    style={{ width: 180, borderRadius: 10 }}
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h5 className="mb-1">😊</h5>
                  <p className="mb-2 pb-1">{user.fullName}</p>
                  <div className="d-flex justify-content-start rounded-3 p-2 mb-2 bg-body-tertiary" style={{ background: "#f8f9fa" }}>
                    <div>
                      <p className="small text-muted mb-1">Articles</p>
                      <p className="mb-0">{articles}</p>
                    </div>
                    <div className="px-3">
                      <p className="small text-muted mb-1">Followers</p>
                      <p className="mb-0">{followers}</p>
                    </div>
                    <div>
                      <p className="small text-muted mb-1">Rating</p>
                      <p className="mb-0">{rating}</p>
                    </div>
                  </div>
                  <div className="d-flex pt-1">
                    <button
                      type="button"
                      className="btn btn-outline-primary me-1 flex-grow-1"
                      onClick={() => navigate("/user/editProfile")}
                    >
                      Edit Profile
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary flex-grow-1"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
