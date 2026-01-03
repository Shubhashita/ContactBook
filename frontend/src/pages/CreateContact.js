import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateContact = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDetails),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success(`Created [${userDetails.name}] contact`);
        setUserDetails({ name: "", address: "", email: "", phone: "" });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="form-page-container">
      <div className="form-container-custom">
        <h2 className="form-title">Create Contact</h2>

        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label htmlFor="nameInput" className="auth-label">
              Full Name
            </label>
            <input
              type="text"
              className="auth-input"
              id="nameInput"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="addressInput" className="auth-label">
              Address
            </label>
            <input
              type="text"
              className="auth-input"
              id="addressInput"
              name="address"
              value={userDetails.address}
              onChange={handleInputChange}
              placeholder="e.g. 123 Main St, CA"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="emailInput" className="auth-label">
              Email Address
            </label>
            <input
              type="email"
              className="auth-input"
              id="emailInput"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              placeholder="e.g. john@example.com"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="phoneInput" className="auth-label">
              Phone Number
            </label>
            <input
              type="number"
              className="auth-input"
              id="phoneInput"
              name="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              placeholder="e.g. 9876543210"
              required
            />
          </div>

          <div className="mt-4">
            <button type="submit" className="btn-primary-custom w-100">
              Add Connection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContact;
