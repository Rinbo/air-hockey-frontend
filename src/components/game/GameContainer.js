import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import MasterCanvas from "./MasterCanvas";
import SlaveCanvas from "./SlaveCanvas";
import history from "../../history";
import useChannel from "../hooks/useChannel";
import { eventReducer, INITIAL_STATE } from "../reducers/eventReducer";
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

  const [gameState, broadcast, channelObject] = useChannel(
    `game:${channelName}`,
    name,
    eventReducer,
    INITIAL_STATE
  );

  const leaveChannel = () => {
    channelObject
      .leave()
      .receive("ok", ({ messages }) =>
        console.log("successfully left channel", messages || "")
      )
      .receive("error", ({ reason }) =>
        console.error("failed to leave channel", reason)
      );
    history.push(`${process.env.PUBLIC_URL}/`);
  };

  useEffect(() => {
    if (name === "" || game === "") history.push(`${process.env.PUBLIC_URL}/`);
  }, [name, game]);

  return (
    <div className="bson-flex">
      <div>
        This is game: {game}, created by {name}
      </div>
      {role === "master" ? (
        <MasterCanvas
          puck={puck}
          setPuck={setPuck}
          striker1={striker1}
          setStriker1={setStriker1}
          striker2={striker2}
        />
      ) : (
        <SlaveCanvas
          puck={puck}
          striker1={striker1}
          setStriker2={setStriker2}
          striker2={striker2}
        />
      )}
    </div>
  );
};

export default GameContainer;
