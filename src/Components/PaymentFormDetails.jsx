import React from "react";
import "../Styles/PaymentFormDetailsStyle.css";
export default function PaymentFormDetails(props) {

    return (
        <div className={"order-info-block"}>
            <div className={"price-and-number-order"}>
                <p className={"price"}>{/*{props.transaction.amount}*/}5000 ₽</p>
                <p className={"number"}>№{/*{props.transaction.uuid}*/}410001</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>{/*{props.transaction.agent_name}*/}biolife.com</p>
                <p>{/*{props.transaction.description}*/}Оплата бадов из США</p>
            </div>
        </div>
    );
}
