import React from "react";
import "./index.css";
import logo from "./Images/Logo.svg";
import OrderInfo from "./Components/OrderInfo";
import OrderAddCart from "./Components/OrderAddCart";


export default function App() {
  return (
      <div className="App">
        <OrderInfo/>
        <OrderAddCart/>

        <div className={"logo"}>
          <img src={logo} alt="WATA"/>
        </div>
      </div>
  );
}

