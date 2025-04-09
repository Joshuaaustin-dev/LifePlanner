import { useState, useEffect } from "react";
import axios from "axios";

const useUser = () => {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:5000/get-user", {}, { withCredentials: true })
      .then((response) => {
        // Set user data
        setUser(response.data);
        setCoins(response.data.coins || 0);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return { user, setUser, coins, setCoins, error };
};

export default useUser;
