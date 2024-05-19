import React, {useEffect, useState} from "react";
import Done from "../Images/Alert icon.svg";
import '../Styles/SuccessPageStyle.css';
import ApiClient from "../ApiClient";
import {useParams} from "react-router-dom";

export default function SuccessPage(props) {
    const [transactionData, setTransactionData] = useState(null);
    const { uuid } = useParams();


    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const { transactionData} = await ApiClient.fetchTransactionData(uuid);
                setTransactionData(transactionData);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };

        fetchTransaction();
    }, [uuid]);
    return (
        <div className={"sucsess-block"}>
            <div className={"result-pay"}>
                <img src={Done} alt="Result-pay"/>
                <p>Вы успешно оплатили счет!</p>
            </div>
            <div className={"price-and-number-order"}>
                <p className={"price"}>{transactionData.amount}</p>
                <p className={"number"}>{transactionData.order_number}</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>{transactionData.agent_name}</p>
                <p>{transactionData.description}</p>
            </div>
            <div className={`submit-button-result`}>
                <input type="submit" value="Поделиться"/>
            </div>

        </div>
    );
}