import React from "react";
import styles from "./Ticket.module.css";

const Ticket = ({ value, onPurchase, disabled }) => {
  return (
    <button
      className={styles.ticketButton}
      onClick={() => onPurchase(value)}
      disabled={disabled}
    >
      Buy {value} Tokens
    </button>
  );
};

export default Ticket;
