import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import Canvas from "./Canvas";
import history from "../../history";

const GameContainer = () => {
  const { game, name, role } = useContext(UserContext);

  useEffect(() => {
    if (name === "" || game === "") history.push(`${process.env.PUBLIC_URL}/`);
  }, [name, game]);

  return (
    <div className="bson-flex">
      <div>
        This is game: {game}, created by {name}
      </div>      
      <Canvas role={role} />
    </div>
  );
};

export default GameContainer;
