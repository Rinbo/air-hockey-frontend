import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="modal">
      <div onClick={e => e.stopPropagation()} className="modal-content">
        <span onClick={props.onDismiss} class="close">
          &times;
        </span>
        <div className="modal-flex">
          <div className="header">{props.title}</div>
          <div className="content">{props.content}</div>
          <div className="actions">{props.actions}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
