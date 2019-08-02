import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import Canvas from "./Canvas";
import history from "../../history";
import GameEngine from "./GameEngine";

const GameContainer = () => {
  const { game, name } = useContext(UserContext);

  useEffect(() => {
    if (name === "" || game === "") history.push(`${process.env.PUBLIC_URL}/`);
  }, [name, game]);

  return (
    <div className="bson-flex">
      <div>
        This is game: {game}, created by {name}
      </div>
      <div>
        <GameEngine />
      </div>
      <Canvas />
    </div>
  );
};

export default GameContainer;
