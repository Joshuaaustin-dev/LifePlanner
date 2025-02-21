import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/images/LifePlanner.png";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //TODO Handle password reset submission

  return (
    <div className={`container-fluid ${styles.loginContainer}`}>
      <div className="row align-items-center justify-content-center">
        {/* Logo Section */}
        <div className="col-sm-4 col-md-3 logo-container d-flex justify-content-center">
          <img src={logo} alt="LifePlanner Logo" className="img-fluid" />
        </div>

        {/* Form Section */}
        <div className="col-sm-6 col-md-4">
          <h2 className="text-center mb-4">Reset Password</h2>

          {/* Display error message if there's an error */}
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}

          {/* Display success message */}
          {message && (
            <div className="alert alert-success text-center" role="alert">
              {message}
            </div>
          )}

          <form>
            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mx-auto">
                Submit Pa
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            <a href="/login" className="text-decoration-none">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
