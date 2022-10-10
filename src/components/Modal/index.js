import React from "react";
import Classes from "./index.module.css";
const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div
      className={
        props.show ? Classes.modal + " " + Classes.show : Classes.modal
      }
      onClick={props.dataChange ? null : props.onClose}
    >
      <div
        className={Classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={Classes.modalHeader}>
          <h4 className={Classes.modalTitle}>{props.title}</h4>
        </div>
        <div className={Classes.modalBody}>{props.children}</div>
        <div className={Classes.modalFooter}>
          {props.dataChange ? null : (
            <button onClick={props.onClose}>close</button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Modal;
