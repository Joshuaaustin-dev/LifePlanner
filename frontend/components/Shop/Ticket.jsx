import React from "react";
import classes from "./Ticket.module.css";
import { useState } from "react";

const Ticket = ({ value, onPurchase, disabled, image }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={classes.ticketButton}>
      {loading && (
        <div className="loading">
          <div></div>
        </div>
      )}
      {!loading && image && (
        <img
          src={image}
          alt={`Ticket ${value}`}
          className={classes.ticketImage}
        />
      )}
      <p className={classes.ticketText}>{value} Coins</p>
      <p className={classes.ticketPrice}>${value / 100}.00</p>
      <button
        className={classes.ticketBuyButton}
        onClick={() => onPurchase(value)}
        disabled={disabled}
      >
        Buy
      </button>
    </div>
  );
};

export default Ticket;
