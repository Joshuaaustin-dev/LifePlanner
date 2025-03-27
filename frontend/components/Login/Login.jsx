import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/images/LifePlanner.png";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Handle user login with the provided username and password
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Store user data in localStorage or state
        // Set authentication state
        setIsAuthenticated(true);

        navigate("/Home"); // Redirect after login
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          <h2 className="text-center mb-4">Login</h2>

          {/* Display error message if there's an error */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mx-auto">
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            {/*TODO*/}
            <a href="/reset-password" className="text-decoration-none">
              Forgot password?
            </a>
          </div>
          <hr />
          <div className="text-center">
            <a href="/create-account" className="btn btn-success">
              Create New Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
