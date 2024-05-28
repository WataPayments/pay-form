import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import SBP from "../Images/Vector.svg";
import eyeVisibleIcon from "../Images/Visibility_off.svg";
import eyeHiddenIcon from "../Images/Visibility.svg";
import MIR from "../Images/Logo=Mir.svg";
import Overlay from "./Overlay";
import { useNavigate, useParams } from "react-router-dom";
import ApiClient from "../ApiClient";
import Loader from "./Loader";
import "../Styles/PaymentFormLightStyle.css";
import "../Styles/PaymentFormStyle.css";

const PaymentForm = (props) => {
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardNumberError, setCardNumberError] = useState(false);
    const [expiryDateError, setExpiryDateError] = useState(false);
    const [cvvError, setCvvError] = useState(false);
    const [isErrorActive, setIsErrorActive] = useState(false);
    const [cvvVisible, setCvvVisible] = useState(false);
    const [cardType, setCardType] = useState("");
    const expiryDateRef = useRef(null);
    const cvvRef = useRef(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionData, setTransactionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { uuid } = useParams();
    const [theme, setTheme] = useState('');

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
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(mediaQuery.matches ? 'dark' : 'light');

        const handleThemeChange = (event) => {
            setTheme(event.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            import('../Styles/PaymentFormStyle.css');
        } else if (theme === 'light') {
            import('../Styles/PaymentFormLightStyle.css');
        }
    }, [theme]);

    const handleOverlayToggle = () => {
        setShowOverlay(!showOverlay);
    };

    const detectCardType = (inputCardNumber) => {
        setCardType(inputCardNumber.startsWith("2") ? "mir" : "");
    };

    const handleCardNumberChange = (event) => {
        let inputCardNumber = event.target.value.replace(/\D/g, "");

        if (!inputCardNumber.startsWith("2")) {
            inputCardNumber = "";
        }

        detectCardType(inputCardNumber);

        inputCardNumber = inputCardNumber.replace(/(\d{4})/g, "$1 ").trim();

        setCardNumber(inputCardNumber);

        if (inputCardNumber.length === 19) {
            setCardNumberError(false);
            expiryDateRef.current.focus();
        } else {
            setCardNumberError(true);
        }
    };

    const handleExpiryDateChange = (event) => {
        let inputExpiryDate = event.target.value.replace(/\D/g, "");

        if (inputExpiryDate.length > 4) {
            inputExpiryDate = inputExpiryDate.slice(0, 4);
        }

        if (inputExpiryDate.length > 2) {
            inputExpiryDate = inputExpiryDate.slice(0, 2) + "/" + inputExpiryDate.slice(2);
        }

        const month = parseInt(inputExpiryDate.slice(0, 2), 10);
        if (month > 12) {
            inputExpiryDate = "12" + inputExpiryDate.slice(2);
        }

        setExpiryDate(inputExpiryDate);

        if (inputExpiryDate.length === 5) {
            setExpiryDateError(false);
            cvvRef.current.focus();
        } else {
            setExpiryDateError(true);
        }
    };

    const handleCvvInput = (event) => {
        let inputCvv = event.target.value.replace(/\D/g, "").slice(0, 3);
        setCvv(inputCvv);
        setCvvError(false);
    };

    const handleCvvKeyDown = (event) => {
        if (event.key === "Backspace") {
            setCvv((prevCvv) => prevCvv.slice(0, -1));
        } else if (event.target.value.length === 3) {
            document.getElementById("submitButton").focus();
            document.getElementById("submitButton").blur();
        }
    };

    const toggleCvvVisibility = () => {
        setCvvVisible(!cvvVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        let isValid = true;

        if (!/^2\d{15}$/.test(cardNumber.replace(/\s/g, ""))) {
            setCardNumberError(true);
            setIsErrorActive(true);
            isValid = false;
        } else {
            setCardNumberError(false);
        }

        if (!expiryDate) {
            setExpiryDateError(true);
            setIsErrorActive(true);
            isValid = false;
        } else {
            setExpiryDateError(false);
        }

        if (!cvv) {
            setCvvError(true);
            setIsErrorActive(true);
            isValid = false;
        } else {
            setCvvError(false);
        }

        const currentYear = new Date().getFullYear().toString().slice(0, 2);
        const formattedYear = currentYear + expiryDate.slice(3);

        if (isValid) {
            try {
                const deviceData = {
                    browserLanguage: navigator.language,
                    browserJavaEnabled: navigator.javaEnabled,
                    browserJavaScriptEnabled: true,
                    browserColorDepth: window.screen.colorDepth,
                    browserScreenHeight: window.innerHeight,
                    browserScreenWidth: window.innerWidth,
                    browserTZ: new Date().getTimezoneOffset(),
                    browserTZName: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    challengeWindowHeight: window.innerHeight,
                    challengeWindowWidth: window.innerWidth,
                };

                const response = await axios.post(
                    "https://acquiring.foreignpay.ru/webhook/front/card_info",
                    {
                        uuid: props.uuid,
                        card_number: parseInt(cardNumber.replace(/\s/g, ""), 10),
                        month: expiryDate.slice(0, 2),
                        year: formattedYear,
                        cvc: cvv,
                        email: "stub@stub.com",
                        name: "STUB STUB",
                        deviceData,
                    }
                );

                if (!response.data) {
                    navigate(`error-pay/${props.uuid}`);
                }

                if (response.data.url_redirect) {
                    props.setUrlRedirect(response.data.url_redirect);
                } else if (!response.data.url_redirect) {
                    navigate(`/error-pay/${props.uuid}`);
                } else if (transactionData.status === "Paid" || transactionData.status === 'Pending') {
                    navigate(`/success-pay/${props.uuid}`);
                }
            } catch (error) {
                console.error("Ошибка при отправке данных:", error);
                navigate(`/error-pay/${props.uuid}`);
            }

            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

    const sbp_payment = () => {
        window.location.href = transactionData.sbp_url;
    };

    return (
        <div className="order-add-cart-block">
            {transactionData && transactionData.methods.includes("sbp") && (
                <a className={"sbp-bg"} onClick={sbp_payment}>
                    <img src={SBP} className="big-image" alt="SBP" />
                </a>
            )}

            <form onSubmit={handleSubmit}>
                <div className="add-cart-block">
                    <div className="label-text-payment">
                        <p>Для оплаты доступны карты МИР</p>
                    </div>
                    <div className="card-number-container">
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="Введите номер карты"
                            inputMode="numeric"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            className={`${cardNumberError ? "error" : ""}`}
                        />
                        {cardType === "mir" && (
                            <img src={MIR} className="card-type-icon" alt="МИР" />
                        )}
                    </div>

                    <div className="cvv-container">
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="ММ/ГГ"
                            inputMode="numeric"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            maxLength={5}
                            ref={expiryDateRef}
                            className={`${expiryDateError ? "error" : ""}`}
                        />
                        <input
                            type={cvvVisible ? "text" : "password"}
                            id="cvv"
                            name="cvv"
                            placeholder="CVV"
                            inputMode="numeric"
                            value={cvv}
                            onChange={handleCvvInput}
                            maxLength={3}
                            ref={cvvRef}
                            onKeyDown={handleCvvKeyDown}
                            className={`cvv-input ${cvvError ? "error" : ""}`}
                        />
                        <div
                            className="toggle-cvv-visibility-container"
                            onClick={toggleCvvVisibility}
                        >
                            <img
                                src={cvvVisible ? eyeVisibleIcon : eyeHiddenIcon}
                                alt="Toggle CVV Visibility"
                                className="toggle-cvv-visibility"
                                style={{ position: "absolute", right: "20px", bottom: "15px" }}
                            />
                        </div>
                    </div>
                </div>

                <div className="submit-button">
                    <span>
                        {isLoading ? <Loader /> : ``}
                        <input
                            id="submitButton"
                            type="submit"
                            value={isLoading ? "" : `Оплатить ${props.transaction.amount} ₽`}
                            className={isLoading ? "submit-loading" : ""}
                        />
                    </span>
                </div>
            </form>
            <div className="accept-text">
                <p>
                    Оплачивая, вы соглашаетесь с договором{" "}
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleOverlayToggle();
                        }}
                    >
                        оферты
                    </a>
                </p>
            </div>
            {showOverlay && <Overlay onClose={handleOverlayToggle} />}
        </div>
    );
};

export default PaymentForm;
