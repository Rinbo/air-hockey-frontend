import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import { useInterval } from "../hooks/useInterval";
import { Link } from "react-router-dom";

const WaitingRoom = ({
  message,
  channelCount,
  role,
  broadcast,
  name,
  chatHistory
}) => {
  const [counter, setCounter] = useState(1);
  const [ready, setReady] = useState(false);

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
        {renderReturnButton()}
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
        <div style={{ width: "100%" }}>{renderWaitingMessage()}</div>
        <div>{message}</div>
      </div>
    );
  };

  const renderPreChat = () => {
    return (
      <div className="bson-flex">
        <div> Ok, are you ready to begin?</div>
        <button
          className={ready ? "bson-button-disabled m-n" : "bson-button m-n"}
          onClick={signalReady}
          disabled={ready}
        >
          {ready ? "Waiting for opponent" : "Ready"}
        </button>
        <ChatWindow
          broadcast={broadcast}
          name={name}
          chatHistory={chatHistory}
        />
      </div>
    );
  };

  const signalReady = () => {
    setReady(true);
    if (role === "master") broadcast("player1_ready", {});
    if (role === "slave") broadcast("player2_ready", {});
  };

  if (message === "unauthorized") return renderUnauthorized();

  if (channelCount === 1) return renderOnePlayer();

  if (channelCount === 2) return renderPreChat();

  return renderError();
};

export default WaitingRoom;
