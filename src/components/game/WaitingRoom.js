import React, { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { Link } from "react-router-dom";

const WaitingRoom = ({ message, player1, player2 }) => {
  const [counter, setCounter] = useState(0);

  useInterval(() => {
    if (counter === 4) {
      setCounter(0);
    } else {
      setCounter(prevTick => prevTick + 1);
    }
  }, 1000);

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
        <div>
          <Link
            className="bson-button m-n"
            to={`${process.env.PUBLIC_URL}/lobby`}
          >
            Back to Lobby
          </Link>
        </div>
      </div>
    );
  };

  const renderOnePlayer = () => {
    return (
      <div className="bson-flex">
        <div>{renderWaitingMessage}</div>
        <div>{message}</div>
      </div>
    );
  };

  const renderPreChat = () => {
    return null;
  };

  if (message === "unauthorized") return renderUnauthorized();

  if (!player2) return renderOnePlayer();

  return renderPreChat();
};

export default WaitingRoom;
