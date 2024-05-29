import React, { useEffect, useState } from "react";
import "../Styles/PaymentFormDetailsStyle.css";
import "../Styles/PaymentFormDetailsLightStyle.css";

export default function PaymentFormDetails(props) {
    const [theme, setTheme] = useState('')

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleThemeChange = (event) => {
            setTheme(event.matches ? 'dark' : 'light');
        };

        setTheme(mediaQuery.matches ? 'dark' : 'light');
        mediaQuery.addEventListener('change', handleThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, []);

    useEffect(() => {
        const applyTheme = async () => {
            if (theme === 'dark') {
                await import('../Styles/PaymentFormDetailsStyle.css');
            } else if (theme === 'light') {
                await import('../Styles/PaymentFormDetailsLightStyle.css');
            }
        };
        applyTheme();
    }, [theme]);

    if (!props.transaction) {
        return "";
    }

    return (
        <div className={`order-info-block ${theme}`}>
            <div className={`price-and-number-order ${theme}`}>
                <p className={`price-order ${theme}`}>{props.transaction.amount} ₽</p>
                <p className={`number ${theme}`}>{/* {props.transaction.order_number} */}</p>
            </div>
            <div className={`link-and-info-order ${theme}`}>
                <p>{props.transaction.agent_name}</p>
                <p>{props.transaction.description}</p>
            </div>
        </div>
    );
}
