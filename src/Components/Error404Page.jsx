import React, { useContext } from "react";
import logoDark from "../Images/Logo.svg";
import logoLight from "../Images/LogoLight.svg";
import "../Styles/Error404PageStyle.css";
import { ThemeContext } from "../App";

export default function Error500Page() {
  const theme = useContext(ThemeContext);
  return (
    <div className="error-contaier">
      <div className="error-block">
        <div className="error-title">404</div>
        <div className="error-message">Страницы не существует</div>
        <form action="">
          <input type="submit" value="На главную" />
        </form>
      </div>
      <div className="logo">
        <img src={theme === "dark" ? logoDark : logoLight} alt="WATA" />
      </div>
    </div>
  );
}
