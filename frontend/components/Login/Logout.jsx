import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user"); // Remove user from storage
    setIsAuthenticated(false); // Update authentication state
    navigate("/login"); // Redirect to login page
  }, [setIsAuthenticated, navigate]);

  return null;
};

export default Logout;
