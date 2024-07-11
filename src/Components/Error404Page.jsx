import React, { useContext, useEffect } from "react";
import logoDark from "../Images/Logo.svg";
import logoLight from "../Images/LogoLight.svg";
import "../Styles/Error404PageStyle.css";
import { ThemeContext, DataContext } from "../App";
import isMobile from "is-mobile";
import { sendGaEvent } from "../utils/ga";
import { useTranslation } from "react-i18next";

export default function Error404Page() {
  const theme = useContext(ThemeContext);
  const { transactionData } = useContext(DataContext);

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "https://wata.pro/";
  };

  const { t } = useTranslation();

  useEffect(() => {
    if (transactionData) {
      sendGaEvent("PaymentComplete_500", {
        transaction_id: transactionData.uuid,
        payment_method: transactionData.methods,
      });
    }
  }, [transactionData]);

  return (
    <div
      className="error-contaier"
      style={isMobile() ? { marginTop: "20px" } : {}}
    >
      <div className="error-block">
        <div className="error-title">404</div>
        <div className="error-message">{t("error_page-404")}</div>
        <form action="">
          <input
            type="submit"
            value={t("error_page-home")}
            onClick={handleClick}
          />
        </form>
      </div>
      <div className="logo">
        <img src={theme === "dark" ? logoDark : logoLight} alt="WATA" />
      </div>
    </div>
  );
}
