import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const { uuid } = useParams();
    const [transactionData, setTransactionData] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(true);
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberValid, setCardNumberValid] = useState(false);
    const [showIframe, setShowIframe] = useState(false);
    const [loading, setLoading] = useState(true);
    const [transactionUuid, setTransactionUuid] = useState(null);
    const [urlRedirectNull, setUrlRedirectNull] = useState(false);
    const [showErrorPage, setShowErrorPage] = useState(false);

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const { transactionData, redirectUrl } = await ApiClient.fetchTransactionData(uuid);
                setTransactionData(transactionData);
                setRedirectUrl(redirectUrl);
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
            setShowErrorPage(redirectUrl.includes("error-pay"));
        } else if (redirectUrl) {
            setUrlRedirectNull(false);
            setShowIframe(true);
        } else if (urlRedirectNull) {
            setShowPaymentForm(false);
            setShowIframe(false);
            setShowErrorPage(true);
            navigate(`/error-pay/${uuid}`);
        } else {
            setShowPaymentForm(true);
            setShowIframe(false);
        }
    }, [redirectUrl, location, urlRedirectNull, navigate, uuid]);

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        setCardNumber(value);
        setCardNumberValid(number(value).isValid);
    };

    const handleRedirect = (url) => {
        setRedirectUrl(url);
        setUrlRedirectNull(url === null);
        if (url === null) {
            setShowPaymentForm(false);
            setShowIframe(false);
            setShowErrorPage(true);
            navigate(`/error-pay/${uuid}`);
        }
    };

    const handleRetryPayment = () => {
        setUrlRedirectNull(false);
        setShowErrorPage(false);
        navigate(`/${uuid}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            {redirectUrl && redirectUrl.includes("success-pay") && (
                <SuccessPage transaction={transactionData} transactionUuid={transactionUuid} />
            )}
            {redirectUrl && redirectUrl.includes("error-pay") && (
                <ErrorPage
                    transaction={transactionData}
                    transactionUuid={transactionUuid}
                    onRetry={handleRetryPayment}
                />
            )}
            {showIframe && redirectUrl && (
                <iframe src={redirectUrl} title="Payment Redirect" />
            )}
            {showPaymentForm && !showErrorPage && (
                <>
                    <PaymentFormDetails transaction={transactionData} />
                    <PaymentForm
                        uuid={uuid}
                        transaction={transactionData}
                        cardNumber={cardNumber}
                        onCardNumberChange={handleCardNumberChange}
                        cardNumberValid={cardNumberValid}
                        onRedirect={handleRedirect}
                    />
                </>
            )}
            <div className="logo">
                <img src={logo} alt="WATA" />
            </div>
        </div>
    );
}
