import React, { useEffect, useState } from "react";
import Done from "../Images/Alert icon.svg";
import '../Styles/SuccessPageStyle.css';
import ApiClient from "../ApiClient";
import {useNavigate, useParams} from "react-router-dom";
import logo from "../Images/Logo.svg";

export default function SuccessPage(props) {
    const [transactionData, setTransactionData] = useState("");
    const { uuid } = useParams();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const [theme,setTheme]=useState('')

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
            import("../Styles/SuccessPageStyle.css");
        } else {
            import("../Styles/SuccessPageLightStyle.css");
        }
    }, [theme]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Success Page',
                text: 'I successfully paid the bill!',
                url: window.location.href
            }).then(() => console.log('Successfully shared')).catch((error) => console.error('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => console.log('Link copied to clipboard'))
                .catch((error) => console.error('Error copying link:', error));
        }
    };
    if (loading) {
        return(<div className={"loader-block"}>
            <span className="loader"></span>
        </div>);
    }

    return (
        <div className={"container"}>
            <div className={"sucsess-block"}>
                <div className={"result-pay"}>
                    <img src={Done} alt="Result-pay"/>
                    <p>Успешный платеж!</p>
                </div>
                <div className={"price-and-number-order"}>
                    <p className={"price"}>{transactionData.amount}</p>
                    <p className={"number"}>{/*{transactionData.order_number}*/}</p>
                </div>
                <div className={"link-and-info-order"}>
                    <p>{transactionData.agent_name}</p>
                    <p>{transactionData.description}</p>
                </div>
                <div className={`submit-button-result`}>
                    <input type="button" value="Поделиться" onClick={handleShare}/>
                </div>
            </div>
            <div className="logo">
                <img src={logo} alt="WATA"/>
            </div>
        </div>
    );
}
