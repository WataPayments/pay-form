import React from "react";
import { useParams } from "react-router-dom";
import App from "../App";

const TransactionPage = () => {
    const { uuid } = useParams();
    return (
        <div>
            <App />
        </div>
    );
};

export default TransactionPage;
