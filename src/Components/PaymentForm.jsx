import React, { useState, useRef } from "react";
import axios from "axios";
import "../Styles/PaymentFormStyle.css";
import SBP from "../Images/Vector.svg";
import eyeVisibleIcon from "../Images/Visibility_off.svg";
import eyeHiddenIcon from "../Images/Visibility.svg";
import MIR from "../Images/Logo=Mir.svg";
import Overlay from "./Overlay";

const PaymentForm = (props) => {
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
    const [showOverlay, setShowOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOverlayToggle = () => {
        setShowOverlay(!showOverlay);
    };

    const detectCardType = (inputCardNumber) => {
        setCardType(inputCardNumber.startsWith("2") ? "mir" : "");
    };

    const handleCardNumberChange = (event) => {
        let inputCardNumber = event.target.value.replace(/\D/g, '');

        if (!inputCardNumber.startsWith("2")) {
            inputCardNumber = "";
        }

        detectCardType(inputCardNumber);

        inputCardNumber = inputCardNumber.replace(/(\d{4})/g, '$1 ').trim();

        setCardNumber(inputCardNumber);

        if (inputCardNumber.length === 19) {
            setCardNumberError(false);
            expiryDateRef.current.focus();
        } else {
            setCardNumberError(true);
        }
    };

    const handleExpiryDateChange = (event) => {
        let inputExpiryDate = event.target.value.replace(/\D/g, '');

        if (inputExpiryDate.length > 4) {
            inputExpiryDate = inputExpiryDate.slice(0, 4);
        }

        if (inputExpiryDate.length > 2) {
            inputExpiryDate = inputExpiryDate.slice(0, 2) + '/' + inputExpiryDate.slice(2);
        }

        // Ограничение месяца до максимального значения 12
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
        let inputCvv = event.target.value.replace(/\D/g, '').slice(0, 3);
        setCvv(inputCvv);
        setCvvError(false);
    };

    const handleCvvKeyDown = (event) => {
        if (event.key === 'Backspace') {
            setCvv(prevCvv => prevCvv.slice(0, -1));
        } else if (event.target.value.length === 3) {
            document.getElementById("submitButton").focus();
            document.getElementById("submitButton").blur();
        }
    };

    const toggleCvvVisibility = () => {
        setCvvVisible(!cvvVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        let isValid = true;

        if (!/^2\d{15}$/.test(cardNumber.replace(/\s/g, ''))) {
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
                const response = await axios.post("https://acquiring.foreignpay.ru/webhook/front/card_into", {
                    uuid: props.uuid, // Передайте ваш UUID здесь
                    card_number: cardNumber.replace(/\s/g, ''),
                    month: expiryDate.slice(0, 2),
                    year: formattedYear,
                    cvc: cvv
                });

                console.log("Данные успешно отправлены:", response.data);

                if (response.data.url_redirect) {
                    props.onRedirect(response.data.url_redirect);
                }
            } catch (error) {
                console.error("Ошибка при отправке данных:", error);
            }

            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div className="order-add-cart-block">
            <form onSubmit={handleSubmit}>
                <a>
                    <img src={SBP} className="big-image" alt="SBP"/>
                </a>

                <div className="add-cart-block">
                    <div className="label-text">
                        <p>Для оплаты доступны карты МИР</p>
                    </div>
                    <div className="card-number-container">
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="Введите номер карты"
                            inputMode="numeric"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            className={`${cardNumberError ? "error" : ""}`}
                        />
                        {cardType === "mir" && (
                            <img src={MIR} className="card-type-icon" alt="МИР"/>
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
                        <div className="toggle-cvv-visibility-container" onClick={toggleCvvVisibility}>
                            <img
                                src={cvvVisible ? eyeVisibleIcon : eyeHiddenIcon}
                                alt="Toggle CVV Visibility"
                                className="toggle-cvv-visibility"
                                style={{position: "absolute", right: "20px", bottom: "15px"}}
                            />
                        </div>
                    </div>
                </div>

                <div className="submit-button">
                    <input
                        id="submitButton"
                        type="submit"
                        value={isLoading ? "\u25A0 \u25A0 \u25A0" : `Оплатить ${props.transaction.amount} ₽`}
                        // value={isLoading ? "\u25A0 \u25A0 \u25A0" : `Оплатить 5000₽`}
                        className={isLoading ? "submit-loading" : ""}
                    />
                </div>
            </form>
            <div className="accept-text">
                <p>
                    Оплачивая, вы соглашаетесь с договором{" "}
                    <a href="#" onClick={handleOverlayToggle}>
                        оферты
                    </a>
                </p>
            </div>
            {showOverlay && <Overlay onClose={handleOverlayToggle}/>}
        </div>
    );
};

export default PaymentForm;
