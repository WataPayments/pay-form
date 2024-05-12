import React from "react";
import "../Styles/PaymentFormDetailsStyle.css";

export default function PaymentFormDetails(props) {

    if (!props.transaction) {
        return "";
    }
    return (
        <div className={"order-info-block"}>
            <div className={"price-and-number-order"}>
                <p className={"price"}>{props.transaction.amount}</p>
                <p className={"number"}>№{props.transaction.order_number}</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>{props.transaction.agent_name}</p>
                <p>{props.transaction.description}</p>
            </div>
        </div>
    );
}