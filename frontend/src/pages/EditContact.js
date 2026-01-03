import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/contact`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, ...userDetails }),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success(`updated [${userDetails.name}] contact`);

        setUserDetails({ name: "", address: "", email: "", phone: "" });
        navigate("/mycontacts");
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/contact/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        setUserDetails({
          name: result.name,
          email: result.email,
          address: result.address,
          phone: result.phone,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  return (
    <div className="form-page-container">
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <div className="form-container-custom">
          <h2 className="form-title">Edit Contact</h2>

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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditContact;
