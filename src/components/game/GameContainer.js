import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import MasterCanvas from "./MasterCanvas";
import history from "../../history";
import {
  INITIAL_PUCK_STATE,
  INITIAL_STRIKER1_STATE,
  INITIAL_STRIKER2_STATE
} from "./gameConstants";

const GameContainer = () => {
  const { game, name, role } = useContext(UserContext);

  const [striker1, setStriker1] = useState(INITIAL_STRIKER1_STATE);
  const [striker2, setStriker2] = useState(INITIAL_STRIKER2_STATE);
  const [puck, setPuck] = useState(INITIAL_PUCK_STATE);

  useEffect(() => {
    if (name === "" || game === "") history.push(`${process.env.PUBLIC_URL}/`);
  }, [name, game]);

  return (
    <div className="bson-flex">
      <div>
        This is game: {game}, created by {name}
      </div>
      <MasterCanvas
        puck={puck}
        setPuck={setPuck}
        striker1={striker1}
        setStriker1={setStriker1}
        striker2={striker2}
      />
    </div>
  );
};

export default GameContainer;
