import React, { useState } from "react";
import "../Styles/OrderAddCartStyle.css";
import SBP from "../Images/SBP button big.svg";

export default function OrderAddCart() {
    const [cardNumber, setCardNumber] = useState("");
    const [cardType, setCardType] = useState("unknown");

    const handleCardNumberChange = (event) => {
        const inputCardNumber = event.target.value.replace(/\s/g, ""); // Удаляем все пробелы из ввода
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

    return (
        <div className={"order-add-cart-block"}>
            <div className={"sbp-button"}>
                <a href="http://sbp/payment"><img src={SBP} alt="SBP"/></a>
            </div>
            <div className={"add-cart-block"}>
                <form>
                    <label htmlFor="cardNumber">Для оплаты доступны карты МИР</label>
                    <div className="card-number-container">
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="Введите номер карты"
                            value={formatCardNumber(cardNumber)}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            data-card-type={cardType}
                        />
                    </div>

                    <div className="cvv-container">
                        <input type="text" id="expiryDate" name="expiryDate" placeholder="ММ/ГГ" pattern="\d{2}/\d{2}"maxLength={5}/>
                        <input type="text" id="cvv" name="cvv" placeholder="CVV" maxLength="3"/>
                    </div>

                    <div className={"submit-button"}>
                        <input type="submit" value="Оплатить 5 789,00 ₽"/>
                    </div>
                </form>
            </div>
            <div className={"accept-text"}>
                <p>Совершая оплату, вы соглашаетесь с договором оферты</p>
            </div>
        </div>
    );
}
