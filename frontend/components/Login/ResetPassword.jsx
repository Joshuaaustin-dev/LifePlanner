import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import logo from "../../assets/images/LifePlanner.png";

function ResetPassword() {
  // 3 steps to reset password
  // 1: Send an email, 2: Enter confirmation code, 3: Reset the password
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //Step 1: Send an email with the reset code
  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/send-reset-code",
        { email }
      );
      setMessage(response.data.message);
      setError("");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset code.");
    }
  };

  //Step 2: Verify the confirmation code from the email
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/verify-reset-code",
        { email, code }
      );
      setMessage(response.data.message);
      setError("");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Error verifying code.");
    }
  };

  //step 3: Reset the password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    //make sure both passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/reset-password",
        { email, newPassword: password }
      );
      setMessage(response.data.message);
      setError("");
      //Redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password.");
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
          {step === 1 && (
            <>
              <h2 className="text-center mb-4">Reset Password</h2>
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success text-center" role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleSendCode}>
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
                    Send Reset Code
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-center mb-4">Enter Confirmation Code</h2>
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success text-center" role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleVerifyCode}>
                <div className="mb-3">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="form-control"
                    placeholder="Enter the code you received"
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mx-auto">
                    Verify Code
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-center mb-4">Set New Password</h2>
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success text-center" role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleResetPassword}>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mx-auto">
                    Update Password
                  </button>
                </div>
              </form>
            </>
          )}

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
