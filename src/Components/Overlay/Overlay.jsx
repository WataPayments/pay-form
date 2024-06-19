import { useClickAway } from "react-use";
import "./styles.css";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

export const Overlay = ({ children, onClickOutside, isOpen }) => {
  const ref = useRef(null);
  const nodeRef = useRef(null);

  useClickAway(ref, () => {
    onClickOutside();
  });

  return (
    <div className="overlay-wrapper">
      <CSSTransition
        in={isOpen}
        classNames="fade"
        timeout={300}
        nodeRef={nodeRef}
        appear={true}
        unmountOnExit
      >
        <div className="overlay" ref={nodeRef}></div>
      </CSSTransition>
      <div className="content" ref={ref}>
        {children}
      </div>
    </div>
  );
};
