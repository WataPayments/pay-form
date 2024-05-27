import React, {useEffect} from "react";
import "../Styles/Error404PageStyle.css";
import "../Styles/Error404PageLightStyle.css"
import logo from "../Images/Logo.svg";

export default function Error404Page(){

    useEffect(() => {
        const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        if (theme === 'dark') {
            import('../Styles/Error404PageStyle.css');
        } else if (theme === 'light') {
            import('../Styles/Error404PageLightStyle.css');
        }
    }, []);

    return(
        <div className={"container"}>
            <div className={"error-block"}>
                <div className={"error-info"}>
                    <p className={"type-error"}>404</p>
                    <p className={"name-error"}>Страницы не существует</p>
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