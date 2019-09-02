import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Link } from "react-router-dom";

const WaitingRoom = ({ message, channelCount }) => {
  const [counter, setCounter] = useState(1);

  useInterval(() => {
    if (counter === 4) {
      setCounter(1);
    } else {
      setCounter(prevTick => prevTick + 1);
    }
  }, 500);

  const renderWaitingMessage = () => {
    const displayMessage = "Waiting for another player to join";
    switch (counter) {
      case 1:
        return displayMessage + ".";
      case 2:
        return displayMessage + "..";
      case 3:
        return displayMessage + "...";
      default:
        return displayMessage;
    }
  };

  const renderUnauthorized = () => {
    return (
      <div className="bson-flex">
        <div className="m-n">
          This game has already started. Please create a new one of join one
          that is not in progress
        </div>
        <div>{renderReturnButton()}</div>
      </div>
    );
  };

  const renderError = () => {
    return (
      <div className="bson-flex">
        <div>Something went wrong. Plese return to the lobby and try again</div>
        <div>{renderReturnButton()}</div>
      </div>
    );
  };

  const renderReturnButton = () => {
    return (
      <Link className="bson-button m-n" to={`${process.env.PUBLIC_URL}/lobby`}>
        Back to Lobby
      </Link>
    );
  };

  const renderOnePlayer = () => {
    return (
      <div className="bson-flex">
        <div style={{width: "100%"}}>{renderWaitingMessage()}</div>
        <div>{message}</div>
      </div>
    );
  };

  const renderPreChat = () => {
    return null;
  };

  if (message === "unauthorized") return renderUnauthorized();

  if (channelCount === 1) return renderOnePlayer();

  if (channelCount === 2) return renderPreChat();

  return renderError();
};

export default WaitingRoom;
