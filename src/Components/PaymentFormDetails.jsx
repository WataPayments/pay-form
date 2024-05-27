import React, { useEffect } from "react";
import "../Styles/PaymentFormDetailsStyle.css";
import "../Styles/PaymentFormDetailsLightStyle.css"

export default function PaymentFormDetails(props) {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";


    useEffect(() => {
        if (theme === "dark") {
            import("../Styles/PaymentFormDetailsStyle.css");
        } else {
            import("../Styles/PaymentFormDetailsLightStyle.css");
        }
    }, [theme]);



    if (!props.transaction) {
        return "";
    }
    return (
        <div className={"order-info-block"}>
            <div className={"price-and-number-order"}>
                <p className={"price-order"}>{props.transaction.amount} ₽</p>
                <p className={"number"}>{/* {props.transaction.order_number} */}</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>{props.transaction.agent_name}</p>
                <p>{props.transaction.description}</p>
            </div>
        </div>
    );
}
