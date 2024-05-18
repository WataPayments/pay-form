import React from "react";
import { useParams } from "react-router-dom";
import Error from "../Images/Alert2 icon.svg";
import '../Styles/ErrorPageStyle.css';

export default function ErrorPage(props) {
    const { transaction, onRetry } = props;
    const { uuid } = useParams();

    const queryParams = new URLSearchParams({ transaction_uuid: transaction.uuid });

    return (
        <div className={"error-block"}>
            <div className={"result-pay"}>
                <img src={Error} alt="Result-pay"/>
                <p>Ошибка оплаты!</p>
            </div>
            <div className={"price-and-number-order"}>
                <p className={"price"}>{transaction.amount}</p>
                <p className={"number"}>№{transaction.uuid}</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>{transaction.agent_name}</p>
                <p>{transaction.description}</p>
            </div>
            <div className={`submit-button-result`}>
                <input type="submit" value="Оплатить еще раз" onClick={() => onRetry(uuid)} />
            </div>
        </div>
    );
}
