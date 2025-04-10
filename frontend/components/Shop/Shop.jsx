import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useUser from "../Hooks/userUser";
import Ticket from "./Ticket";
import shopStyles from "./Shop.module.css";
import smallpile from "../../assets/shop/smallpile.png";
import mediumpile from "../../assets/shop/mediumpile.png";
import largepile from "../../assets/shop/largepile.png";

const Shop = () => {
  const { user, coins, setCoins } = useUser();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      confirmPayment(sessionId);
    }
  }, [searchParams]);

  const confirmPayment = async (sessionId) => {
    try {
      const response = await fetch("http://localhost:5000/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      if (response.ok) {
        setCoins(data.coins);
      }
    } finally {
      setTimeout(() => {
        navigate("/Shop", { replace: true });
      }, 500);
    }
  };

  const buyCoin = async (value) => {
    if (!user?.email) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value, email: user.email }),
      });

      const data = await response.json();
      if (response.ok && data.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className={shopStyles.shopContainer}>
        <h1>Shop</h1>

        <p className={shopStyles.coinDisplay}>
          Coins: {user ? <span>{coins}</span> : "loading.."}
        </p>
      </header>
      <div className={shopStyles.ticketsContainer}>
        <div className={shopStyles.ticketDiv}>
          {!loading ? (
            <Ticket
              value={500}
              onPurchase={buyCoin}
              disabled={loading}
              image={smallpile}
            />
          ) : (
            isLoading && (
              <div className="loading">
                <div></div>
              </div>
            )
          )}
        </div>
        <div className={shopStyles.ticketDiv}>
          {!loading ? (
            <Ticket
              value={500}
              onPurchase={buyCoin}
              disabled={loading}
              image={mediumpile}
            />
          ) : (
            isLoading && (
              <div className="loading">
                <div></div>
              </div>
            )
          )}
        </div>
        <div className={shopStyles.ticketDiv}>
          {!loading ? (
            <Ticket
              value={500}
              onPurchase={buyCoin}
              disabled={loading}
              image={largepile}
            />
          ) : (
            isLoading && (
              <div className="loading">
                <div></div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
