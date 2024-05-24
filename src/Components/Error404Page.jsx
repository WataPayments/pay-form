import React from "react";
import "../Styles/Error404PageStyle.css";
import logo from "../Images/Logo.svg";

export default function Error404Page(){
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