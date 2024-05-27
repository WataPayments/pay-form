import React, {useEffect} from "react";
import "../Styles/Error500PageStyle.css";
import "../Styles/Error500PageLightStyle.css";
import logo from "../Images/Logo.svg";

export default function Error500Page(){

    useEffect(() => {
        const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (theme === 'dark') {
            import('../Styles/Error500PageStyle.css');
        } else if (theme === 'light') {
            import('../Styles/Error500PageLightStyle.css');
        }
    }, []);

    return(
        <div className={"container"}>
            <div className={"error-block"}>
                <div className={"error-info"}>
                    <p className={"type-error"}>500</p>
                    <p className={"name-error"}>Ошибка сервера</p>
                </div>
                <form action="">
                    <input type="submit" value={"На главную"}/>
                </form>
            </div>
            <div className="logo">
                <img src={logo} alt="WATA"/>
            </div>
        </div>
    );
}