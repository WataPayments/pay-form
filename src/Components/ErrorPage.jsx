import React from "react";
import Error from "../Images/Alert2 icon.svg";
import '../Styles/ErrorPageStyle.css';

export default function ErrorPage(props){
    return (
        <div className={"error-block"}>
            <div className={"result-pay"}>
                <img src={Error} alt="Result-pay"/>
                <p>Ошибка оплаты!</p>
            </div>
            <div className={"price-and-number-order"}>
                <p className={"price"}>{props.transaction.amount}</p>
                <p className={"number"}>№{props.transaction.uuid}</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>{props.transaction.agent_name}</p>
                <p>{props.transaction.description}</p>
            </div>
            <div className={`submit-button-result`}>
                <input type="submit" value="Оплатить еще раз"/>
            </div>

        </div>
    );
}