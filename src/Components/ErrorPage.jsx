import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
// import Error from "../Images/Alert2 icon.svg";
import Alert from "../Images/Alert.svg";
import '../Styles/ErrorPageStyle.css';
import  "../Styles/ErrorPageLightStyle.css";
import ApiClient from "../ApiClient";
import logo from "../Images/Logo.svg";

export default function ErrorPage(props) {
    const navigate=useNavigate();
    const { uuid } = useParams();
    const [transactionData, setTransactionData] = useState("");
    const [loading,setLoading]=useState(true);


    // const handleRetryPayment = (uuid) => {
    //     navigate(`/${uuid}`);
    // };


    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await ApiClient.fetchTransactionData(uuid);
                setTransactionData(response.transactionData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
                if (error.response) {
                    if (error.response.status === 404) {
                        navigate("/404");
                    } else if (error.response.status === 500) {
                        navigate("/500");
                    }
                }
            }
        };

        fetchTransaction();
    }, [uuid, navigate]);

    useEffect(() => {
        const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        if (theme === "dark") {
            import("../Styles/ErrorPageStyle.css");
        } else if (theme === "light") {
            import("../Styles/ErrorPageLightStyle.css");
        }
    }, []);


    if (loading) {
        return(<div className={"loader-block"}>
            <span className="loader"></span>
        </div>);
    }

    return (
        <div className={"container"}>
            <div className={"error-block-page"}>
                <div className={"result-pay"}>
                    {/*<img src={Error} alt="Result-pay"/>*/}
                    <img src={Alert} alt="Result-pay"/>
                    <p>В обработке!</p>
                    <div className={"error-reasons"}>
                        <p>Возможные причины:</p>
                        {/*<ul>*/}
                        {/*    <li>На карте недостаточно средств</li>*/}
                        {/*    <li>Неправильно указаны реквизиты</li>*/}
                        {/*    <li>Сессия истекла</li>*/}
                        {/*</ul>*/}
                        <ul>
                            <li>На карте недостаточно средств</li>
                            <li>Неправильно указаны реквизиты</li>
                            <li>Ошибка банка эквайринга</li>
                        </ul>
                        <div className="label-text">
                            <p>Если у вас списались средства с карты, значит все прошло успешно, но банк не успел обработать транзакцию</p>
                        </div>
                    </div>
                </div>
                <div className={"info"}>
                    <div className={"price-and-number-order"}>
                    <p className={"price-info"}>{transactionData.amount} ₽</p>
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
