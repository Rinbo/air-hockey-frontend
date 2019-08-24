import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import MasterCanvas from "./MasterCanvas";
import SlaveCanvas from "./SlaveCanvas";
import WaitingRoom from "./WaitingRoom";
import history from "../../history";
import useChannel from "../hooks/useChannel";
import { eventReducer, INITIAL_STATE } from "../reducers/eventReducer";
import {
  INITIAL_PUCK_STATE_TOP,
  INITIAL_STRIKER1_STATE,
  INITIAL_STRIKER2_STATE
} from "./gameConstants";

const GameContainer = () => {
  const { gameName, name } = useContext(UserContext);

  const [striker1, setStriker1] = useState(INITIAL_STRIKER1_STATE);
  const [striker2, setStriker2] = useState(INITIAL_STRIKER2_STATE);
  const [puck, setPuck] = useState(INITIAL_PUCK_STATE_TOP);

  const [state, broadcast] = useChannel(
    `game:${gameName}`,
    name,
    eventReducer,
    INITIAL_STATE
  );

  useEffect(() => {
    if (name === "" || gameName === "") {
      history.push(`${process.env.PUBLIC_URL}/`);
    }
  }, [name, gameName]);

  useEffect(() => {
    if (state.role === "slave") {
      setStriker1(state.striker1);
      setPuck(state.puck);
    }
  }, [state.striker1, state.puck, state.role]);

  useEffect(() => {
    setStriker2(INITIAL_STRIKER2_STATE);
  }, [state.score]);

  useEffect(() => {
    if (state.role === "master") setStriker2(state.striker2);
  }, [state.striker2, state.role]);

  if (!state.active) return <WaitingRoom message={state.message} />;

  if (state.playerLeft) history.push(`${process.env.PUBLIC_URL}/lobby`);

  return (
    <div className="bson-flex">
      <div>Game: {gameName}</div>
      <div>
        Player1: {state.subscribers.player1} - Score: {state.score.player1}
      </div>
      <div>
        Player2: {state.subscribers.player2} - Score: {state.score.player2}
      </div>
      <div>Status: {state.playerLeft ? "Left" : "Here"}</div>
      {state.role === "master" ? (
        <MasterCanvas
          puck={puck}
          setPuck={setPuck}
          striker1={striker1}
          setStriker1={setStriker1}
          striker2={striker2}
          broadcast={broadcast}
          state={state}
        />
      ) : (
        <SlaveCanvas
          puck={puck}
          striker1={striker1}
          setStriker2={setStriker2}
          striker2={striker2}
          broadcast={broadcast}
        />
      )}
    </div>
  );
};

export default GameContainer;
