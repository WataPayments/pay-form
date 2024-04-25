import React, { useContext } from "react";
import "../Styles/PaymentFormDetailsStyle.css";
export default function PaymentFormDetails() {

    return (
        <div className={"order-info-block"}>
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
