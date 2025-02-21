import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/images/LifePlanner.png";

function CreateNewUser({ setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setError(err.response?.data || "Registration failed.");
    }
  };

  return (
    <div className={`container-fluid ${styles.loginContainer}`}>
      <div className="row align-items-center justify-content-center">
        {/* Logo Section */}
        <div className="col-sm-4 col-md-3 logo-container d-flex justify-content-center">
          <img src={logo} alt="LifePlanner Logo" className="img-fluid" />
        </div>

        {/* Form Section */}
        <div className="col-sm-6 col-md-4">
          <h2 className="text-center mb-4">Create New Account</h2>

          {/* Display error message if there's an error */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          {/* Display success message */}
          {success && (
            <div className="alert alert-success text-center" role="alert">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mx-auto">
                Create Account
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewUser;
