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
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(true);
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberValid, setCardNumberValid] = useState(false);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const data = await ApiClient.fetchTransactionData("2119c062-7db5-41c2-a5ec-e051c01705d3");
                setTransactionData(data);
                setRedirectUrl(data.url_redirect);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };

        fetchTransaction();
    }, []);

    useEffect(() => {
        if (redirectUrl && (redirectUrl.includes("success-pay") || redirectUrl.includes("error-pay"))) {
            setShowPaymentForm(false);
        }
    }, [redirectUrl]);

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        setCardNumber(value);
        setCardNumberValid(number(value).isValid);
    };

    return (
        <div className="App">
            {redirectUrl && redirectUrl.includes("success-pay") && <SuccessPage transaction={transactionData}/>}
            {redirectUrl && redirectUrl.includes("error-pay") && <ErrorPage transaction={transactionData}/>}
            {showPaymentForm && (
                <>
                    <PaymentFormDetails transaction={transactionData} />
                    <PaymentForm
                        cardNumber={cardNumber}
                        onCardNumberChange={handleCardNumberChange}
                        cardNumberValid={cardNumberValid}
                    />
                </>
            )}
            <div className="logo">
                <img src={logo} alt="WATA" />
            </div>
        </div>
    );
}
