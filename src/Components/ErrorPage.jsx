import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Error from "../Images/Alert2 icon.svg";
import '../Styles/ErrorPageStyle.css';
import ApiClient from "../ApiClient";

export default function ErrorPage(props) {
    const navigate=useNavigate();
    const { uuid } = useParams();
    const [transactionData, setTransactionData] = useState("");


    const handleRetryPayment = (uuid) => {
        navigate(`/${uuid}`);
    };


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
        <div className={"error-block"}>
            <div className={"result-pay"}>
                <img src={Error} alt="Result-pay"/>
                <p>Ошибка оплаты!</p>
            </div>
            <div className={"price-and-number-order"}>
                <p className={"price"}>{transactionData.amount}</p>
                <p className={"number"}>№{transactionData.order_number}</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>{transactionData.agent_name}</p>
                <p>{transactionData.description}</p>
            </div>
            <div className={`submit-button-result`}>
                <input type="submit" value="Оплатить еще раз" onClick={() => handleRetryPayment(uuid)} />
            </div>
        </div>
    );
}
