import React, { useState } from "react";
import { Link } from "react-router-dom";
import './CSS/Loginmod.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", formData);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 id="c1">Welcome User</h1>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Form fields */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="user">User</option>
              <option value="service">Service</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Login</button>

          {/* Link to Sign Up page */}
          <div className="form-links">
            <Link to="/signup">Create Account</Link>
            <a href="#">Need Help?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
