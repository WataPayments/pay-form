import React from "react";
import "./index.css";
import logo from "./Images/Logo.svg";
import PaymentFormDetails from "./Components/PaymentFormDetails";
import PaymentForm from "./Components/PaymentForm";
import SuccsessPage from "./Components/SuccsessPage";
import ErrorPage from "./Components/ErrorPage";


export default function App() {
    return (
            <div className="App">
                <SuccsessPage/>
                <ErrorPage/>
                <PaymentFormDetails/>
                <PaymentForm/>
                <div className={"logo"}>
                    <img src={logo} alt="WATA"/>
                </div>
            </div>
    );
}

