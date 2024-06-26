import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import SBP from "../Images/Vector.svg";
import eyeVisibleIcon from "../Images/Visibility_off.svg";
import eyeHiddenIcon from "../Images/Visibility.svg";
import MIR from "../Images/Logo=Mir.svg";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import isMobile from "is-mobile";
import "../Styles/PaymentFormStyle.css";
import { ThemeContext } from "../App";
import { sendGaEvent } from "../utils/ga";
import { BanksList } from "./banks-list/BanksList";
import { OfferMobile } from "./offer-mobile/OfferMobile";
import { OfferDesktop } from "./offer-desktop/OfferDesktop";

const PaymentForm = (props) => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryDateError, setExpiryDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [isErrorActive, setIsErrorActive] = useState(false);
  const [cvvVisible, setCvvVisible] = useState(false);
  const [cardType, setCardType] = useState("");
  const expiryDateRef = useRef(null);
  const cvvRef = useRef(null);
  const [showOfferMobile, setShowOfferMobile] = useState(false);
  const [showOfferDesktop, setShowOfferDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBanksList, setShowBanksList] = useState(false);
  const theme = useContext(ThemeContext);

  const handleOpenOfferClick = () => {
    sendGaEvent("OfertaView_PaymentPage", {
      transaction_id: props.transaction.uuid,
      payment_method: props.transaction.methods,
    });

    if (isMobile()) {
      setShowOfferMobile(true);
    } else {
      setShowOfferDesktop(true);
    }
  };

  const detectCardType = (inputCardNumber) => {
    setCardType(inputCardNumber.startsWith("2") ? "mir" : "");
  };

  const handleCardNumberChange = (event) => {
    let inputCardNumber = event.target.value.replace(/\D/g, "");

    if (!inputCardNumber.startsWith("2")) {
      inputCardNumber = "";
    }

    detectCardType(inputCardNumber);

    inputCardNumber = inputCardNumber.replace(/(\d{4})/g, "$1 ").trim();

    setCardNumber(inputCardNumber);

    if (inputCardNumber.length === 19) {
      setCardNumberError(false);
      expiryDateRef.current.focus();
    } else {
      setCardNumberError(true);
    }
  };

  const handleExpiryDateChange = (event) => {
    let inputExpiryDate = event.target.value.replace(/\D/g, "");

    if (inputExpiryDate.length > 4) {
      inputExpiryDate = inputExpiryDate.slice(0, 4);
    }

    if (inputExpiryDate.length > 2) {
      inputExpiryDate =
        inputExpiryDate.slice(0, 2) + "/" + inputExpiryDate.slice(2);
    }

    const month = parseInt(inputExpiryDate.slice(0, 2), 10);
    if (month > 12) {
      inputExpiryDate = "12" + inputExpiryDate.slice(2);
    }

    setExpiryDate(inputExpiryDate);

    if (inputExpiryDate.length === 5) {
      setExpiryDateError(false);
      cvvRef.current.focus();
    } else {
      setExpiryDateError(true);
    }
  };

  const handleCvvInput = (event) => {
    let inputCvv = event.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(inputCvv);
    setCvvError(false);
  };

  const handleCvvKeyDown = (event) => {
    if (event.key === "Backspace") {
      setCvv((prevCvv) => prevCvv.slice(0, -1));
    } else if (event.target.value.length === 3) {
      document.getElementById("submitButton").focus();
      document.getElementById("submitButton").blur();
    }
  };

  const toggleCvvVisibility = () => {
    setCvvVisible(!cvvVisible);
  };

  const handleSubmit = async (event) => {
    sendGaEvent("PaymentStart_CC", { transaction_id: props.transaction.uuid });

    event.preventDefault();
    setIsLoading(true);

    let isValid = true;

    if (!/^2\d{15}$/.test(cardNumber.replace(/\s/g, ""))) {
      setCardNumberError(true);
      setIsErrorActive(true);
      isValid = false;
    } else {
      setCardNumberError(false);
    }

    if (!expiryDate) {
      setExpiryDateError(true);
      setIsErrorActive(true);
      isValid = false;
    } else {
      setExpiryDateError(false);
    }

    if (!cvv) {
      setCvvError(true);
      setIsErrorActive(true);
      isValid = false;
    } else {
      setCvvError(false);
    }

    const currentYear = new Date().getFullYear().toString().slice(0, 2);
    const formattedYear = currentYear + expiryDate.slice(3);

    if (isValid) {
      try {
        const deviceData = {
          browserLanguage: navigator.language,
          browserJavaEnabled: navigator.javaEnabled,
          browserJavaScriptEnabled: true,
          browserColorDepth: window.screen.colorDepth,
          browserScreenHeight: window.innerHeight,
          browserScreenWidth: window.innerWidth,
          browserTZ: new Date().getTimezoneOffset(),
          browserTZName: Intl.DateTimeFormat().resolvedOptions().timeZone,
          challengeWindowHeight: window.innerHeight,
          challengeWindowWidth: window.innerWidth,
        };

        const response = await axios.post(
          "https://acquiring.foreignpay.ru/webhook/front/card_info",
          {
            uuid: props.uuid,
            card_number: parseInt(cardNumber.replace(/\s/g, ""), 10),
            month: expiryDate.slice(0, 2),
            year: formattedYear,
            cvc: cvv,
            email: "stub@stub.com",
            name: "STUB STUB",
            deviceData,
          }
        );

        if (!response.data) {
          navigate(`error-pay/${props.uuid}`);
        }

        if (response.data.url_redirect) {
          props.setUrlRedirect(response.data.url_redirect);
        } else {
          navigate(`/result-pay/${props.uuid}`);
        }
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        navigate(`/result-pay/${props.uuid}`);
      }

      setIsLoading(false);
    } else {
      sendGaEvent("PaymentValidationFail", {
        transaction_id: props.transaction.uuid,
      });
      setIsLoading(false);
    }
  };

  const sbp_payment = async () => {
    sendGaEvent("PaymentStart_SBP", { transaction_id: props.transaction.uuid });
    if (isMobile()) {
      // window.open(props.transaction.sbp_url, "_blank");
      setShowBanksList(true);
    } else {
      navigate(`/sbp-pay/${props.uuid}`);
      return;
    }
  };

  return (
    <div className={`order-add-cart-block ${theme}`}>
      {props.transaction &&
        props.transaction.methods.includes("sbp") &&
        props.transaction.sbp_url && (
          <a className={"sbp-bg"} onClick={sbp_payment}>
            <img src={SBP} className="big-image" alt="SBP" />
          </a>
        )}

      {props.transaction && props.transaction.methods.includes("card") && (
        <form onSubmit={handleSubmit}>
          <div className="add-cart-block">
            <div className="label-text-payment">
              <p>Оплата картой МИР</p>
            </div>
            <div className="card-number-container">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Введите номер карты МИР"
                inputMode="numeric"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                className={`${cardNumberError ? "error" : ""}`}
              />
              {cardType === "mir" && (
                <img src={MIR} className="card-type-icon" alt="МИР" />
              )}
            </div>

            <div className="cvv-container">
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="ММ/ГГ"
                inputMode="numeric"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                maxLength={5}
                ref={expiryDateRef}
                className={`${expiryDateError ? "error" : ""}`}
              />
              <input
                type={cvvVisible ? "text" : "password"}
                id="cvv"
                name="cvv"
                placeholder="CVV"
                inputMode="numeric"
                value={cvv}
                onChange={handleCvvInput}
                maxLength={3}
                ref={cvvRef}
                onKeyDown={handleCvvKeyDown}
                className={`cvv-input ${cvvError ? "error" : ""}`}
              />
              <div
                className="toggle-cvv-visibility-container"
                onClick={toggleCvvVisibility}
              >
                <img
                  src={cvvVisible ? eyeVisibleIcon : eyeHiddenIcon}
                  alt="Toggle CVV Visibility"
                  className="toggle-cvv-visibility"
                  style={{
                    position: "absolute",
                    right: "20px",
                    bottom: "15px",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="submit-button">
            {isLoading && <Loader />}
            <input
              id="submitButton"
              type="submit"
              value={isLoading ? "" : `Оплатить ${props.transaction.amount} ₽`}
              className={isLoading ? "submit-loading" : ""}
            />
          </div>
        </form>
      )}
      <div className="accept-text">
        <p>
          Оплачивая, вы соглашаетесь с договором{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleOpenOfferClick();
            }}
          >
            оферты
          </a>
        </p>
      </div>
      <OfferMobile
        isOpen={showOfferMobile}
        onClose={() => setShowOfferMobile(false)}
      />
      <OfferDesktop
        isOpen={showOfferDesktop}
        onClose={() => setShowOfferDesktop(false)}
      />
      <BanksList
        isOpen={showBanksList}
        onClose={() => setShowBanksList(false)}
      />
    </div>
  );
};

export default PaymentForm;
