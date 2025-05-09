import React, { useState } from "react";
import "../styles/Modal.css";

function Modal() {
  const [toggleModal, setToggleModal] = useState(false);
  const ModalComp = () => {
    return (
      <div className="modalComp">
        <div className="modalHeader">
          <span className="modalHeading">Modal</span>
          <div className="modalClose" onClick={() => setToggleModal(false)}>
            X
          </div>
        </div>
        <hr />
        <div className="modalBody">
          <h3>What is a modal ?</h3>
          <div>
            A modal in user interface (UI) design is a large, prominent element
            that appears on top of an application's main window or a webpage.
            Modals are also known as modal windows, overlays, pop-ups,
            pop-overs, or dialog windows.{" "}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      className="modalRoot"
      style={{ background: toggleModal ? "lightGray" : "white" }}
      onClick={() => {
        if (toggleModal) {
          setToggleModal(false);
        }
      }}
    >
      {toggleModal && <ModalComp />}
      <button className="bttnClass" onClick={() => setToggleModal(true)}>
        Open Modal
      </button>
      <span>Click the button Above !</span>
    </div>
  );
}

export default Modal;
