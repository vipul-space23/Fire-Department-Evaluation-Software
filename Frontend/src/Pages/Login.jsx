import React, { useState } from "react";
import { Link } from "react-router-dom";
import './CSS/Loginmod.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate(); // Use navigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that a role is selected
    if (!formData.role) {
      alert("Please select a role.");
      return;
    }

    console.log("Login Data Submitted:", formData);

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { // Make sure this URL is correct
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("login response", response);

      if (response.status==200 || response.status==201) {
        const responseData = await response.json();
        alert("Login successful!");

        // Store token in localStorage if needed
        // localStorage.setItem("token", responseData.token);

        // Navigate to the dashboard page after successful login
        navigate("/Dashboard");

        // Reset form fields
        setFormData({
          email: "",
          password: "",
          // role: "",
        });
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 id="c1">Welcome User</h1>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email input */}
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

          {/* Password input */}
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

          {/* Role selection */}
          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Role</option>
              <option value="user">user</option>
              <option value="service">Service</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Login</button>

          {/* Link to Sign Up page */}
          <div className="form-links">
            <Link to="/">Create Account</Link>
            <a href="#">Need Help?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

