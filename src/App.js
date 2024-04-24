import React from "react";
import {OrderProvider} from "./PaymentContext";
import "./index.css";
import logo from "./Images/Logo.svg";
import PaymentFormDetails from "./Components/PaymentFormDetails";
import PaymentForm from "./Components/PaymentForm";


export default function App() {
    return (
        <OrderProvider>
            <div className="App">
                <PaymentFormDetails/>
                <PaymentForm/>
                <div className={"logo"}>
                    <img src={logo} alt="WATA"/>
                </div>
            </div>
        </OrderProvider>
    );
}

