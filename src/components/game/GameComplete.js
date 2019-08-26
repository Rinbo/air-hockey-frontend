import React from "react";
import { Link } from "react-router-dom";

const GameComplete = ({ score, subscribers }) => {
  const renderResult = () => {
    if (score.player1 > score.player2) {
      return <h3>{subscribers.player1} was victorious!</h3>;
    } else if (score.player1 < score.player2) {
      return <h3>{subscribers.player2} was victorious!</h3>;
    } else {
      return <h3>The Game ended in a tie</h3>;
    }
  };

  return (
    <div className="bson-flex">
      {renderResult()}
      <div className="result-flex">
        <div>{subscribers.player1}</div>
        <div>{subscribers.player2}</div>
      </div>
      <div className="result-flex">
        <div>{score.player1}</div>
        <div>{score.player2}</div>
      </div>
      <Link to={`${process.env.PUBLIC_URL}/lobby`} className="bson-button m-l">
        Back to Lobby
      </Link>
    </div>
  );
};

export default GameComplete;
