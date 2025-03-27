import { useState, useEffect } from "react";
import axios from "axios";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/get-user",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // set user
        setUser(response.data);
        setTokens(response.data.Tokens || 0); // Ensure tokens have a default value
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return { user, tokens, setTokens, error };
};

export default useUser;
