// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./index.css";
// import logo from "./Images/Logo.svg";
// import PaymentFormDetails from "./Components/PaymentFormDetails";
// import PaymentForm from "./Components/PaymentForm";
// import SuccsessPage from "./Components/SuccsessPage";
// import ErrorPage from "./Components/ErrorPage";
//
// export default function App() {
//     const [transactionData, setTransactionData] = useState(null);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("https://acquiring.foreignpay.ru/webhook/transaction?uuid=2119c062-7db5-41c2-a5ec-e051c01705d3");
//                 setTransactionData(response.data);
//             } catch (error) {
//                 console.error("Error fetching transaction data:", error);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <div className="App">
//             <SuccsessPage />
//             <ErrorPage />
//             <PaymentFormDetails transaction={transactionData}/>
//             <PaymentForm />
//             <div className="logo">
//                 <img src={logo} alt="WATA" />
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import logo from "./Images/Logo.svg";
import PaymentFormDetails from "./Components/PaymentFormDetails";
import PaymentForm from "./Components/PaymentForm";
import SuccessPage from "./Components/SuccessPage";
import ErrorPage from "./Components/ErrorPage";

export default function App() {
    const [transactionData, setTransactionData] = useState(null);
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://acquiring.foreignpay.ru/webhook/transaction?uuid=2119c062-7db5-41c2-a5ec-e051c01705d3");
                setTransactionData(response.data);
                setRedirectUrl(response.data.url_redirect);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (redirectUrl && (redirectUrl.includes("success-pay") || redirectUrl.includes("error-pay"))) {
            setShowPaymentForm(false);
        }
    }, [redirectUrl]);
    return (
        <div className="App">
            {redirectUrl && redirectUrl.includes("success-pay") && <SuccessPage transaction={transactionData}/>}
            {redirectUrl && redirectUrl.includes("error-pay") && <ErrorPage transaction={transactionData}/>}
            {showPaymentForm && (
                <>
                    <PaymentFormDetails transaction={transactionData} />
                    <PaymentForm />
                </>
            )}
            <div className="logo">
                <img src={logo} alt="WATA" />
            </div>
        </div>
    );
}
