import React, { useEffect, createContext } from "react";
import PropTypes from "prop-types";
import { Socket } from "phoenix";

const SocketContext = createContext("socket");

export const SocketProvider = ({ wsUrl, options, children }) => {
  const socket = new Socket(wsUrl, { params: options });

  useEffect(() => {
    socket.connect();
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

SocketProvider.defaultProps = {
  options: {}
};

SocketProvider.propTypes = {
  wsUrl: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

export default SocketContext;
