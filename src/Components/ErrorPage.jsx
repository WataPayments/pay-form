import React from "react";
import Error from "../Images/Alert2 icon.svg";
import '../Styles/ErrorPageStyle.css';

export default function ErrorPage(){
    return (
        <div className={"error-block"}>
            <div className={"result-pay"}>
                <img src={Error} alt="Result-pay"/>
                <p>Ошибка оплаты!</p>
            </div>
            <div className={"price-and-number-order"}>
                <p className={"price"}>5 790,00 ₽</p>
                <p className={"number"}>№4125678</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>www.biolife.com</p>
                <p>Оплата бадов из США</p>
            </div>
            <div className={`submit-button-result`}>
                <input type="submit" value="Оплатить еще раз"/>
            </div>

        </div>
    );
}