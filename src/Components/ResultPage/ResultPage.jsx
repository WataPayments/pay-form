import React, { useContext, useEffect, useMemo, useState } from "react";

import logoDark from "../../Images/Logo.svg";
import logoLight from "../../Images/LogoLight.svg";
import SuccessPay from "../../Images/SuccessPay.svg";
import PendingPay from "../../Images/PendingPay.svg";
import RefundedPay from "../../Images/RefundedPay.svg";
import FailPay from "../../Images/FailPay.svg";

import { ThemeContext, DataContext } from "../../App";

import "./styles.css";
import isMobile from "is-mobile";
import { TransactionInfo } from "../TransactionInfo/TransactionInfo";
import { sendGaEvent } from "../../utils/ga";

const pageInfo = {
  Paid: {
    title: "Успешный платеж",
    icon: SuccessPay,
  },
  Pending: {
    title: "В обработке",
    icon: PendingPay,
  },
  Expired: {
    title: "Просроченная транзакция",
    icon: PendingPay,
  },
  Refunded: {
    title: "Возврат осуществлен",
    icon: RefundedPay,
  },
  Failed: {
    title: "Ошибка",
    icon: FailPay,
  },
  Created: {
    title: "",
    icon: "",
  },
};

export const ResultPage = () => {
  const theme = useContext(ThemeContext);
  const [showTooltip, toggleTooltip] = useState(false);
  const { transactionData, loading } = useContext(DataContext);
  const [countdownValue, setCountdownValue] = useState(5);
  const [intervalId, setIntervalId] = useState(null);

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

    toggleTooltip((prev) => !prev);
    setTimeout(() => {
      toggleTooltip((prev) => !prev);
    }, 2000);
  };

  const pageLogo = useMemo(() => {
    if (transactionData) {
      return pageInfo[transactionData.status].icon;
    }
  }, [transactionData]);

  const pageTitle = useMemo(() => {
    if (transactionData) {
      return pageInfo[transactionData.status].title;
    }
  }, [transactionData]);

  useEffect(() => {
    if (
      transactionData &&
      transactionData.status === "Paid" &&
      transactionData.success_url &&
      intervalId === null
    ) {
      const intervalId = setInterval(() => {
        setCountdownValue((prev) => prev - 1);
      }, 1000);

      setIntervalId(intervalId);
    }
  }, [transactionData, intervalId]);

  useEffect(() => {
    if (transactionData) {
      sendGaEvent(`PaymentComplete_${transactionData.status.toLowerCase()}`, {
        transaction_id: transactionData.uuid,
        payment_method: transactionData.methods,
      });
    }
  }, [transactionData]);

  useEffect(() => {
    if (
      countdownValue === 0 &&
      transactionData &&
      transactionData.success_url
    ) {
      clearInterval(intervalId);
      window.location.href = transactionData.success_url;
    }
  }, [countdownValue, intervalId, transactionData]);

  const pluralazied = useMemo(() => {
    if (countdownValue === 0 || countdownValue === 5) {
      return "секунд";
    }

    if (countdownValue === 1) {
      return "секунду";
    }

    return "секунды";
  }, [countdownValue]);

  if (loading) {
    return (
      <div className={`loader-block ${theme}`}>
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div
      className="result-container"
      style={isMobile() ? { marginTop: "20px" } : {}}
    >
      <div className={`result-block ${theme}`}>
        <div className="page-title">
          <img src={pageLogo} alt="Result-pay" />
          <p>{pageTitle}</p>
        </div>
        {transactionData && transactionData.status === "Pending" && (
          <div className="pending-transaction">
            <div className="pending-title">Возможные причины:</div>
            <ul className="reasons">
              <li>На карте недостаточно средств</li>
              <li>Неправильно указаны реквизиты</li>
              <li>Ошибка банка-эквайера</li>
            </ul>

            <div className="alert">
              Если у вас списались средства с карты, значит все прошло успешно,
              но банк не успел обработать транзакцию
            </div>
          </div>
        )}
        <div className="divider"></div>
        <TransactionInfo transactionData={transactionData} />
        {transactionData && transactionData.status === "Paid" ? (
          transactionData.success_url ? (
            <div className="countdown">
              Вы будете перенаправлены обратно в магазин через {countdownValue}{" "}
              {pluralazied}...
            </div>
          ) : (
            <div className="button-container">
              <div className={`submit-button-result ${theme}`}>
                <input type="button" value="Поделиться" onClick={handleShare} />
              </div>
              {showTooltip && !isMobile() && (
                <div className="tooltip">Ссылка скопирована</div>
              )}
            </div>
          )
        ) : null}
      </div>
      <div className={`logo ${theme}`}>
        <img src={theme === "dark" ? logoDark : logoLight} alt="WATA" />
      </div>
    </div>
  );
};
