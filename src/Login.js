import React, { useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handling form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setError("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const registeredUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Validate login credentials
    const userExists = registeredUsers.find(
      (user) => user.email === formData.email
    );

    if(!userExists)
      setError('Email is not registered');
    else if (userExists.password !== formData.password)
      setError('Incorrect Password, Please try again!')
    else {
      alert ("Login Successful!");

      setFormData ({
        email : '',
        password : ''
      });
      
      setError(' ');

      navigate('/list-page');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email : </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password : </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <small className="text-warning">{error}</small>}
        <button type="submit" className="login-button">
          Log in
        </button>

        <p className="login-paragraph"> New User? {' '}
          <Link to="/register" className="bottom-link"> Register here </Link>  
        </p> 

      </form>
    </div>
  );
};

export default Login;