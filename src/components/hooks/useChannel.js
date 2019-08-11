import { useContext, useReducer, useEffect, useState } from "react";
import SocketContext from "../contexts/SocketContext";

const useChannel = (channelTopic, name, reducer, initialState) => {
  const socket = useContext(SocketContext);
  const [gameState, dispatch] = useReducer(reducer, initialState);
  const [broadcast, setBroadcast] = useState(mustJoinChannelWarning);

  useEffect(
    () => joinChannel(socket, channelTopic, name, dispatch, setBroadcast),
    // eslint-disable-next-line
    [channelTopic]
  );

  return [gameState, broadcast];
};

const joinChannel = (socket, channelTopic, name, dispatch, setBroadcast) => {
  const channel = socket.channel(channelTopic, {
    screen_name: name
  });
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
    channel.leave();
  };
};

const mustJoinChannelWarning = () => () =>
  console.error(
    `useChannel broadcast function cannot be invoked before the channel has been joined`
  );

export default useChannel;
