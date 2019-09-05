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
import { FLASH_MESSAGE, UPDATE_CHAT_HISTORY } from "../types";
import { useInterval } from "../hooks/useInterval";
import ChatWindow from "./ChatWindow";
import Countdown from "./Countdown";

const GameContainer = () => {
  const { gameName, name, setState } = useContext(UserContext);

  const [striker1, setStriker1] = useState(INITIAL_STRIKER1_STATE);
  const [striker2, setStriker2] = useState(INITIAL_STRIKER2_STATE);
  const [puck, setPuck] = useState(INITIAL_PUCK_STATE_TOP);
  const [clock, setClock] = useState(120);
  const [begin, setBegin] = useState(false);
  const [startCountDown, setStartCountdown] = useState(false);

  const [state, broadcast, dispatch] = useChannel(
    `game:${gameName}`,
    name,
    eventReducer,
    INITIAL_STATE
  );

  useInterval(() => {
    if (begin) setClock(prevTick => prevTick - 1);
  }, 1000);

  useEffect(() => {
    if (name === "" || gameName === "") {
      history.push(`${process.env.PUBLIC_URL}/lobby`);
    }
    return () => dispatch({ type: UPDATE_CHAT_HISTORY, payload: [] });
  }, [name, gameName, dispatch]);

  useEffect(() => {
    if (state.readyPlayer1 && state.readyPlayer2) setStartCountdown(true);
  }, [state.readyPlayer1, state.readyPlayer2, broadcast]);

  useEffect(() => {
    if (begin) broadcast("start_game", {});
  }, [begin, broadcast]);

  useEffect(() => {
    if (state.role === "master") setStriker2(state.striker2);
  }, [state.striker2, state.role]);

  useEffect(() => {
    if (state.role === "slave") {
      setStriker1(state.striker1);
      setPuck(state.puck);
    }
  }, [state.striker1, state.puck, state.role]);

  useEffect(() => {
    setStriker2(INITIAL_STRIKER2_STATE);
  }, [state.score]);

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

  if (!(state.readyPlayer1 && state.readyPlayer2))
    return (
      <WaitingRoom
        message={state.message}
        channelCount={state.channelCount}
        role={state.role}
        broadcast={broadcast}
        name={name}
        chatHistory={state.chatHistory}
      />
    );

  if (startCountDown)
    return (
      <Countdown setBegin={setBegin} setStartCountdown={setStartCountdown} />
    );

  if (state.gameComplete) {
    return <GameComplete score={state.score} subscribers={state.subscribers} />;
  }

  return (
    <div className="bson-flex">
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
        name={name}
        chatHistory={state.chatHistory}
      />
    </div>
  );
};

export default GameContainer;
