import React, { useContext } from "react";
import logoDark from "../Images/Logo.svg";
import logoLight from "../Images/LogoLight.svg";
import "../Styles/Error500PageStyle.css";
import { ThemeContext } from "../App";
import isMobile from "is-mobile";

export default function Error500Page() {
  const theme = useContext(ThemeContext);
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "https://wata.pro/";
  };

  return (
    <div
      className="error-contaier"
      style={isMobile() ? { marginTop: "20px" } : {}}
    >
      <div className="error-block">
        <div className="error-title">500</div>
        <div className="error-message">Ошибка сервера</div>
        <form action="">
          <input type="submit" value="На главную" onClick={handleClick} />
        </form>
      </div>
      <div className="logo">
        <img src={theme === "dark" ? logoDark : logoLight} alt="WATA" />
      </div>
    </div>
  );
}
