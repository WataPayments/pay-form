import React from "react";
import "../Styles/OrderInfoStyle.css";


export default function OrderInfo(){
    return(
        <div className={"order-info-block"}>
            <div className={"price-and-number-order"}>
                <p className={"price"}>5790,00 ₽</p>
                <p className={"number"}>№4125678</p>
            </div>
            <div className={"link-and-info-order"}>
                <a href={"http://ooo/"}>www.biolife.com</a>
                <p>Оплата бадов из США</p>
            </div>
        </div>
    );
}