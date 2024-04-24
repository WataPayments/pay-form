import React, { useContext } from "react";
import "../Styles/PaymentFormDetailsStyle.css";
import Done from "../Images/Alert icon.svg";
import Error from "../Images/Alert2 icon.svg";
import OrderContext from "../PaymentContext";

export default function PaymentFormDetails() {
    const { isActivate, setIsActivate } = useContext(OrderContext);

    return (
        <div className={"order-info-block"}>
            <div className={"result-pay"}>
                <img src={Done} alt="Result-pay" />
                <p>Вы успешно оплатили счет!</p>
            </div>
            <div className={"price-and-number-order"}>
                <p className={"price"}>5 790,00 ₽</p>
                <p className={"number"}>№4125678</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>www.biolife.com</p>
                <p>Оплата бадов из США</p>
            </div>
        </div>
    );
}
