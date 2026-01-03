import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login = () => {
  const { toast } = useContext(ToastContext);
  const { loginUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!credentials.email || !credentials.password) {
      toast.error("please enter all the required fields!");
      return;
    }

    loginUser(credentials);
  };

  return (
    <div className="split-screen">
      <div className="split-screen-left">
        <div className="brand-section">
          <h1 className="brand-title">Contact Book</h1>
          <p className="brand-description">
            The elegant way to organize your professional network and stay
            connected with those who matter most.
          </p>
        </div>
      </div>

      <div className="split-screen-right">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Sign In</h2>
            <p>Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="emailInput" className="auth-label">
                Email Address
              </label>
              <input
                type="email"
                className="auth-input"
                id="emailInput"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="name@email.com"
                required
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="passwordInput" className="auth-label">
                Password
              </label>
              <input
                type="password"
                className="auth-input"
                id="passwordInput"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign In
            </button>

            <p className="auth-footer">
              Don't have an account?
              <Link to="/register" className="auth-link-text">
                Join Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
