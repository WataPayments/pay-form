import React, { useEffect, useState } from "react";
import "../Styles/Error404PageStyle.css";
import "../Styles/Error404PageLightStyle.css";
import logo from "../Images/Logo.svg";

export default function Error404Page() {
    const [theme, setTheme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleThemeChange = (e) => {
            setTheme(e.matches ? "dark" : "light");
        };

        mediaQuery.addListener(handleThemeChange);

        return () => {
            mediaQuery.removeListener(handleThemeChange);
        };
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            import("../Styles/Error404PageStyle.css");
        } else if (theme==="light"){
            import("../Styles/Error404PageLightStyle.css");
        }
    }, [theme]);

    return (
        <div className={`container ${theme}`}>
            <div className={`error-block ${theme}`}>
                <div className="error-info">
                    <p className="type-error">404</p>
                    <p className="name-error">Страницы не существует</p>
                </div>
                <form action="">
                    <input type="submit" value="На главную" />
                </form>
            </div>
            <div className="logo">
                <img src={logo} alt="WATA" />
            </div>
        </div>
    );
}
