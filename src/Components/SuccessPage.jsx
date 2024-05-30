import React, { useContext, useEffect, useState } from "react";
import Done from "../Images/Alert icon.svg";
import "../Styles/SuccessPageStyle.css";
import ApiClient from "../ApiClient";
import { useNavigate, useParams } from "react-router-dom";
import logoDark from "../Images/Logo.svg";
import logoLight from "../Images/LogoLight.svg";
import { ThemeContext } from "../App";

export default function SuccessPage(props) {
  const [transactionData, setTransactionData] = useState("");
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await ApiClient.fetchTransactionData(uuid);
        setTransactionData(response.transactionData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        if (error.response) {
          if (error.response.status === 404) {
            navigate("/404");
          } else if (error.response.status === 500) {
            navigate("/500");
          }
        }
      }
    };

    fetchTransaction();
  }, [uuid, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Success Page",
          text: "I successfully paid the bill!",
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => console.log("Link copied to clipboard"))
        .catch((error) => console.error("Error copying link:", error));
    }
  };

  if (loading) {
    return (
      <div className={`loader-block ${theme}`}>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className={`success-container ${theme}`}>
      <div className={`sucsess-block ${theme}`}>
        <div className={`result-pay-success ${theme}`}>
          <img src={Done} alt="Result-pay" />
          <p>Успешный платеж!</p>
        </div>
        <div className={`price-and-number-order ${theme}`}>
          <p className={`price-success ${theme}`}>{transactionData.amount}</p>
          <p className={`number-success ${theme}`}>
            {/* {transactionData.order_number} */}
          </p>
        </div>
        <div className={`link-and-info-order-success ${theme}`}>
          <p>{transactionData.agent_name}</p>
          <p>{transactionData.description}</p>
        </div>
        <div className={`submit-button-result ${theme}`}>
          <input type="button" value="Поделиться" onClick={handleShare} />
        </div>
      </div>
      <div className={`logo ${theme}`}>
        <img src={theme === "dark" ? logoDark : logoLight} alt="WATA" />
      </div>
    </div>
  );
}
