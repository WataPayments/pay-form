import "./style.css";
import { Link } from "react-router-dom";

const Button = ({ title, href, disabled, className, blank, onClick }) => {
  if (href) {
    return (
      <Link
        href={href}
        target={blank ? "_blank" : "_self"}
        className={`root ${disabled && "disabled"} ${className}`}
      >
        {title}
      </Link>
    );
  }

  return (
    <button
      className={`root ${disabled && "disabled"} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
