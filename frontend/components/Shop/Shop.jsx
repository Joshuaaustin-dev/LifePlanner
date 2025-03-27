import React, { useState } from "react";
import useUser from "../Hooks/userUser";
import Ticket from "./Ticket";
import shopStyles from "./Shop.module.css";

const Shop = () => {
  const { user, tokens, setTokens, error } = useUser();
  const [loading, setLoading] = useState(false);
  const [purchaseError, setPurchaseError] = useState(null);

  const buyToken = async (amount) => {
    if (!user?._id) {
      setPurchaseError("User ID not found. Please refresh and try again.");
      return;
    }

    setLoading(true);
    setPurchaseError(null);

    try {
      const response = await fetch("http://localhost:5000/buy-ticket", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, amount }),
      });

      const data = await response.json();
      if (response.ok) {
        setTokens(data.tokens);
      } else {
        setPurchaseError(data.message || "Failed to buy tokens.");
      }
    } catch (err) {
      setPurchaseError("Error buying tokens. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className={shopStyles.shopContainer}>
        <h1>Shop</h1>
      </header>

      <div className={shopStyles.currentTokens}>Current Tokens: {tokens}</div>

      <div className={shopStyles.ticketsContainer}>
        <div className={shopStyles.ticketDiv}>
          <Ticket value={10} onPurchase={buyToken} disabled={loading} />
        </div>
        <div className={shopStyles.ticketDiv}>
          <Ticket value={50} onPurchase={buyToken} disabled={loading} />
        </div>
        <div className={shopStyles.ticketDiv}>
          <Ticket value={100} onPurchase={buyToken} disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
