import React, { useState } from "react";
import Modal from "./utility/Modal";
import history from "../history";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bson-flex">
      <h3>Borjessons Air Hockey</h3>
      <button
        className="bson-button btn-large m-l"
        onClick={() => setShowModal(true)}
      >
        Start Playing
      </button>
      {showModal ? <GiveName setShowModal={setShowModal} /> : null}
    </div>
  );
};

const GiveName = ({ setShowModal }) => {
  const renderContent = () => {
    return "Please provide a game handle";
  };

  const renderActions = () => {
    return (
      <>
        <input />
        <button className="bson-button m-n">Submit</button>
      </>
    );
  };

  const dismiss = () => {
    setShowModal(false);
    history.push(`${process.env.PUBLIC_URL}/`);
  };

  return (
    <Modal
      title="Enter Name"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => dismiss()}
    />
  );
};

export default LandingPage;
