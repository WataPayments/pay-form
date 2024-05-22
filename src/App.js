import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";
import logo from "./Images/Logo.svg";
import PaymentFormDetails from "./Components/PaymentFormDetails";
import PaymentForm from "./Components/PaymentForm";
import { number } from 'card-validator';
import ApiClient from './ApiClient';

export default function App() {
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [transactionData, setTransactionData] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState("");
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberValid, setCardNumberValid] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const { transactionData, redirectUrl } = await ApiClient.fetchTransactionData(uuid);
                setTransactionData(transactionData);
                setRedirectUrl(redirectUrl);
                setLoading(false);

                if (transactionData.status === "Pending") {
                    navigate(`/error-pay/${uuid}`);
                }
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };

        fetchTransaction();
    }, [uuid, navigate]);

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        setCardNumber(value);
        setCardNumberValid(number(value).isValid);
    };

    const setUrlRedirect = (redirectUrl) => {
        setRedirectUrl(redirectUrl);
    };

    useEffect(() => {
        if (redirectUrl) {
            const iframe = document.getElementById("payment-iframe");
            const handleMessage = (event) => {
                if (event.origin === window.location.origin) {
                    const { status, url } = event.data;
                    if (status === 'success' || status === 'error') {
                        iframe.style.display = "none";
                        navigate(url);
                    }
                }
            };
            window.addEventListener("message", handleMessage);
            return () => window.removeEventListener("message", handleMessage);
        }
    }, [redirectUrl, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            {!redirectUrl ? (
                <div>
                    <PaymentFormDetails transaction={transactionData}/>
                    <PaymentForm
                        setUrlRedirect={setUrlRedirect}
                        uuid={uuid}
                        transaction={transactionData}
                        cardNumber={cardNumber}
                        onCardNumberChange={handleCardNumberChange}
                        cardNumberValid={cardNumberValid}
                    />
                </div>
            ) : (
                <iframe id="payment-iframe" src={redirectUrl} title="Payment Redirect"/>
            )}
            <div className="logo">
                <img src={logo} alt="WATA"/>
            </div>
        </div>
    );
}
