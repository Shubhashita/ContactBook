import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <div className="home-container">
      <div className="welcome-hero">
        <div className="welcome-hero-content">
          <h1>
            Welcome back, <br />
            <span className="user-name">{user ? user.name : "Guest"}</span>
          </h1>
          <p>
            Your network is your greatest asset. Manage your connections with
            elegance and ease through your personalized contact dashboard.
          </p>
        </div>
      </div>

      <div className="quick-actions-grid">
        <div className="action-card">
          <h3>Your Contacts</h3>
          <p>
            Explore and manage your entire professional database. Search, edit,
            or update your connections in real-time.
          </p>
          <Link to="/mycontacts" className="dashboard-btn-primary">
            Launch Directory
          </Link>
        </div>

        <div className="action-card">
          <h3>Build Network</h3>
          <p>
            Just met someone influential? Capture their details instantly and
            never miss an opportunity to follow up.
          </p>
          <Link to="/create" className="dashboard-btn-primary">
            New Connection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
