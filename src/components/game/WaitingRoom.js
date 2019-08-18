import React from "react";
import { Link } from "react-router-dom";

const WaitingRoom = ({ message }) => {
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

  if (message === "unauthorized") return renderUnauthorized();

  return (
    <div className="bson-flex">
      <div>Waiting for another player to join...</div>
      <div>{message}</div>
    </div>
  );
};

export default WaitingRoom;
