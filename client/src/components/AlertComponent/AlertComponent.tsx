import React, { useState, useEffect } from "react";
import "./AlertComponent.css";

interface AlertComponentProps {
  message: string | null;
  updateMessage: (message: string | null) => void;
}

function AlertComponent(props: AlertComponentProps) {
  const [modalDisplay, toggleDisplay] = useState("none");

  const openModal = () => {
    toggleDisplay("block");
  };

  const closeModal = () => {
    toggleDisplay("none");
    props.updateMessage(null);
  };

  useEffect(() => {
    if (props.message !== null) {
      openModal();
    } else {
      closeModal();
    }
  });

  return (
    <div
      className={"alert alert-danger alert-dismissable mt-4"}
      role="alert"
      id="alertPopUp"
      style={{ display: modalDisplay }}
    >
      <div className="d-flex alertMessage">
        <span>{props.message}</span>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => closeModal()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}

export default AlertComponent;
