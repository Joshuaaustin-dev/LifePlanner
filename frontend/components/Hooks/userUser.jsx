import { useState, useEffect } from "react";
import axios from "axios";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user && user.email) {
      axios
        .post("http://localhost:5000/get-user", { email: user.email })
        .then((response) => {
          setUser(response.data); // Update user state
          setTokens(response.data.Tokens || 0); // Ensure tokens have a default value
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setError("Failed to load user data.");
        });
    }
  }, [user?.email]); // Runs when email changes

  return { user, tokens, setTokens, error };
};

export default useUser;
