import React, {useState} from "react";
import "../Styles/OrderAddCartStyle.css";
import SBPDefault from "../Images/SBP button.svg";
import SBPSmall from "../Images/SBP button small.svg";

export default function OrderAddCart() {
    const [cardNumber, setCardNumber] = useState("");
    const [cardType, setCardType] = useState("unknown");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [expiryDateError, setExpiryDateError] = useState("");
    const [cvvError, setCvvError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isActivate, setIsActivate] = useState(false);

    const handleCardNumberChange = (event) => {
        let inputCardNumber = event.target.value.replace(/\s/g, "");

        if (!inputCardNumber.startsWith("2")) {
            inputCardNumber = "";
        }

        setCardNumber(inputCardNumber);

        let newCardType = "unknown";
        const firstDigit = inputCardNumber.charAt(0);

        switch (firstDigit) {
            case '2':
                newCardType = "Мир";
                break;
            case '3':
                newCardType = "American Express";
                break;
            case '4':
                newCardType = "Visa";
                break;
            case '5':
                newCardType = "Mastercard";
                break;
            case '6':
                newCardType = "China UnionPay";
                break;
            case '7':
                newCardType = "Универсальная электронная карта";
                break;
            default:
                newCardType = "unknown";
        }

        setCardType(newCardType);
    };

    const formatCardNumber = (value) => {
        return value.replace(/\s?(\d{4})/g, '$1 ').trim();
    };

    const handleExpiryDateChange = (event) => {
        const inputExpiryDate = event.target.value;
        let formattedExpiryDate = inputExpiryDate;

        if (/^\d{0,2}\/?\d{0,2}$/.test(inputExpiryDate)) {
            if (inputExpiryDate.length === 2 && !inputExpiryDate.includes("/")) {
                formattedExpiryDate = inputExpiryDate + "/";
            } else if (inputExpiryDate.length === 3 && inputExpiryDate.charAt(2) !== "/") {
                formattedExpiryDate = inputExpiryDate.slice(0, 2) + "/" + inputExpiryDate.charAt(2);
            }
            setExpiryDate(formattedExpiryDate);
        }
    };

    const handleCvvChange = (event) => {
        const inputCvv = event.target.value;
        setCvv(inputCvv.replace(/\D/g, '').slice(-3));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let isValid = true;

        if (!cardNumber) {
            setCardNumberError("error");
            isValid = false;
        } else {
            setCardNumberError("");
        }

        if (!expiryDate) {
            setExpiryDateError("error");
            isValid = false;
        } else {
            setExpiryDateError("");
        }

        if (!cvv) {
            setCvvError("error");
            isValid = false;
        } else {
            setCvvError("");
        }

        if (isValid) {
            setIsSubmitted(true);
            setIsActivate(true);
        }
    };

    return (
        <>
            {isSubmitted ? null : (
                <div className={"order-add-cart-block"}>
                    <form onSubmit={handleSubmit}>
                        <a>
                            <img src={SBPDefault} className={"big-image"} alt="Адаптивное изображение"/>
                            <img src={SBPSmall} alt="Адаптивное изображение" className="small-image"/>
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
                                    value={formatCardNumber(cardNumber)}
                                    onChange={handleCardNumberChange}
                                    maxLength={19}
                                    data-card-type={cardType}
                                    inputMode="numeric"
                                    className={cardNumberError ? "error" : ""}
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
                                    inputMode="numeric"
                                    className={expiryDateError ? "error" : ""}
                                />
                                <input
                                    type="password"
                                    id="cvv"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    maxLength={3}
                                    inputMode="numeric"
                                    className={cvvError ? "error" : ""}
                                />
                            </div>
                        </div>

                        <div className={"submit-button"}>
                            <input type="submit" value="Оплатить 5 789,00 ₽"/>
                        </div>
                    </form>
                    <div className={"accept-text"}>
                        <p>Совершая оплату, вы соглашаетесь с договором <a href="">оферты</a></p>
                    </div>
                </div>
            )}
        </>
    );
}