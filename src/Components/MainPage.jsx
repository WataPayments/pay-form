import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import logoDark from "../Images/Logo.svg";
import logoLight from "../Images/LogoLight.svg";
import PaymentForm from "../Components/PaymentForm";
import { number } from "card-validator";
import "../index.css";
import { DataContext, ThemeContext } from "../App";
import { TransactionInfo } from "./TransactionInfo/TransactionInfo";
import isMobile from "is-mobile";

export default function MainPage() {
  const { uuid } = useParams();
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const theme = useContext(ThemeContext);
  const { transactionData, redirectUrl, setRedirectUrl, loading } =
    useContext(DataContext);

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    setCardNumber(value);
    setCardNumberValid(number(value).isValid);
  };

  const setUrlRedirect = (redirectUrl) => {
    setRedirectUrl(redirectUrl);
  };

  useEffect(() => {
    if (redirectUrl) {
      const handleMessage = (event) => {
        if (event.origin === new URL(redirectUrl).origin) {
          console.log("Received message from iframe:", event.data);
          const { url } = event.data;
          if (url) {
            console.log("Navigating to:", url);
            window.location.replace(url);
          }
        }
      };

      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }
  }, [redirectUrl]);

  useEffect(() => {
    if (redirectUrl) {
      const iframe = document.getElementById("payment-iframe");

      const handleIframeLoad = () => {
        try {
          const iframeLocation = iframe.contentWindow.location.href;
          console.log("Iframe loaded with location:", iframeLocation);
          if (iframeLocation.includes("#/result-pay")) {
            window.location.replace(iframeLocation);
          }
        } catch (error) {
          console.error("Error accessing iframe content:", error);
        }
      };

      iframe.addEventListener("load", handleIframeLoad);
      return () => iframe.removeEventListener("load", handleIframeLoad);
    }
  }, [redirectUrl]);

  if (loading) {
    return (
      <div className="loader-block">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="App">
        {!redirectUrl ? (
          <>
            <div
              className="order-info-block"
              style={isMobile() ? { marginTop: "0" } : {}}
            >
              <TransactionInfo transactionData={transactionData} />
            </div>
            <PaymentForm
              setUrlRedirect={setUrlRedirect}
              uuid={uuid}
              transaction={transactionData}
              cardNumber={cardNumber}
              onCardNumberChange={handleCardNumberChange}
              cardNumberValid={cardNumberValid}
            />
          </>
        ) : (
          <iframe
            id="payment-iframe"
            src={redirectUrl}
            title="Payment Redirect"
          />
        )}
        <div className="logo">
          <img src={theme === "dark" ? logoDark : logoLight} alt="WATA" />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
