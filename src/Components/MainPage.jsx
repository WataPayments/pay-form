import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logoDark from "../Images/Logo.svg";
import logoLight from "../Images/LogoLight.svg";
import PaymentFormDetails from "../Components/PaymentFormDetails";
import PaymentForm from "../Components/PaymentForm";
import { number } from "card-validator";
import ApiClient from "../ApiClient";
import "../index.css";
import { ThemeContext } from "../App";

export default function MainPage() {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [transactionData, setTransactionData] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberValid, setCardNumberValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { transactionData, redirectUrl } =
          await ApiClient.fetchTransactionData(uuid);
        setTransactionData(transactionData);
        setRedirectUrl(redirectUrl);
        setLoading(false);

        if (transactionData.status === "Pending") {
          navigate(`/error-pay/${uuid}`);
        } else if (transactionData.status === "Paid") {
          navigate(`/success-pay/${uuid}`);
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransaction();
  }, [uuid, navigate]);

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  //   const handleThemeChange = (event) => {
  //     setTheme(event.matches ? "dark" : "light");
  //   };

  //   setTheme(mediaQuery.matches ? "dark" : "light");
  //   mediaQuery.addEventListener("change", handleThemeChange);

  //   return () => {
  //     mediaQuery.removeEventListener("change", handleThemeChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log(theme);
  //   const applyTheme = async () => {
  //     if (theme === "dark") {
  //       await import("../index.css");
  //     } else if (theme === "light") {
  //       await import("../indexLight.css");
  //     }
  //   };
  //   applyTheme();
  // }, [theme]);

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
          if (
            iframeLocation.includes("#/success-pay") ||
            iframeLocation.includes("#/error-pay")
          ) {
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
          <div>
            <PaymentFormDetails transaction={transactionData} />
            <PaymentForm
              setUrlRedirect={setUrlRedirect}
              uuid={uuid}
              transaction={transactionData}
              cardNumber={cardNumber}
              onCardNumberChange={handleCardNumberChange}
              cardNumberValid={cardNumberValid}
            />
          </div>
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
