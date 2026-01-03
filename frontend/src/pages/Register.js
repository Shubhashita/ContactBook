import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("please enter all the required fields!");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("password do not match!");
      return;
    }

    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
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
            <h2>Join Now</h2>
            <p>Create your personal account today</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-form-group">
              <label htmlFor="nameInput" className="auth-label">
                Name
              </label>
              <input
                type="text"
                className="auth-input"
                id="nameInput"
                name="name"
                value={credentials.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="emailInput" className="auth-label">
                Email
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

            <div className="auth-form-group">
              <label htmlFor="confirmPassword" className="auth-label">
                Confirm
              </label>
              <input
                type="password"
                className="auth-input"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Create Account
            </button>

            <p className="auth-footer">
              Already a member?
              <Link to="/login" className="auth-link-text">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
