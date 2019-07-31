import React from "react";

const Game = ({ props }) => {
  const id = props.match.params.id;
  return <div>This is a game component with id: {id}</div>;
};

export default Game;
