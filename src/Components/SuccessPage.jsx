import React from "react";
import Done from "../Images/Alert icon.svg";
import '../Styles/SuccessPageStyle.css';

export default function SuccessPage(props) {
    const { transaction, transactionUuid } = props;

    return (
        <div className={"sucsess-block"}>
            <div className={"result-pay"}>
                <img src={Done} alt="Result-pay"/>
                <p>Вы успешно оплатили счет!</p>
            </div>
            <div className={"price-and-number-order"}>
                <p className={"price"}>{transaction.amount}</p>
                <p className={"number"}>№{transactionUuid}</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>{transaction.agent_name}</p>
                <p>{transaction.description}</p>
            </div>
            <div className={`submit-button-result`}>
                <input type="submit" value="Поделиться"/>
            </div>

        </div>
    );
}