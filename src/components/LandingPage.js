import React, { useState, useContext } from "react";
import Modal from "./utility/Modal";
import UserContext from "../components/contexts/UserContext";
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
  const { name, setState } = useContext(UserContext);
  const [error, setError] = useState(false);

  const renderContent = () => {
    return "Please provide a game handle";
  };

  const renderActions = () => {
    return (
      <>
        <input
          value={name}
          style={{ borderColor: error ? "red" : "" }}
          onChange={e => setState({ type: "user", payload: e.target.value })}
        />
        <div style={{ color: "red", fontSize: 10, marginTop: 5, marginBottom: 10 }}>
          {error ? "Name must be atleast 3 characters long" : null}
        </div>
        <button className="bson-button" onClick={() => onSubmit()}>
          Submit
        </button>
      </>
    );
  };

  const onSubmit = () => {
    if (name.length < 3) {
      setError(true);
    } else {
      setError(false);
      history.push(`${process.env.PUBLIC_URL}/lobby`);
    }
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
