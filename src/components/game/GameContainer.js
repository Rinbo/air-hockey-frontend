import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import MasterCanvas from "./MasterCanvas";
import SlaveCanvas from "./SlaveCanvas";
import WaitingRoom from "./WaitingRoom";
import GameComplete from "./GameComplete";
import history from "../../history";
import useChannel from "../hooks/useChannel";
import { eventReducer, INITIAL_STATE } from "../reducers/eventReducer";
import {
  INITIAL_PUCK_STATE_TOP,
  INITIAL_STRIKER1_STATE,
  INITIAL_STRIKER2_STATE
} from "./gameConstants";
import { FLASH_MESSAGE } from "../types";
import { useInterval } from "../hooks/useInterval";

const GameContainer = () => {
  const { gameName, name, setState } = useContext(UserContext);

  const [striker1, setStriker1] = useState(INITIAL_STRIKER1_STATE);
  const [striker2, setStriker2] = useState(INITIAL_STRIKER2_STATE);
  const [puck, setPuck] = useState(INITIAL_PUCK_STATE_TOP);
  const [gameComplete, setGameComplete] = useState(false);
  const [clock, setClock] = useState(10);

  const [state, broadcast] = useChannel(
    `game:${gameName}`,
    name,
    eventReducer,
    INITIAL_STATE
  );

  useInterval(() => {
    setClock(prevTick => prevTick - 1);
    if (clock === 0) setGameComplete(true);
  }, 1000);

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

  if (gameComplete)
    return <GameComplete score={state.score} subscribers={state.subscribers} />;

  if (state.playerLeft) {
    history.push(`${process.env.PUBLIC_URL}/lobby`);
    setState({
      type: FLASH_MESSAGE,
      payload: {
        message: "Your opponent left the game. You have returned to the lobby",
        code: 0,
        delay: 5000
      }
    });
  }

  return (
    <div className="bson-flex">
      <div>{gameName}</div>
      <div className="score-flex">
        <div>{state.subscribers.player1}</div>
        <div> {state.score.player1}</div>
      </div>
      <div>
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
      <div className="score-flex">
        <div>{state.subscribers.player2}</div>
        <div>{state.score.player2}</div>
      </div>
    </div>
  );
};

export default GameContainer;
