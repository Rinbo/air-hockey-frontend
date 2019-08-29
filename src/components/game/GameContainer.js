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
import ChatWindow from "./ChatWindow";

const GameContainer = () => {
  const { gameName, name, setState } = useContext(UserContext);

  const [striker1, setStriker1] = useState(INITIAL_STRIKER1_STATE);
  const [striker2, setStriker2] = useState(INITIAL_STRIKER2_STATE);
  const [puck, setPuck] = useState(INITIAL_PUCK_STATE_TOP);
  const [clock, setClock] = useState(120);
  const [begin, setBegin] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const [state, broadcast] = useChannel(
    `game:${gameName}`,
    name,
    eventReducer,
    INITIAL_STATE
  );

  useInterval(() => {
    setCountdown(prevTick => prevTick - 1);
  }, 1000);

  useInterval(() => {
    if (begin) setClock(prevTick => prevTick - 1);
  }, 1000);

  useEffect(() => {
    if (name === "" || gameName === "") {
      history.push(`${process.env.PUBLIC_URL}/lobby`);
    }
    if (state.active) {
      setTimeout(() => {
        setBegin(true);
      }, 3000);
    }
  }, [name, gameName, state.active]);

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

  const showTime = () => {
    const min = Math.floor(clock / 60);
    const sec = clock - min * 60;
    return (
      <div>
        {min}:{sec < 10 ? "0" : ""}
        {sec}
      </div>
    );
  };

  if (!state.active) return <WaitingRoom message={state.message} />;

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

  if (state.gameComplete) {
    return <GameComplete score={state.score} subscribers={state.subscribers} />;
  }

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
      <h1>{countdown >= 0 ? countdown : ""}</h1>
      <div>{gameName}</div>
      {showTime()}
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
            clock={clock}
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
      <ChatWindow
        broadcast={broadcast}
        name={state.name}
        incomingMessage={{}}
      />
    </div>
  );
};

export default GameContainer;
