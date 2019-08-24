import { useContext, useReducer, useEffect, useState } from "react";
import SocketContext from "../contexts/SocketContext";

const useChannel = (channelTopic, name, reducer, initialState) => {
  const socket = useContext(SocketContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [broadcast, setBroadcast] = useState(mustJoinChannelWarning);
  const [channelObject, setChannelObject] = useState("");

  useEffect(
    () =>
      joinChannel(
        socket,
        channelTopic,
        name,
        dispatch,
        setBroadcast,
        setChannelObject
      ),
    // eslint-disable-next-line
    [channelTopic]
  );

  return [state, broadcast, channelObject];
};

const joinChannel = (
  socket,
  channelTopic,
  name,
  dispatch,
  setBroadcast,
  setChannelObject
) => {
  const channel = socket.channel(channelTopic, {
    player_name: name
  });

  setChannelObject(channel);

  channel.onMessage = (event, payload) => {
    dispatch({ event, payload });
    return payload;
  };

  channel
    .join()
    .receive("ok", ({ messages }) =>
      console.log("successfully joined channel", messages || "")
    )
    .receive("error", ({ reason }) => {
      console.error("failed to join channel", reason);
      dispatch({ event: "error", payload: { message: reason } });
    });

  setBroadcast(() => channel.push.bind(channel));
  return () => {    
    channel.push("leave", { reason: "Player left" });
    channel
      .leave()
      .receive("ok", ({ messages }) =>
        console.log("successfully left channel", messages || "")
      )
      .receive("error", ({ reason }) =>
        console.error("failed to leave channel", reason)
      );
  };
};

const mustJoinChannelWarning = () => () =>
  console.error(
    `useChannel broadcast function cannot be invoked before the channel has been joined`
  );

export default useChannel;
