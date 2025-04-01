import React from "react";
import classes from "./Ticket.module.css";

const Ticket = ({ value, onPurchase, disabled, image }) => {
  return (
    <div className={classes.ticketButton}>
      {image && <img src={image} alt={`Ticket ${value}`} className={classes.ticketImage} />}
      <p className={classes.ticketText}>{value} Coins</p>
      <p className={classes.ticketPrice}>${value / 100}.00</p>
      <button className={classes.ticketBuyButton} onClick={() => onPurchase(value)} disabled={disabled}>
        Buy
      </button>
    </div>
  );
};

export default Ticket;
