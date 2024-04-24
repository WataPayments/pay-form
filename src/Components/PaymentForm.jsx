import React, { useState, useRef } from "react";
import "../Styles/PaymentFormStyle.css";
import SBP from "../Images/Vector.svg";

export default function PaymentForm() {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [expiryDateError, setExpiryDateError] = useState("");
    const [cvvError, setCvvError] = useState("");
    const [isErrorActive, setIsErrorActive] = useState(false);
    const expiryDateRef = useRef(null);
    const cvvRef = useRef(null);

    const handleCardNumberChange = (event) => {
        let inputCardNumber = event.target.value.replace(/\D/g, '');

        if (!inputCardNumber.startsWith("2")) {
            inputCardNumber = "";
        }

        inputCardNumber = inputCardNumber.replace(/(\d{4})/g, '$1 ').trim();

        setCardNumber(inputCardNumber);

        if (inputCardNumber.length === 19) {
            expiryDateRef.current.focus();
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

        setExpiryDate(inputExpiryDate);

        if (inputExpiryDate.length === 5) {
            cvvRef.current.focus();
        }
    };

    const handleCvvChange = (event) => {
        let inputCvv = event.target.value.replace(/\D/g, '');

        if (inputCvv.length > 3) {
            inputCvv = inputCvv.slice(0, 3);
        }

        setCvv(inputCvv);
    };

    const handleInputFocus = (event) => {
        if (event.target.classList.contains("error")) {
            event.target.classList.add("errorFocused");
        }
    };

    const handleInputBlur = (event) => {
        if (event.target.classList.contains("error")) {
            event.target.classList.remove("errorFocused");
        }
    };

    const handleCvvKeyDown = (event) => {
        if (event.target.value.length === 3) {
            document.getElementById("submitButton").focus();
            document.getElementById("submitButton").blur();
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        let isValid = true;

        if (!/^2\d{15}$/.test(cardNumber.replace(/\s/g, ''))) {
            setCardNumberError("error");
            setIsErrorActive(true);
            isValid = false;
        } else {
            setCardNumberError("");
        }

        if (!expiryDate) {
            setExpiryDateError("error");
            setIsErrorActive(true);
            isValid = false;
        } else {
            setExpiryDateError("");
        }

        if (!cvv) {
            setCvvError("error");
            setIsErrorActive(true);
            isValid = false;
        } else {
            setCvvError("");
        }

        if (isValid) {
            console.log("Данные готовы к отправке:", cardNumber, expiryDate, cvv);
        }
    };

    return (
        <div className={"order-add-cart-block"}>
            <form onSubmit={handleSubmit}>
                <a>
                    <img src={SBP} className={"big-image"} alt="SBP"/>
                </a>

                <div className={"add-cart-block"}>
                    <div className={"label-text"}>
                        <p>Для оплаты доступны карты МИР</p>
                    </div>
                    <div className={"card-number-container"}>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="Введите номер карты"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className={`${cardNumberError} ${isErrorActive && cardNumberError ? "active" : ""}`}
                        />
                    </div>

                    <div className={"cvv-container"}>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="ММ/ГГ"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            maxLength={5}
                            ref={expiryDateRef}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className={`${expiryDateError} ${isErrorActive && expiryDateError ? "active" : ""}`}
                        />
                        <input
                            type="password"
                            id="cvv"
                            name="cvv"
                            placeholder="CVV"
                            value={cvv}
                            onChange={handleCvvChange}
                            maxLength={3}
                            ref={cvvRef}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            onKeyDown={handleCvvKeyDown}
                            className={`${cvvError} ${isErrorActive && cvvError ? "active" : ""}`}
                        />
                    </div>
                </div>

                <div className={"submit-button"}>
                    <input id="submitButton" type="submit" value="Оплатить 5 789,00 ₽"/>
                </div>
            </form>
            <div className={"accept-text"}>
                <p>Оплачивая, вы соглашаетесь с договором <a href="">оферты</a></p>
            </div>
        </div>
    );
}
