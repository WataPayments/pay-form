import React, { useState, useEffect } from "react";
import "./index.css";
import logo from "./Images/Logo.svg";
import PaymentFormDetails from "./Components/PaymentFormDetails";
import PaymentForm from "./Components/PaymentForm";
import SuccessPage from "./Components/SuccessPage";
import ErrorPage from "./Components/ErrorPage";
import { number } from 'card-validator';
import ApiClient from './ApiClient';

export default function App() {
    const [transactionData, setTransactionData] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null); // Статус оплаты: success, error или null
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberValid, setCardNumberValid] = useState(false);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const data = await ApiClient.fetchTransactionData("872ce593-bf1b-4d4d-8223-e83ead495c14");
                setTransactionData(data);
                if (data.url_redirect) {
                    // Если есть url_redirect, отображаем его в iframe
                    window.location.href = data.url_redirect;
                } else {
                    // Если url_redirect null, отображаем ErrorPage
                    setPaymentStatus("error");
                }
            } catch (error) {
                console.error("Error fetching transaction data:", error);
                // Если произошла ошибка при получении данных, отображаем ErrorPage
                setPaymentStatus("error");
            }
        };

        fetchTransaction();
    }, []);

    useEffect(() => {
        // Обработка изменений URL в iframe
        const handleIframeNavigation = () => {
            const currentUrl = window.location.href;
            if (currentUrl.includes("success-pay")) {
                setPaymentStatus("success");
            } else if (currentUrl.includes("error-pay")) {
                setPaymentStatus("error");
            }
        };

        window.addEventListener("popstate", handleIframeNavigation);

        return () => {
            window.removeEventListener("popstate", handleIframeNavigation);
        };
    }, []);

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        setCardNumber(value);
        setCardNumberValid(number(value).isValid);
    };

    // Функция для отображения соответствующей страницы в зависимости от статуса оплаты
    const renderPaymentPage = () => {
        if (paymentStatus === "success") {
            return <SuccessPage transaction={transactionData} />;
        } else if (paymentStatus === "error") {
            return <ErrorPage transaction={transactionData} />;
        } else {
            return null;
        }
    };

    return (
        <div className="App">
            {renderPaymentPage()}
            <PaymentFormDetails transaction={transactionData} />
            <PaymentForm
                transaction={transactionData}
                cardNumber={cardNumber}
                onCardNumberChange={handleCardNumberChange}
                cardNumberValid={cardNumberValid}
            />
            <div className="logo">
                <img src={logo} alt="WATA" />
            </div>
        </div>
    );
}
