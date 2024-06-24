import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { useClickAway } from "react-use";

import Close from "../../Images/Close.svg";
import CloseLight from "../../Images/CloseLight.svg";

import "./style.css";
import { useContext } from "react";
import { ThemeContext } from "../../App";

export const Modal = ({ isOpen, onClose, children }) => {
  const ref = useRef(null);
  const nodeRef = useRef(null);
  const theme = useContext(ThemeContext);

  useClickAway(ref, () => {
    onClose();
  });

  return (
    <CSSTransition
      in={isOpen}
      classNames="fade"
      timeout={300}
      nodeRef={nodeRef}
      appear={true}
      unmountOnExit
    >
      <div className="modal-overlay" ref={nodeRef}>
        <div className="modal-content" ref={ref}>
          {children}
          <img
            src={theme === "dark" ? Close : CloseLight}
            className="close-icon"
            alt=""
            onClick={onClose}
          />
        </div>
      </div>
    </CSSTransition>
  );
};
