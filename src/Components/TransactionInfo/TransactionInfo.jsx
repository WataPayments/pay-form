import React from "react";
import "./styles.css";

export const TransactionInfo = ({ transactionData }) => {
  return (
    <div className="transaction-info">
      <div className="price-info">
        <div className="price-number">{transactionData.amount} ₽</div>
        <div className="transaction-number">
          {/* {transactionData.order_number} */}
        </div>
      </div>
      <div className="agent-name">{transactionData.agent_name}</div>
      <div className="description">{transactionData.description}</div>
    </div>
  );
};
