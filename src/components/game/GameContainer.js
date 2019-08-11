import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import MasterCanvas from "./MasterCanvas";
import SlaveCanvas from "./SlaveCanvas";
import WaitingRoom from "./WaitingRoom";
import history from "../../history";
import useChannel from "../hooks/useChannel";
import { eventReducer, INITIAL_STATE } from "../reducers/eventReducer";
import {
  INITIAL_PUCK_STATE,
  INITIAL_STRIKER1_STATE,
  INITIAL_STRIKER2_STATE
} from "./gameConstants";

const GameContainer = () => {
  const { gameName, name } = useContext(UserContext);

  const [striker1, setStriker1] = useState(INITIAL_STRIKER1_STATE);
  const [striker2, setStriker2] = useState(INITIAL_STRIKER2_STATE);
  const [puck, setPuck] = useState(INITIAL_PUCK_STATE);

  const [gameState, broadcast] = useChannel(
    `game:${gameName}`,
    name,
    eventReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    if (name === "" || gameName === "")
      history.push(`${process.env.PUBLIC_URL}/`);
  }, [name, gameName]);

  if (!gameState.active) return <WaitingRoom message={gameState.message} />;

  return (
    <div className="bson-flex">
      <div>
        This is game: {gameName}, created by {name}
      </div>
      {gameState.role === "master" ? (
        <MasterCanvas
          puck={puck}
          setPuck={setPuck}
          striker1={striker1}
          setStriker1={setStriker1}
          striker2={striker2}
          broadcast={broadcast}
          gameState={gameState}
        />
      ) : (
        <SlaveCanvas
          puck={puck}
          striker1={striker1}
          setStriker2={setStriker2}
          striker2={striker2}
          broadcast={broadcast}
          gameState={gameState}
        />
      )}
    </div>
  );
};

export default GameContainer;
