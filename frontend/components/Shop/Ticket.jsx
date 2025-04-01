import React from "react";

const Ticket = ({ value, onPurchase, disabled }) => {
  return (
    <button onClick={() => onPurchase(value)} disabled={disabled}>
      Buy {value} Coins
    </button>
  );
};

export default Ticket;
