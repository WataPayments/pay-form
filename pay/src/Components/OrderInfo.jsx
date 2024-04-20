import React, { useContext } from "react";
import "../Styles/OrderInfoStyle.css";
import Done from "../Images/Alert icon.svg";
import Error from "../Images/Alert2 icon.svg";
import OrderContext from "../OrderCotext";

export default function OrderInfo() {
    const { isActivate, setIsActivate } = useContext(OrderContext);

    return (
        <div className={"order-info-block"}>
            <div className={`result-pay ${isActivate ? 'result-pay.active' : ''}`}>
                <img src={Done} alt="Result-pay" />
                <p>Вы успешно оплатили счет!</p>
            </div>
            <div className={"price-and-number-order"}>
                <p className={"price"}>5 790,00 ₽</p>
                <p className={"number"}>№4125678</p>
            </div>
            <div className={"link-and-info-order"}>
                <a href={"http://ooo/"}>www.biolife.com</a>
                <p>Оплата бадов из США</p>
            </div>
            <div className={`submit-button-result ${isActivate ? 'submit-button-result.active' : ''}`}>
                <input type="submit" value="Поделиться" />
            </div>
        </div>
    );
}
