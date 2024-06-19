import { Overlay } from "../Overlay/Overlay";
import Close from "../../Images/Close.svg";
import CloseLight from "../../Images/CloseLight.svg";
import { CSSTransition } from "react-transition-group";

import "./styles.css";

import { useContext, useRef } from "react";
import { ThemeContext } from "../../App";
import { useSwipeable } from "react-swipeable";

export const BottomSheet = ({ isOpen, children, onClose }) => {
  const theme = useContext(ThemeContext);
  const nodeRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedDown: onClose,
  });

  return (
    <CSSTransition
      in={isOpen}
      classNames="slide"
      timeout={300}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <Overlay onClickOutside={onClose} isOpen={isOpen}>
        <div className="sheet-wrapper" ref={nodeRef}>
          {children}
          <img
            src={theme === "dark" ? Close : CloseLight}
            alt="Close"
            className="close-btn"
            onClick={onClose}
          />
          <div {...handlers} className="drag-container">
            <div className="drag-line"></div>
          </div>
        </div>
      </Overlay>
    </CSSTransition>
  );
};
