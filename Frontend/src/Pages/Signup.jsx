import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './CSS/SignUpmod.css'; // Ensure this CSS file exists with the appropriate styles

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",   // Ensure this is named 'username'
    email: "",
    phone: "",      // Ensure this is named 'phone'
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
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Ensure the body includes all required fields
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("Response from server:", res_data);
        localStorage.setItem('token', res_data.token);
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <section>
      <div className="section-registration">
        <div className="signup-container">
          <h1 className="main-heading mb-3">Create Your Account</h1>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label>Username:</label>  {/* Changed label to 'Username' */}
              <input
                type="text"
                name="username"         // Name is now 'username'
                value={formData.username}
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
              <label>Phone:</label>  {/* Changed label to 'Phone' */}
              <input
                type="text"
                name="phone"             // Name is now 'phone'
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
              <Link to="/Login">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
