import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(false); // Update authentication state
    axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
    navigate("/login"); // Redirect to login page
  }, [setIsAuthenticated, navigate]);

  return null;
};

export default Logout;
