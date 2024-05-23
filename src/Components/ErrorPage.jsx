import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Error from "../Images/Alert2 icon.svg";
import '../Styles/ErrorPageStyle.css';
import ApiClient from "../ApiClient";
import logo from "../Images/Logo.svg";

export default function ErrorPage(props) {
    // const navigate=useNavigate();
    const { uuid } = useParams();
    const [transactionData, setTransactionData] = useState("");


    // const handleRetryPayment = (uuid) => {
    //     navigate(`/${uuid}`);
    // };


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
        <div>
            <div className={"error-block"}>
                <div className={"result-pay"}>
                    <img src={Error} alt="Result-pay"/>
                    <p>Ошибка оплаты!</p>
                    <div className={"error-reasons"}>
                        <p>Возможные причины:</p>
                        <ul>
                            <li>На карте недостаточно средств</li>
                            <li>Неправильно указаны реквизиты</li>
                            <li>Сессия истекла</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className={"price-and-number-order"}>
                        <p className={"price"}>{transactionData.amount}</p>
                        <p className={"number"}>{/*{transactionData.order_number}*/}</p>
                    </div>
                    <div className={"link-and-info-order"}>
                        <p>{transactionData.agent_name}</p>
                        <p>{transactionData.description}</p>
                    </div>
                </div>
            </div>
            <div className="logo">
                <img src={logo} alt="WATA"/>
            </div>
        </div>
    );
}
