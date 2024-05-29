import React, { useContext } from "react";
import "../Styles/PaymentFormDetailsStyle.css";
import { ThemeContext } from "../App";

export default function PaymentFormDetails(props) {
  const theme = useContext(ThemeContext);

  if (!props.transaction) {
    return "";
  }

  return (
    <div className={`order-info-block ${theme}`}>
      <div className={`price-and-number-order ${theme}`}>
        <p className={`price-order ${theme}`}>{props.transaction.amount} ₽</p>
        <p className={`number ${theme}`}>
          {/* {props.transaction.order_number} */}
        </p>
      </div>
      <div className={`link-and-info-order ${theme}`}>
        <p>{props.transaction.agent_name}</p>
        <p>{props.transaction.description}</p>
      </div>
    </div>
  );
}
