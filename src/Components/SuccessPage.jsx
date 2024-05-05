import React from "react";
import Done from "../Images/Alert icon.svg";
import '../Styles/SuccsessPageStyle.css';

export default function SuccessPage(props){
    return (
        <div className={"sucsess-block"}>
            <div className={"result-pay"}>
                <img src={Done} alt="Result-pay"/>
                <p>Вы успешно оплатили счет!</p>
            </div>
            <div className={"price-and-number-order"}>
                <p className={"price"}>{/*{props.transaction.amount}*/}5000 ₽</p>
                <p className={"number"}>№{/*{props.transaction.uuid}*/}410001</p>
            </div>
            <div className={"link-and-info-order"}>
                <p>{/*{props.transaction.agent_name}*/}biolife.com</p>
                <p>{/*{props.transaction.description}*/}Оплата бадов из США</p>
            </div>
            <div className={`submit-button-result`}>
                <input type="submit" value="Поделиться"/>
            </div>

        </div>
    );
}