import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./index.css";
import logo from "./Images/Logo.svg";
import PaymentFormDetails from "./Components/PaymentFormDetails";
import PaymentForm from "./Components/PaymentForm";
import SuccessPage from "./Components/SuccessPage";
import ErrorPage from "./Components/ErrorPage";
import { number } from 'card-validator';
import ApiClient from './ApiClient';

export default function App() {
    const location = useLocation();
    const { uuid } = useParams();
    const [transactionData, setTransactionData] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(true);
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberValid, setCardNumberValid] = useState(false);
    const [showIframe, setShowIframe] = useState(false);
    const [loading, setLoading] = useState(true);
    const [transactionUuid, setTransactionUuid] = useState(null);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const data = await ApiClient.fetchTransactionData(uuid);
                setTransactionData(data);
                setRedirectUrl(data.url_redirect);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };

        fetchTransaction();
    }, [uuid]);

    useEffect(() => {
        if (redirectUrl && (redirectUrl.includes("success-pay") || redirectUrl.includes("error-pay"))) {
            const urlParams = new URLSearchParams(location.search);
            const transactionUuid = urlParams.get("transaction_uuid");
            setTransactionUuid(transactionUuid);
            setShowPaymentForm(false);
        } else {
            setShowIframe(true);
        }
    }, [redirectUrl, location]);

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        setCardNumber(value);
        setCardNumberValid(number(value).isValid);
    };

    if (loading) {
        return <div></div>;
    }

    return (
        <div className="App">
            {redirectUrl && redirectUrl.includes("success-pay") && (
                <SuccessPage transaction={transactionData} transactionUuid={transactionUuid} />
            )}
            {redirectUrl && redirectUrl.includes("error-pay") && (
                <ErrorPage transaction={transactionData} transactionUuid={transactionUuid} />
            )}
            {showIframe && redirectUrl && (
                <iframe src={redirectUrl} title="Payment Redirect" />
            )}
            {showPaymentForm && (
                <>
                    <PaymentFormDetails transaction={transactionData} />
                    <PaymentForm
                        uuid={uuid}
                        transaction={transactionData}
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
