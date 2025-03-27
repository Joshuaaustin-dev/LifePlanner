import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(false); // Update authentication state
    res.clearCookie("access_token");
    navigate("/login"); // Redirect to login page
  }, [setIsAuthenticated, navigate]);

  return null;
};

export default Logout;
