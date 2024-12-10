import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure only digits are allowed in the mobile field
    if (name === "mobile" && /[^\d]/.test(value)) return;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear error dynamically for valid fields
    const errorMessage = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  // Validate individual fields
  const validate = (name, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "firstName") {
      if (!value) return "First Name is required";
      if (value.length < 3) return "First Name must be at least 3 characters";
    }

    if (name === "lastName") {
      if (!value) return "Last Name is required";
    }

    if (name === "email") {
      if (!value) return "Email is required";
      if (!emailRegex.test(value)) return "Enter a valid email address";
    }

    if (name === "mobile") {
      if (!value) return "Mobile number is required";
      if (!/^[6-9]/.test(value)) return "Mobile number must start with 6-9";
      if (value.length !== 10) return "Mobile number must be exactly 10 digits";
    }

    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
    }

    if (name === "confirmPassword") {
      if (!value) return "Confirm Password is required";
      if (value !== formData.password) return "Passwords do not match";
    }

    return "";
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key]);
      if (error) validationErrors[key] = error;
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = { ...formData };
      delete newUser.confirmPassword;
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      alert("Registration Successful!");

      navigate("/login");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <small className="text-warning">{errors.firstName}</small>}
        </div>

        <div className="mb-3">
          <label>Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <small className="text-warning">{errors.lastName}</small>}
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-warning">{errors.email}</small>}
        </div>

        <div className="mb-3">
          <label>Mobile:</label>
          <input
            type="text"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            maxLength="10"
          />
          {errors.mobile && <small className="text-warning">{errors.mobile}</small>}
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="text-warning">{errors.password}</small>}
        </div>

        <div className="mb-3">
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <small className="text-warning">{errors.confirmPassword}</small>}
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <p className="register-paragraph"> Already Have an Account? {' '} 
          <Link to="/" className="bottom-link"> Log in </Link>
        </p>
      </form>
      
    </div>
  );
};

export default Register;