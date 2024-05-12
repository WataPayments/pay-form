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
                <p>{/*biolife.com*/}{props.transaction.agent_name}</p>
                <p>{props.transaction.description}{/*Оплата бадов из США*/}</p>
            </div>
        </div>
    );
}


// <div className={"price-and-number-order"}>
//     <p className={"price"}>{props.transaction.amount}</p>
//     <p className={"number"}>№{props.transaction.uuid}</p>
// </div>
// <div className={"link-and-info-order"}>
//     <p>{/*biolife.com*/}{props.transaction.agent_name}</p>
//     <p>{props.transaction.description}{/*Оплата бадов из США*/}</p>
// </div>

// <div className={"price-and-number-order"}>
//     <p className={"price"}>{/*{props.transaction.amount}*/}</p>
//     <p className={"number"}>№{/*{props.transaction.uuid}*/}</p>
// </div>
// <div className={"link-and-info-order"}>
//     <p>{/*biolife.com*/}{/*{props.transaction.agent_name}*/}</p>
//     <p>{/*{props.transaction.description}*/}{/*Оплата бадов из США*/}</p>
// </div>