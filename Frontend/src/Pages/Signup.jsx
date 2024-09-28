import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './CSS/SignUpmod.css'; // Ensure this CSS file exists with the appropriate styles
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200 || response.status==201) {  // Check for status code 200
        console.log("Response from server:", response.data);
        navigate("/Login")
        localStorage.setItem('token', response.data.token); // Adjust according to your server response
        navigate("/login");
      } else {
        console.error("Registration failed:", response.data.msg);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error during registration:", error.response.data); // Log error from server
      } else {
        console.error("Error during registration:", error.message); // Log general error
      }
    }
  };

  return (
    <section>
      <div className="section-registration">
        <div className="signup-container">
          <h1 className="main-heading mb-3">Create Your Account</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label>Username:</label> {/* Changed label to 'Username' */}
              <input
                type="text"
                name="username"
                value={formData.username} // Update this to 'formData.username'
                onChange={handleInputChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="submit-btn">Register Now</button>

            <div className="form-links">
              <Link to="/login">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
